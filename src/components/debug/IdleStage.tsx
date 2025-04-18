
import { Bug } from "lucide-react";
import { Button } from "../ui/button";

interface IdleStageProps {
  onStartDebug: () => void;
}

export function IdleStage({ onStartDebug }: IdleStageProps) {
  return (
    <div className="text-center space-y-4">
      <div className="bg-muted p-6 rounded-lg">
        <Bug className="h-16 w-16 mx-auto text-bugsu-purple mb-4 animate-pulse-glow" />
        <h3 className="text-lg font-medium">Application Self-Diagnostics</h3>
        <p className="text-muted-foreground text-sm mt-2">
          This tool will scan the application for bugs and performance issues, then automatically fix them.
        </p>
      </div>
      <Button onClick={onStartDebug} className="w-full bg-bugsu-purple hover:bg-bugsu-purple/90">
        Start Debug Process
      </Button>
    </div>
  );
}
