
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Bug } from "lucide-react";
import { IdleStage } from "./debug/IdleStage";
import { ProgressStage } from "./debug/ProgressStage";
import { CompleteStage } from "./debug/CompleteStage";
import { ErrorState } from "./debug/ErrorState";
import { DebugStage, Issue, simulateFixing, simulateScanning, clearAllIntervals } from "@/utils/debugSimulation";
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
      clearAllIntervals(); // Clear all intervals on component unmount
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
      clearAllIntervals(); // Clear all intervals when dialog opens
    }
  }, [isOpen]);

  const handleStartDebug = () => {
    clearAllIntervals(); // Clear any existing intervals before starting
    setDebugStage('scanning');
    setProgress(0);
    setIssues([]);
    setError(null);
    setIsRunning(true);

    try {
      const startFixing = () => {
        if (!isRunning) {
          clearAllIntervals();
          return;
        }
        
        simulateFixing(
          setProgress, 
          setIssues, 
          setDebugStage, 
          setError,
          () => {
            setIsRunning(false);
            clearAllIntervals();
          }
        );
      };

      simulateScanning(
        setProgress, 
        setIssues, 
        setDebugStage, 
        setError, 
        startFixing,
        () => {
          setIsRunning(false);
          clearAllIntervals();
        }
      );
    } catch (err) {
      clearAllIntervals();
      setDebugStage('error');
      setError('An unexpected error occurred while initializing the debug process');
      setIsRunning(false);
    }
  };

  // Handle closing the dialog properly
  const handleClose = () => {
    setIsRunning(false);
    clearAllIntervals();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleClose();
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
              onClose={handleClose}
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
