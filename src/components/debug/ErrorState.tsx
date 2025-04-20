
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
      <Alert variant="destructive" className="border-red-500">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Debug Process Error</AlertTitle>
        <AlertDescription className="mt-2">{error}</AlertDescription>
      </Alert>
      
      <div className="text-center text-sm text-muted-foreground mt-2 mb-2">
        The debug process encountered an error. Please try again.
      </div>
      
      <Button 
        onClick={handleRetry} 
        className="w-full bg-bugsu-purple hover:bg-bugsu-purple/90"
      >
        Retry Debug Process
      </Button>
    </div>
  );
}
