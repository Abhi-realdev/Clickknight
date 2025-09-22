import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Shield, AlertTriangle, XCircle, CheckCircle, Flag, ChevronDown, X } from "lucide-react";
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
    <section id="checker" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground mb-4">
              Check Any URL
            </CardTitle>
            <p className="text-muted-foreground">
              Paste a link below and we'll analyze it for safety
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* URL Input Form */}
            <div className="space-y-2">
              <Label htmlFor="url-input" className="text-sm font-medium text-foreground">
                Website URL
              </Label>
              <div className="flex gap-3">
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  data-testid="input-url"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCheckUrl}
                disabled={checkUrlMutation.isPending}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                data-testid="button-check-url"
              >
                <Shield className="w-4 h-4 mr-2" />
                Check Link
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                disabled={checkUrlMutation.isPending}
                data-testid="button-clear"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>

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
      </div>
    </section>
  );
}
