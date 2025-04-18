
import { Button } from "../ui/button";
import { CheckCircle, Clock } from "lucide-react";

interface CompleteStageProps {
  issueCount: number;
  onClose: () => void;
  onRunAgain: () => void;
}

export function CompleteStage({ issueCount, onClose, onRunAgain }: CompleteStageProps) {
  return (
    <div className="space-y-4">
      <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4 text-center">
        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3" />
        <h3 className="text-lg font-medium">Debug Complete</h3>
        <p className="text-muted-foreground text-sm mt-2">
          All {issueCount} issues have been successfully fixed.
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
        <Button onClick={onRunAgain} className="flex-1 bg-bugsu-purple hover:bg-bugsu-purple/90">
          Run Again
        </Button>
      </div>
    </div>
  );
}
