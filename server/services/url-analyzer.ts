import { URL } from 'url';

export interface AnalysisResult {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  confidence: number;
  reasons: string[];
  technicalDetails?: string;
  source: string;
}

export class UrlAnalyzer {
  constructor() {}

  /**
   * Normalize URL for consistent analysis
   */
  normalizeUrl(urlString: string): string {
    try {
      const url = new URL(urlString.toLowerCase());
      // Remove common tracking parameters
      const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'gclid'];
      trackingParams.forEach(param => url.searchParams.delete(param));
      
      // Remove trailing slash
      if (url.pathname.endsWith('/') && url.pathname.length > 1) {
        url.pathname = url.pathname.slice(0, -1);
      }
      
      return url.toString();
    } catch (error) {
      throw new Error('Invalid URL format');
    }
  }

  /**
   * Perform lexical analysis on URL
   */
  async performLexicalAnalysis(urlString: string): Promise<AnalysisResult> {
    const reasons: string[] = [];
    let suspiciousScore = 0;
    let dangerousScore = 0;

    try {
      const url = new URL(urlString);
      const hostname = url.hostname.toLowerCase();
      const pathname = url.pathname.toLowerCase();
      const fullUrl = urlString.toLowerCase();

      // Check URL length
      if (fullUrl.length > 150) {
        suspiciousScore += 20;
        reasons.push('⚠️ Unusually long URL (may be used to hide destination)');
      }

      // Check for suspicious characters
      if (fullUrl.includes('@')) {
        dangerousScore += 30;
        reasons.push('⚠️ Contains @ symbol (may be used to mislead users about destination)');
      }

      // Check for IP address instead of domain
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (ipRegex.test(hostname)) {
        dangerousScore += 40;
        reasons.push('⚠️ Uses IP address instead of domain name (often suspicious)');
      }

      // Check for punycode (internationalized domain names)
      if (hostname.includes('xn--')) {
        suspiciousScore += 25;
        reasons.push('⚠️ Uses international characters (punycode) that may be used for spoofing');
      }

      // Check for excessive hyphens
      const hyphenCount = (hostname.match(/-/g) || []).length;
      if (hyphenCount > 3) {
        suspiciousScore += 15;
        reasons.push('⚠️ Domain contains many hyphens (unusual pattern)');
      }

      // Check for excessive subdomains
      const subdomainCount = hostname.split('.').length - 2;
      if (subdomainCount > 3) {
        suspiciousScore += 20;
        reasons.push('⚠️ Many subdomains detected (may be used to confuse users)');
      }

      // Check for suspicious keywords
      const suspiciousKeywords = [
        'login', 'signin', 'verify', 'update', 'secure', 'account',
        'suspended', 'limited', 'confirm', 'validation', 'support'
      ];
      
      const phishingKeywords = [
        'paypal', 'amazon', 'microsoft', 'google', 'facebook', 'apple',
        'netflix', 'instagram', 'twitter', 'linkedin', 'dropbox'
      ];

      suspiciousKeywords.forEach(keyword => {
        if (fullUrl.includes(keyword)) {
          suspiciousScore += 10;
        }
      });

      phishingKeywords.forEach(keyword => {
        if (hostname.includes(keyword) && !hostname.endsWith(`${keyword}.com`) && !hostname.endsWith(`${keyword}.net`)) {
          dangerousScore += 25;
          reasons.push(`⚠️ Contains "${keyword}" but may not be the official site`);
        }
      });

      // Enhanced phishing detection for high-risk combinations
      const phishingCombinations = [
        { keywords: ['fake', 'paypal'], score: 50 },
        { keywords: ['fake', 'amazon'], score: 50 },
        { keywords: ['fake', 'google'], score: 50 },
        { keywords: ['login', 'paypal'], score: 40 },
        { keywords: ['login', 'amazon'], score: 40 },
        { keywords: ['verify', 'paypal'], score: 40 },
        { keywords: ['secure', 'login'], score: 35 },
        { keywords: ['update', 'account'], score: 30 },
      ];

      phishingCombinations.forEach(combo => {
        if (combo.keywords.every(keyword => fullUrl.toLowerCase().includes(keyword))) {
          dangerousScore += combo.score;
          reasons.push(`🚫 High-risk combination: Contains "${combo.keywords.join('" and "')}" - likely phishing attempt`);
        }
      });

      // Check for suspicious TLDs
      const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.click', '.download', '.loan'];
      const tld = hostname.substring(hostname.lastIndexOf('.'));
      if (suspiciousTlds.includes(tld)) {
        suspiciousScore += 25;
        reasons.push(`⚠️ Uses ${tld} domain extension (commonly used by suspicious sites)`);
      }

      // Check for URL shorteners
      const shorteners = [
        'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd',
        'buff.ly', 'adf.ly', 'bl.ink', 'lnkd.in', 'short.link'
      ];
      
      if (shorteners.some(shortener => hostname.includes(shortener))) {
        suspiciousScore += 30;
        reasons.push('⚠️ URL shortening service (destination cannot be verified without clicking)');
      }

      // Protocol check
      if (url.protocol === 'http:') {
        suspiciousScore += 15;
        reasons.push('⚠️ Not using secure HTTPS connection');
      } else {
        reasons.push('✓ Uses secure HTTPS connection');
      }

      // Determine verdict based on scores
      let verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
      let confidence: number;

      if (dangerousScore > 30) {
        verdict = 'DANGEROUS';
        confidence = Math.min(90, 60 + dangerousScore);
      } else if (suspiciousScore > 40 || dangerousScore > 0) {
        verdict = 'SUSPICIOUS';
        confidence = Math.min(85, 50 + suspiciousScore + dangerousScore);
      } else {
        verdict = 'SAFE';
        confidence = Math.max(60, 95 - suspiciousScore);
        if (reasons.length === 1 && reasons[0].includes('HTTPS')) {
          reasons.unshift('✓ Domain appears to follow standard naming conventions');
          reasons.push('✓ No suspicious URL patterns detected');
        }
      }

      return {
        verdict,
        confidence,
        reasons: reasons.length > 0 ? reasons : ['✓ No suspicious patterns detected in URL structure'],
        technicalDetails: `Suspicious score: ${suspiciousScore}, Dangerous score: ${dangerousScore}`,
        source: 'lexical_analysis'
      };

    } catch (error) {
      throw new Error(`URL analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
