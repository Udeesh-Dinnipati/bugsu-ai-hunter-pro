
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Bug } from "lucide-react";
import { IdleStage } from "./debug/IdleStage";
import { ProgressStage } from "./debug/ProgressStage";
import { CompleteStage } from "./debug/CompleteStage";
import { ErrorState } from "./debug/ErrorState";
import { DebugStage, Issue, simulateFixing, simulateScanning } from "@/utils/debugSimulation";
import { toast } from "@/hooks/use-toast";

export default function DebugTool({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [debugStage, setDebugStage] = useState<DebugStage>('idle');
  const [progress, setProgress] = useState(0);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Clean up any ongoing processes when component unmounts or dialog closes
  useEffect(() => {
    return () => {
      setIsRunning(false);
    };
  }, []);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setDebugStage('idle');
      setProgress(0);
      setIssues([]);
      setError(null);
      setIsRunning(false);
    }
  }, [isOpen]);

  const handleStartDebug = () => {
    setDebugStage('scanning');
    setProgress(0);
    setIssues([]);
    setError(null);
    setIsRunning(true);

    try {
      const startFixing = () => {
        if (!isRunning) return;
        simulateFixing(
          setProgress, 
          setIssues, 
          setDebugStage, 
          setError,
          () => setIsRunning(false)
        );
      };

      simulateScanning(
        setProgress, 
        setIssues, 
        setDebugStage, 
        setError, 
        startFixing,
        () => setIsRunning(false)
      );
    } catch (err) {
      setDebugStage('error');
      setError('An unexpected error occurred while initializing the debug process');
      setIsRunning(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setIsRunning(false);
        onClose();
      }
    }}>
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
              onClose={() => {
                setIsRunning(false);
                onClose();
              }}
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
