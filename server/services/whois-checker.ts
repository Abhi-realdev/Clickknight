export interface WhoisResult {
  domainAge: number | null; // days since registration
  isNewDomain: boolean;
  registrar?: string;
  error?: string;
}

export class WhoisChecker {
  constructor() {}

  /**
   * Check domain age using a simple approach
   * In production, you would use a proper WHOIS library like 'node-whois'
   */
  async checkDomainAge(hostname: string): Promise<WhoisResult> {
    try {
      // Remove 'www.' prefix if present
      const cleanHostname = hostname.replace(/^www\./, '');
      
      // For demo purposes, we'll simulate domain age checks
      // In production, use a library like 'whois' or 'node-whois'
      
      // Known safe domains (simulate older domains)
      const knownSafeDomains = [
        'google.com', 'github.com', 'stackoverflow.com', 'wikipedia.org',
        'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com'
      ];
      
      // Known suspicious patterns
      const suspiciousPatterns = ['temp', 'test', 'fake', 'scam', 'phish'];
      
      if (knownSafeDomains.some(domain => cleanHostname.endsWith(domain))) {
        return {
          domainAge: Math.floor(Math.random() * 3000) + 1000, // 3-10 years
          isNewDomain: false,
          registrar: 'Known Registrar'
        };
      }
      
      if (suspiciousPatterns.some(pattern => cleanHostname.includes(pattern))) {
        return {
          domainAge: Math.floor(Math.random() * 15) + 1, // 1-15 days
          isNewDomain: true,
          registrar: 'Unknown'
        };
      }
      
      // Random age for other domains
      const randomAge = Math.floor(Math.random() * 2000) + 30;
      
      return {
        domainAge: randomAge,
        isNewDomain: randomAge < 30,
        registrar: 'Standard Registrar'
      };
      
    } catch (error) {
      return {
        domainAge: null,
        isNewDomain: false,
        error: `WHOIS lookup failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}
