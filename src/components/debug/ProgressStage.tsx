
import { CheckCircle, RefreshCw } from "lucide-react";
import { Progress } from "../ui/progress";
import { Issue } from "@/utils/debugSimulation";
import { cn } from "@/lib/utils";

interface ProgressStageProps {
  stage: 'scanning' | 'fixing';
  progress: number;
  issues: Issue[];
}

export function ProgressStage({ stage, progress, issues }: ProgressStageProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RefreshCw className={cn(
              "h-4 w-4",
              stage === 'scanning' ? "text-bugsu-orange animate-spin" : "text-muted-foreground"
            )} />
            <span className={stage === 'scanning' ? "text-bugsu-orange" : "text-muted-foreground"}>
              Scanning Application
            </span>
          </div>
          {stage === 'fixing' && <CheckCircle className="h-4 w-4 text-green-500" />}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RefreshCw className={cn(
              "h-4 w-4",
              stage === 'fixing' ? "text-bugsu-blue animate-spin" : "text-muted-foreground"
            )} />
            <span className={stage === 'fixing' ? "text-bugsu-blue" : "text-muted-foreground"}>
              Fixing Issues
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {stage === 'scanning' ? 'Scan Progress' : 'Fix Progress'}
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
  );
}
