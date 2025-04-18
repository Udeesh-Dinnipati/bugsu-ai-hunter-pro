
import { Dispatch, SetStateAction } from "react";

export type DebugStage = 'idle' | 'scanning' | 'fixing' | 'complete';
export type Issue = { id: number; name: string; fixed: boolean };

const ISSUE_TYPES = [
  "Memory leak detected in scanner module",
  "API rate limiting issue",
  "Rendering performance bottleneck",
  "Network request timeout handling",
  "Data validation error",
  "UI component lifecycle issue",
  "State management inconsistency",
  "Resource cleanup problem"
];

export const simulateScanning = (
  setProgress: Dispatch<SetStateAction<number>>,
  setIssues: Dispatch<SetStateAction<Issue[]>>,
  setDebugStage: Dispatch<SetStateAction<DebugStage>>,
  simulateFixing: () => void
) => {
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

    if (Math.random() > 0.7) {
      setIssues(prev => [
        ...prev,
        {
          id: Date.now(),
          name: ISSUE_TYPES[Math.floor(Math.random() * ISSUE_TYPES.length)],
          fixed: false
        }
      ]);
    }
  }, 200);
};

export const simulateFixing = (
  setProgress: Dispatch<SetStateAction<number>>,
  setIssues: Dispatch<SetStateAction<Issue[]>>,
  setDebugStage: Dispatch<SetStateAction<DebugStage>>
) => {
  setProgress(0);
  
  const fixInterval = setInterval(() => {
    setProgress(prev => {
      const newProgress = prev + 3;
      if (newProgress >= 100) {
        clearInterval(fixInterval);
        setDebugStage('complete');
        setIssues(prev => prev.map(issue => ({ ...issue, fixed: true })));
        return 100;
      }
      return newProgress;
    });
    
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
