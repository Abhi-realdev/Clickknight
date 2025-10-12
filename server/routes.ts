import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { UrlAnalyzer } from "./services/url-analyzer";
import { WhoisChecker } from "./services/whois-checker";
import { SecurityApiService } from "./services/security-apis";
import { 
  checkUrlRequestSchema, 
  reportUrlRequestSchema, 
  type CheckUrlRequest,
  type ReportUrlRequest 
} from "@shared/schema";
import { z } from "zod";

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;

// Helper function to check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Helper function to validate and sanitize URLs
function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    
    // Only allow HTTP and HTTPS protocols for security
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error('Only HTTP and HTTPS URLs are allowed');
    }
    
    // Prevent SSRF by blocking internal IPs
    const hostname = parsed.hostname.toLowerCase();
    
    // Block localhost and private IP ranges
    const blockedPatterns = [
      /^localhost$/,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2\d|3[01])\./,
      /^192\.168\./,
      /^169\.254\./, // Link-local
      /^::1$/, // IPv6 localhost
      /^fe80:/, // IPv6 link-local
    ];
    
    if (blockedPatterns.some(pattern => pattern.test(hostname))) {
      throw new Error('Access to internal/private networks is not allowed');
    }
    
    return parsed.toString();
  } catch (error) {
    throw new Error(`Invalid URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const urlAnalyzer = new UrlAnalyzer();
  const whoisChecker = new WhoisChecker();
  const securityApiService = new SecurityApiService();

  // CORS middleware
  app.use((req, res, next) => {
    const allowedOrigins = [
      'https://clickknight.netlify.app',
      'http://localhost:5000',
      'http://localhost:3000',
      'http://127.0.0.1:5000'
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string) || !origin) {
      res.header('Access-Control-Allow-Origin', origin || '*');
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    
    next();
  });

  // Rate limiting middleware
  app.use('/api', (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({ 
        message: 'Rate limit exceeded. Please wait before making more requests.',
        retryAfter: 60 
      });
      return;
    }
    
    next();
  });

  // POST /api/check - Check URL safety
  app.post('/api/check', async (req, res) => {
    try {
      console.log('Received URL check request:', req.body);
      
      // Validate request body
      const validatedData = checkUrlRequestSchema.parse(req.body);
      const { url, source } = validatedData;
      
      // Sanitize URL to prevent SSRF
      const sanitizedUrl = sanitizeUrl(url);
      const normalizedUrl = urlAnalyzer.normalizeUrl(sanitizedUrl);
      
      console.log(`Analyzing URL: ${sanitizedUrl} (normalized: ${normalizedUrl})`);
      
      // Check if we have a recent scan of this URL
      const existingScan = await storage.getUrlScanByUrl(normalizedUrl);
      if (existingScan) {
        console.log('Returning cached result');
        res.json({
          scan_id: existingScan.id,
          verdict: existingScan.verdict,
          confidence: existingScan.confidence,
          reasons: existingScan.reasons,
          summary: existingScan.summary,
          cached: true
        });
        return;
      }
      
      // Perform comprehensive analysis
      console.log('Starting comprehensive URL analysis...');
      
      // 1. Lexical analysis (always performed)
      const lexicalResult = await urlAnalyzer.performLexicalAnalysis(sanitizedUrl);
      console.log('Lexical analysis complete:', lexicalResult.verdict);
      
      // 2. Domain age check
      const hostname = new URL(sanitizedUrl).hostname;
      const whoisResult = await whoisChecker.checkDomainAge(hostname);
      console.log('WHOIS check complete:', whoisResult);
      
      // 3. Security API checks (with fallback)
      const googleResult = await securityApiService.checkGoogleSafeBrowsing(sanitizedUrl);
      const phishTankResult = await securityApiService.checkPhishTank(sanitizedUrl);
      console.log('Security API checks complete');
      
      // Combine all analysis results
      const reasons = [...lexicalResult.reasons];
      let finalVerdict = lexicalResult.verdict;
      let finalConfidence = lexicalResult.confidence;
      let scanSource = 'heuristic';
      
      // Add domain age information
      if (whoisResult.domainAge !== null) {
        if (whoisResult.isNewDomain) {
          reasons.push(`⚠️ Domain registered only ${whoisResult.domainAge} days ago (very new)`);
          if (finalVerdict === 'SAFE') {
            finalVerdict = 'SUSPICIOUS';
            finalConfidence = Math.max(30, finalConfidence - 30);
          }
        } else if (whoisResult.domainAge > 365) {
          reasons.push(`✓ Domain registered ${Math.floor(whoisResult.domainAge / 365)} years ago (established)`);
          if (finalVerdict === 'SAFE') {
            finalConfidence = Math.min(95, finalConfidence + 10);
          }
        }
      } else if (whoisResult.error) {
        reasons.push('⚠️ Could not verify domain registration date');
      }
      
      // Check external security APIs
      if (googleResult.isMalicious) {
        finalVerdict = 'DANGEROUS';
        finalConfidence = 95;
        reasons.unshift('🚫 Flagged as malicious by Google Safe Browsing');
        scanSource = 'google_safe_browsing';
      } else if (phishTankResult.isMalicious) {
        finalVerdict = 'DANGEROUS';
        finalConfidence = 90;
        reasons.unshift('🚫 Found in PhishTank phishing database');
        scanSource = 'phishtank';
      } else {
        // Add positive indicators from security checks
        if (!googleResult.error) {
          reasons.push('✓ Clean in Google Safe Browsing database');
        }
        if (!phishTankResult.error) {
          reasons.push('✓ Not found in PhishTank phishing database');
        }
      }
      
      // Generate summary based on verdict
      let summary: string;
      switch (finalVerdict) {
        case 'SAFE':
          summary = 'This website appears to be legitimate and safe to visit. All security checks passed successfully.';
          break;
        case 'SUSPICIOUS':
          summary = 'This URL has some concerning characteristics. Exercise caution and verify the site\'s authenticity before entering personal information.';
          break;
        case 'DANGEROUS':
          summary = 'This URL is potentially dangerous and should not be visited. It may contain malware, phishing attempts, or other security threats.';
          break;
      }
      
      // Store the scan result
      const scan = await storage.createUrlScan({
        url: sanitizedUrl,
        normalizedUrl,
        verdict: finalVerdict,
        confidence: finalConfidence,
        summary,
        reasons,
        technicalDetails: `Source: ${scanSource}, WHOIS: ${whoisResult.domainAge ? `${whoisResult.domainAge} days` : 'unknown'}`,
        scanSource,
      });
      
      console.log(`Analysis complete. Result: ${finalVerdict} (${finalConfidence}% confidence)`);
      
      // Return result
      res.json({
        scan_id: scan.id,
        verdict: scan.verdict,
        confidence: scan.confidence,
        reasons: scan.reasons,
        summary: scan.summary
      });
      
    } catch (error) {
      console.error('URL check error:', error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: 'Invalid request data',
          errors: error.errors 
        });
      } else {
        res.status(400).json({ 
          message: error instanceof Error ? error.message : 'Failed to analyze URL'
        });
      }
    }
  });

  // GET /api/check/:scanId - Get scan results by ID
  app.get('/api/check/:scanId', async (req, res) => {
    try {
      const { scanId } = req.params;
      
      if (!scanId || typeof scanId !== 'string') {
        res.status(400).json({ message: 'Invalid scan ID' });
        return;
      }
      
      const scan = await storage.getUrlScan(scanId);
      
      if (!scan) {
        res.status(404).json({ message: 'Scan not found' });
        return;
      }
      
      res.json({
        scan_id: scan.id,
        url: scan.url,
        verdict: scan.verdict,
        confidence: scan.confidence,
        reasons: scan.reasons,
        summary: scan.summary,
        created_at: scan.createdAt
      });
      
    } catch (error) {
      console.error('Get scan error:', error);
      res.status(500).json({ message: 'Failed to retrieve scan results' });
    }
  });

  // POST /api/report - Report scan result feedback
  app.post('/api/report', async (req, res) => {
    try {
      console.log('Received report request:', req.body);
      
      // Validate request body
      const validatedData = reportUrlRequestSchema.parse(req.body);
      const { scanId, userVerdict, notes, isHelpful } = validatedData;
      
      // Verify scan exists
      const scan = await storage.getUrlScan(scanId);
      if (!scan) {
        res.status(404).json({ message: 'Scan not found' });
        return;
      }
      
      // Create report
      const report = await storage.createUrlReport({
        scanId,
        userVerdict,
        notes,
        isHelpful,
      });
      
      console.log(`Report created for scan ${scanId}`);
      
      res.json({
        message: 'Thank you for your feedback! This helps improve our detection accuracy.',
        report_id: report.id
      });
      
    } catch (error) {
      console.error('Report error:', error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: 'Invalid report data',
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: 'Failed to submit report' });
      }
    }
  });

  // GET /api/history - Get recent scan history (optional demo endpoint)
  app.get('/api/history', async (req, res) => {
    try {
      const limit = Math.min(20, parseInt(req.query.limit as string) || 10);
      const recentScans = await storage.getRecentScans(limit);
      
      const sanitizedScans = recentScans.map(scan => ({
        scan_id: scan.id,
        verdict: scan.verdict,
        confidence: scan.confidence,
        summary: scan.summary,
        created_at: scan.createdAt,
        // Don't expose full URLs for privacy
        domain: new URL(scan.url).hostname
      }));
      
      res.json({ scans: sanitizedScans });
      
    } catch (error) {
      console.error('History error:', error);
      res.status(500).json({ message: 'Failed to retrieve scan history' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
