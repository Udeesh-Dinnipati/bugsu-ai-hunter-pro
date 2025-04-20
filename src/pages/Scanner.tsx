
import NavBar from "@/components/NavBar";
import UrlScanner, { ScanResult } from "@/components/UrlScanner";
import VulnerabilityReport from "@/components/VulnerabilityReport";
import { useState } from "react";
import { Vulnerability } from "@/components/UrlScanner";
import ReportSubmission from "@/components/ReportSubmission";

export default function Scanner() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
  };

  const handleSubmitReport = (vuln: Vulnerability) => {
    setSelectedVulnerability(vuln);
    setIsReportModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        {!scanResult ? (
          <UrlScanner onScanComplete={handleScanComplete} />
        ) : (
          <VulnerabilityReport 
            result={scanResult} 
            onSubmitReport={handleSubmitReport} 
          />
        )}
      </div>

      <ReportSubmission 
        vulnerability={selectedVulnerability} 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </div>
  );
}
