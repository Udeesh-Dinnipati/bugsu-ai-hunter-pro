
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Bug, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

export default function DebugTool({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [debugStage, setDebugStage] = useState<'idle' | 'scanning' | 'fixing' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [issues, setIssues] = useState<{ id: number; name: string; fixed: boolean }[]>([]);

  const handleStartDebug = () => {
    setDebugStage('scanning');
    setProgress(0);
    setIssues([]);

    // Simulate the debugging process
    const scanInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(scanInterval);
          setDebugStage('fixing');
          simulateFixing();
          return 100;
        }
        return newProgress;
      });

      // Randomly add discovered issues during scan
      if (Math.random() > 0.7) {
        const issueTypes = [
          "Memory leak detected in scanner module",
          "API rate limiting issue",
          "Rendering performance bottleneck",
          "Network request timeout handling",
          "Data validation error",
          "UI component lifecycle issue",
          "State management inconsistency",
          "Resource cleanup problem"
        ];
        
        setIssues(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            name: issueTypes[Math.floor(Math.random() * issueTypes.length)], 
            fixed: false 
          }
        ]);
      }
    }, 200);
  };

  const simulateFixing = () => {
    setProgress(0);
    
    const fixInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 3;
        if (newProgress >= 100) {
          clearInterval(fixInterval);
          setDebugStage('complete');
          
          // Mark all issues as fixed
          setIssues(prev => prev.map(issue => ({ ...issue, fixed: true })));
          
          return 100;
        }
        return newProgress;
      });
      
      // Gradually mark issues as fixed
      setIssues(prev => {
        const unfixedIssues = prev.filter(i => !i.fixed);
        if (unfixedIssues.length > 0 && Math.random() > 0.6) {
          const randomIssueIndex = Math.floor(Math.random() * unfixedIssues.length);
          const issueToFix = unfixedIssues[randomIssueIndex];
          
          return prev.map(issue => 
            issue.id === issueToFix.id ? { ...issue, fixed: true } : issue
          );
        }
        return prev;
      });
    }, 150);
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
            <div className="text-center space-y-4">
              <div className="bg-muted p-6 rounded-lg">
                <Bug className="h-16 w-16 mx-auto text-bugsu-purple mb-4 animate-pulse-glow" />
                <h3 className="text-lg font-medium">Application Self-Diagnostics</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  This tool will scan the application for bugs and performance issues, then automatically fix them.
                </p>
              </div>
              <Button onClick={handleStartDebug} className="w-full bg-bugsu-purple hover:bg-bugsu-purple/90">
                Start Debug Process
              </Button>
            </div>
          )}

          {(debugStage === 'scanning' || debugStage === 'fixing') && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <RefreshCw className={cn(
                      "h-4 w-4", 
                      debugStage === 'scanning' ? "text-bugsu-orange animate-spin" : "text-muted-foreground"
                    )} />
                    <span className={debugStage === 'scanning' ? "text-bugsu-orange" : "text-muted-foreground"}>
                      Scanning Application
                    </span>
                  </div>
                  {debugStage !== 'scanning' && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <RefreshCw className={cn(
                      "h-4 w-4", 
                      debugStage === 'fixing' ? "text-bugsu-blue animate-spin" : "text-muted-foreground"
                    )} />
                    <span className={debugStage === 'fixing' ? "text-bugsu-blue" : "text-muted-foreground"}>
                      Fixing Issues
                    </span>
                  </div>
                  {debugStage === 'complete' && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {debugStage === 'scanning' ? 'Scan Progress' : 'Fix Progress'}
                  </span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {issues.length > 0 && (
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2 text-sm font-medium border-b">
                    Discovered Issues
                  </div>
                  <div className="divide-y max-h-60 overflow-y-auto">
                    {issues.map(issue => (
                      <div key={issue.id} className="px-4 py-2 text-sm flex justify-between items-center">
                        <span className={issue.fixed ? "text-muted-foreground line-through" : ""}>
                          {issue.name}
                        </span>
                        {issue.fixed && <CheckCircle className="h-3 w-3 text-green-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {debugStage === 'complete' && (
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3" />
                <h3 className="text-lg font-medium">Debug Complete</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  All {issues.length} issues have been successfully fixed.
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Process completed in {Math.floor(Math.random() * 60) + 10} seconds</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Close
                </Button>
                <Button onClick={handleStartDebug} className="flex-1 bg-bugsu-purple hover:bg-bugsu-purple/90">
                  Run Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
