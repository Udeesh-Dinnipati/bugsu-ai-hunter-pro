
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Vulnerability } from "./UrlScanner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "./ui/use-toast";
import { SendHorizonal } from "lucide-react";

export default function ReportSubmission({ vulnerability, isOpen, onClose }: {
  vulnerability: Vulnerability | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [platform, setPlatform] = useState("hackerone");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted",
        description: `Your vulnerability report has been submitted to ${platform === 'hackerone' ? 'HackerOne' : 'Bugcrowd'}.`,
      });
      onClose();

      // Reset form
      setPlatform("hackerone");
      setEmail("");
      setAdditionalInfo("");
    }, 1500);
  };

  if (!vulnerability) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Vulnerability Report</DialogTitle>
          <DialogDescription>
            Submit this vulnerability to a bug bounty platform to potentially earn rewards.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="platform">Bug Bounty Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hackerone">HackerOne</SelectItem>
                <SelectItem value="bugcrowd">Bugcrowd</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Vulnerability Details</Label>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p><strong>Name:</strong> {vulnerability.name}</p>
              <p><strong>Severity:</strong> {vulnerability.severity}</p>
              <p><strong>CWE ID:</strong> {vulnerability.cweId}</p>
              <p><strong>Affected URL:</strong> {vulnerability.affectedUrl}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="additional">Additional Information</Label>
            <Textarea
              id="additional"
              placeholder="Add any additional context, screenshots, or details about the vulnerability..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-bugsu-purple hover:bg-bugsu-purple/90 gap-2">
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <SendHorizonal className="h-4 w-4" />
                <span>Submit Report</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
