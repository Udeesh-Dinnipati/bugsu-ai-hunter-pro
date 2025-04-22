import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Shield, ShieldAlert, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "./ui/use-toast";

export default function UrlScanner({ onScanComplete }: { onScanComplete: (result: ScanResult) => void }) {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const validateUrl = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleScan = async () => {
    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const scanResult = simulateVulnerabilityScan(url);
      setIsScanning(false);
      onScanComplete(scanResult);
      
      toast({
        title: "Scan Complete",
        description: `Found ${scanResult.vulnerabilities.length} potential vulnerabilities.`,
        variant: scanResult.vulnerabilities.length > 0 ? "destructive" : "default",
      });
    }, 3000);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-8">
      <div className="max-w-2xl w-full space-y-2">
        <h2 className="text-2xl font-bold text-center">Vulnerability Scanner</h2>
        <p className="text-muted-foreground text-center">
          Enter a website URL to scan for potential vulnerabilities
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-10 bg-muted/50"
            disabled={isScanning}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        <Button 
          onClick={handleScan} 
          disabled={isScanning || !url.trim()}
          className="relative overflow-hidden group"
        >
          {isScanning ? (
            <>
              <div className="scanner-line animate-scanning"></div>
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              <span>Scan Website</span>
            </>
          )}
          <span className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-600 to-bugsu-purple opacity-0 transition-opacity",
            isScanning ? "opacity-10" : "group-hover:opacity-10"
          )}></span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-4">
        <FeatureCard
          icon={<ShieldAlert className="h-5 w-5 text-bugsu-purple" />}
          title="AI-Powered Detection"
          description="Advanced detection of OWASP Top 10 vulnerabilities"
        />
        <FeatureCard
          icon={<Zap className="h-5 w-5 text-bugsu-orange" />}
          title="Exploit Suggestion"
          description="AI-generated exploit techniques for verification"
        />
        <FeatureCard
          icon={<Shield className="h-5 w-5 text-bugsu-blue" />}
          title="Legal Compliance"
          description="Ethical and legal compliance verification"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <div className="bg-card p-4 rounded-lg border border-border flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export interface Vulnerability {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedUrl: string;
  cweId: string;
  stepsToReproduce: string[];
  exploitSuggestion: string;
  isLegal: boolean;
  legalNotes?: string;

  asset?: string;
  weakness?: string;
  poc?: {
    title: string;
    desc: string;
    impact: string;
  };
  payload?: string;
}

export interface ScanResult {
  url: string;
  scanDate: string;
  vulnerabilities: Vulnerability[];
  scanDuration: number;
}

function simulateVulnerabilityScan(url: string): ScanResult {
  // This is a simulation - in a real app, you would call an actual scanner API
  
  // Generate 0-5 random vulnerabilities
  const vulnCount = Math.floor(Math.random() * 6);
  const vulnerabilities: Vulnerability[] = [];
  
  const vulnTypes = [
    { 
      name: "Cross-Site Scripting (XSS)", 
      cweId: "CWE-79",
      description: "The application does not properly sanitize user input before displaying it, allowing script injection."
    },
    { 
      name: "SQL Injection", 
      cweId: "CWE-89",
      description: "The application constructs SQL statements using input that hasn't been properly validated."
    },
    { 
      name: "Cross-Site Request Forgery (CSRF)", 
      cweId: "CWE-352",
      description: "The application does not validate that requests were intentionally sent by the user."
    },
    { 
      name: "Insecure Direct Object Reference", 
      cweId: "CWE-639",
      description: "The application exposes references to internal objects, allowing unauthorized access."
    },
    { 
      name: "Missing Authentication", 
      cweId: "CWE-306",
      description: "The application does not authenticate users for a critical function."
    },
    { 
      name: "Sensitive Data Exposure", 
      cweId: "CWE-200",
      description: "The application exposes sensitive information in responses or error messages."
    }
  ];
  
  const severities = ['low', 'medium', 'high', 'critical'] as const;
  
  for (let i = 0; i < vulnCount; i++) {
    const vulnType = vulnTypes[Math.floor(Math.random() * vulnTypes.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    vulnerabilities.push({
      id: `VULN-${Date.now()}-${i}`,
      name: vulnType.name,
      severity,
      description: vulnType.description,
      affectedUrl: `${url}${['', '/login', '/admin', '/api/users', '/search'][Math.floor(Math.random() * 5)]}`,
      cweId: vulnType.cweId,
      stepsToReproduce: [
        "Navigate to the affected URL",
        "Input specific malicious payload",
        "Observe the vulnerability behavior"
      ],
      exploitSuggestion: `Try a proof-of-concept exploit using ${severity === 'critical' ? 'advanced' : 'basic'} techniques to validate this issue.`,
      isLegal: Math.random() > 0.2, // 80% are legal
      legalNotes: Math.random() > 0.2 ? undefined : "Be cautious as this could violate terms of service. Obtain explicit permission before testing."
    });
  }
  
  return {
    url,
    scanDate: new Date().toISOString(),
    vulnerabilities,
    scanDuration: Math.floor(Math.random() * 10) + 2 // 2-12 seconds
  };
}
