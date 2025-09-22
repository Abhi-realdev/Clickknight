import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Shield, AlertTriangle, XCircle, CheckCircle, Flag, ChevronDown, X, Sparkles, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ScanResult {
  scan_id: string;
  verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  confidence: number;
  reasons: string[];
  summary: string;
  cached?: boolean;
}

export function UrlChecker() {
  const [url, setUrl] = useState("");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const { toast } = useToast();

  // URL check mutation
  const checkUrlMutation = useMutation({
    mutationFn: async (urlToCheck: string) => {
      const response = await apiRequest('POST', '/api/check', { 
        url: urlToCheck, 
        source: 'manual' 
      });
      return response.json() as Promise<ScanResult>;
    },
    onSuccess: (data) => {
      setScanResult(data);
      if (data.cached) {
        toast({
          title: "Cached Result",
          description: "Showing recent analysis for this URL",
        });
      }
    },
    onError: (error: any) => {
      console.error('URL check error:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze URL. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Report mutation
  const reportMutation = useMutation({
    mutationFn: async (data: { scanId: string; userVerdict?: string; notes?: string; isHelpful?: boolean }) => {
      const response = await apiRequest('POST', '/api/report', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Your feedback helps improve our detection accuracy.",
      });
    },
    onError: (error: any) => {
      console.error('Report error:', error);
      toast({
        title: "Report Failed",
        description: "Unable to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleCheckUrl = () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to check",
        variant: "destructive",
      });
      return;
    }

    try {
      // Basic URL validation
      new URL(url);
      checkUrlMutation.mutate(url.trim());
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setUrl("");
    setScanResult(null);
    setShowTechnicalDetails(false);
  };

  const handleReport = (isHelpful: boolean) => {
    if (!scanResult) return;

    reportMutation.mutate({
      scanId: scanResult.scan_id,
      isHelpful
    });
  };

  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'SAFE':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bgColor: 'border-success bg-success/5',
          iconBg: 'bg-success/20'
        };
      case 'SUSPICIOUS':
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bgColor: 'border-warning bg-warning/5',
          iconBg: 'bg-warning/20'
        };
      case 'DANGEROUS':
        return {
          icon: XCircle,
          color: 'text-destructive',
          bgColor: 'border-destructive bg-destructive/5',
          iconBg: 'bg-destructive/20'
        };
      default:
        return {
          icon: Shield,
          color: 'text-muted-foreground',
          bgColor: 'border-border bg-muted/5',
          iconBg: 'bg-muted/20'
        };
    }
  };

  return (
    <motion.section 
      id="checker" 
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(250,204,21,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 max-w-5xl relative">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm scale-hover">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 neon-glow">
                  <Search className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <CardTitle className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
                  Check Any URL
                </CardTitle>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Paste a suspicious link below and get instant AI-powered security analysis 
                  with educational explanations
                </p>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-8 px-8 pb-8">
              {/* URL Input Form */}
              <motion.div 
                className="space-y-4"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Label htmlFor="url-input" className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Website URL to Analyze
                </Label>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    id="url-input"
                    type="url"
                    placeholder="https://suspicious-website.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-lg py-4 px-6 border-2 border-primary/30 focus:border-secondary focus:ring-2 focus:ring-secondary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 rounded-xl"
                    data-testid="input-url"
                    onFocus={(e) => {
                      e.target.classList.add('neon-glow');
                    }}
                    onBlur={(e) => {
                      e.target.classList.remove('neon-glow');
                    }}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-accent/60" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex gap-4"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleCheckUrl}
                    disabled={checkUrlMutation.isPending}
                    className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 text-white py-4 text-lg font-bold rounded-xl shadow-lg neon-glow transition-all duration-300"
                    data-testid="button-check-url"
                  >
                    <Shield className="w-5 h-5 mr-3" />
                    {checkUrlMutation.isPending ? 'Analyzing...' : 'Analyze Link'}
                    <Sparkles className="w-5 h-5 ml-3" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    disabled={checkUrlMutation.isPending}
                    className="px-6 py-4 border-2 border-accent hover:bg-accent hover:text-accent-foreground font-semibold rounded-xl transition-all duration-300"
                    data-testid="button-clear"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Clear
                  </Button>
                </motion.div>
              </motion.div>

            {/* Loading State */}
            {checkUrlMutation.isPending && (
              <LoadingSpinner message="Analyzing URL security..." />
            )}

            {/* Results Card */}
            {scanResult && !checkUrlMutation.isPending && (
              <div className={`p-6 rounded-xl border-2 fade-in ${getVerdictConfig(scanResult.verdict).bgColor}`} data-testid="results-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getVerdictConfig(scanResult.verdict).iconBg}`}>
                      {(() => {
                        const IconComponent = getVerdictConfig(scanResult.verdict).icon;
                        return <IconComponent className={`text-xl ${getVerdictConfig(scanResult.verdict).color}`} />;
                      })()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-xl font-bold ${getVerdictConfig(scanResult.verdict).color}`}>
                        {scanResult.verdict}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        ({scanResult.confidence}% confidence)
                      </span>
                      {scanResult.cached && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          Cached
                        </span>
                      )}
                    </div>
                    <p className="text-foreground mb-4" data-testid="text-scan-summary">
                      {scanResult.summary}
                    </p>

                    <div className="space-y-3">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-2">Analysis Details:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground" data-testid="list-scan-reasons">
                          {scanResult.reasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                          data-testid="button-toggle-details"
                        >
                          <ChevronDown className={`w-4 h-4 mr-1 transition-transform ${showTechnicalDetails ? 'rotate-180' : ''}`} />
                          Technical Details
                        </Button>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReport(true)}
                            disabled={reportMutation.isPending}
                            data-testid="button-report-helpful"
                          >
                            👍 Helpful
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReport(false)}
                            disabled={reportMutation.isPending}
                            data-testid="button-report-not-helpful"
                          >
                            👎 Not Helpful
                          </Button>
                        </div>
                      </div>

                      {showTechnicalDetails && (
                        <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground fade-in">
                          <h5 className="font-medium text-foreground mb-2">Technical Information:</h5>
                          <p>Scan ID: {scanResult.scan_id}</p>
                          <p>Analysis Timestamp: {new Date().toLocaleString()}</p>
                          <p>Confidence Score: {scanResult.confidence}/100</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
