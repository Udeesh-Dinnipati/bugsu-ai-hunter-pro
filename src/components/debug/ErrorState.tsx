
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "@/hooks/use-toast";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const handleRetry = () => {
    toast({
      title: "Retrying debug process",
      description: "Starting a new diagnostic session...",
      duration: 3000,
    });
    onRetry();
  };

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      
      <Button 
        onClick={handleRetry} 
        className="w-full bg-bugsu-purple hover:bg-bugsu-purple/90"
      >
        Retry Debug Process
      </Button>
    </div>
  );
}
