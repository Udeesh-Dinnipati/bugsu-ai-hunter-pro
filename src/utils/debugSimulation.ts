
import { Dispatch, SetStateAction } from "react";

export type DebugStage = 'idle' | 'scanning' | 'fixing' | 'complete' | 'error';
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

let scanningIntervalId: NodeJS.Timeout | null = null;
let fixingIntervalId: NodeJS.Timeout | null = null;

// Helper function to clear all intervals - export this so it can be used in components
export const clearAllIntervals = () => {
  if (scanningIntervalId) {
    clearInterval(scanningIntervalId);
    scanningIntervalId = null;
  }
  if (fixingIntervalId) {
    clearInterval(fixingIntervalId);
    fixingIntervalId = null;
  }
};

export const simulateScanning = (
  setProgress: Dispatch<SetStateAction<number>>,
  setIssues: Dispatch<SetStateAction<Issue[]>>,
  setDebugStage: Dispatch<SetStateAction<DebugStage>>,
  setError: Dispatch<SetStateAction<string | null>>,
  simulateFixing: () => void,
  onComplete: () => void
) => {
  // Clear any existing intervals first
  clearAllIntervals();
  
  setError(null);
  
  // Start new scanning interval - reduced error chance to 1% for better user experience
  scanningIntervalId = setInterval(() => {
    // Only 1% chance of error now to make the tool more usable
    if (Math.random() < 0.01) {
      clearAllIntervals();
      setDebugStage('error');
      setError('Connection interrupted during scanning process');
      onComplete();
      return;
    }

    setProgress(prev => {
      const newProgress = prev + 5;
      if (newProgress >= 100) {
        clearAllIntervals();
        setDebugStage('fixing');
        setTimeout(() => {
          simulateFixing();
        }, 100); // Small delay to ensure state updates properly
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
  setDebugStage: Dispatch<SetStateAction<DebugStage>>,
  setError: Dispatch<SetStateAction<string | null>>,
  onComplete: () => void
) => {
  // Clear any existing intervals first
  clearAllIntervals();
  
  setProgress(0);
  setError(null);
  
  // Start new fixing interval - reduced error chance to 0.5% for better user experience
  fixingIntervalId = setInterval(() => {
    // Only 0.5% chance of error now
    if (Math.random() < 0.005) {
      clearAllIntervals();
      setDebugStage('error');
      setError('Unable to apply fixes - system resource limit reached');
      onComplete();
      return;
    }

    setProgress(prev => {
      const newProgress = prev + 3;
      if (newProgress >= 100) {
        clearAllIntervals();
        setDebugStage('complete');
        setIssues(prev => prev.map(issue => ({ ...issue, fixed: true })));
        onComplete();
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
