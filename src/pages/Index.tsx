
import { useState } from "react";
import NavBar from "@/components/NavBar";
import UrlScanner, { ScanResult, Vulnerability } from "@/components/UrlScanner";
import VulnerabilityReport from "@/components/VulnerabilityReport";
import ReportSubmission from "@/components/ReportSubmission";
import DebugTool from "@/components/DebugTool";
import { Button } from "@/components/ui/button";
import { Code, Eye, ShieldCheck } from "lucide-react";

const Index = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDebugModalOpen, setIsDebugModalOpen] = useState(false);

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
  };

  const handleSubmitReport = (vuln: Vulnerability) => {
    setSelectedVulnerability(vuln);
    setIsReportModalOpen(true);
  };

  const handleOpenDebugTool = () => {
    setIsDebugModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {!scanResult ? (
          <>
            <div className="text-center max-w-3xl mx-auto mt-10 mb-16">
              <div className="inline-flex p-1.5 rounded-full bg-bugsu-purple/10 text-bugsu-purple mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                Bug<span className="text-bugsu-purple">SU</span> - The AI-Powered Bug Hunter
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Find vulnerabilities in websites ethically and legally with the help of AI. Submit your findings to bug bounty platforms and earn rewards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              <FeatureCard 
                icon={<Eye className="h-12 w-12 text-bugsu-purple p-2 bg-bugsu-purple/10 rounded-xl" />}
                title="AI Vulnerability Scanner"
                description="Detect OWASP Top 10 vulnerabilities with our AI-powered scanner including XSS, SQL injection, and CSRF."
              />
              <FeatureCard 
                icon={<Code className="h-12 w-12 text-bugsu-orange p-2 bg-bugsu-orange/10 rounded-xl" />}
                title="AI Exploit Generation"
                description="Get AI-suggested exploit techniques to validate your findings responsibly and ethically."
              />
              <FeatureCard 
                icon={<ShieldCheck className="h-12 w-12 text-bugsu-blue p-2 bg-bugsu-blue/10 rounded-xl" />}
                title="Legal Compliance Check"
                description="Ensure your bug hunting activities comply with legal requirements and terms of service."
              />
            </div>

            <UrlScanner onScanComplete={handleScanComplete} />
            
            <div className="text-center mt-10">
              <Button variant="outline" onClick={handleOpenDebugTool}>
                Debug BugSU Application
              </Button>
            </div>
          </>
        ) : (
          <VulnerabilityReport 
            result={scanResult} 
            onSubmitReport={handleSubmitReport} 
          />
        )}
      </div>
      
      <footer className="border-t border-border py-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-bugsu-purple" />
              <span className="font-semibold">BugSU</span>
            </div>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              © 2025 BugSU. Ethical Bug Hunting Platform.
            </p>
            <div className="mt-2 md:mt-0">
              <Button variant="link" size="sm" className="text-muted-foreground">
                Terms of Service
              </Button>
              <Button variant="link" size="sm" className="text-muted-foreground">
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </footer>
      
      <ReportSubmission 
        vulnerability={selectedVulnerability} 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
      
      <DebugTool 
        isOpen={isDebugModalOpen} 
        onClose={() => setIsDebugModalOpen(false)} 
      />
    </div>
  );
};

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default Index;
