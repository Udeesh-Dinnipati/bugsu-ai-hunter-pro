
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Bug } from "lucide-react";
import { IdleStage } from "./debug/IdleStage";
import { ProgressStage } from "./debug/ProgressStage";
import { CompleteStage } from "./debug/CompleteStage";
import { ErrorState } from "./debug/ErrorState";
import { DebugStage, Issue, simulateFixing, simulateScanning } from "@/utils/debugSimulation";

export default function DebugTool({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [debugStage, setDebugStage] = useState<DebugStage>('idle');
  const [progress, setProgress] = useState(0);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStartDebug = () => {
    setDebugStage('scanning');
    setProgress(0);
    setIssues([]);
    setError(null);

    const startFixing = () => simulateFixing(setProgress, setIssues, setDebugStage, setError);
    simulateScanning(setProgress, setIssues, setDebugStage, setError, startFixing);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-bugsu-purple" />
            BugSU Debug Tool
          </DialogTitle>
          <DialogDescription>
            Automatically scan and fix issues in the BugSU application.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {debugStage === 'idle' && (
            <IdleStage onStartDebug={handleStartDebug} />
          )}

          {(debugStage === 'scanning' || debugStage === 'fixing') && (
            <ProgressStage
              stage={debugStage}
              progress={progress}
              issues={issues}
            />
          )}

          {debugStage === 'complete' && (
            <CompleteStage
              issueCount={issues.length}
              onClose={onClose}
              onRunAgain={handleStartDebug}
            />
          )}

          {debugStage === 'error' && error && (
            <ErrorState
              error={error}
              onRetry={handleStartDebug}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

