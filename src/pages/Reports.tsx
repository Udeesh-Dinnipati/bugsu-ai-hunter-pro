
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShieldCheck } from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <FileText className="h-6 w-6 text-bugsu-purple" />
          <h1 className="text-2xl font-bold">Vulnerability Reports</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Reports</CardTitle>
              <CardDescription>View and manage your submitted vulnerability reports</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShieldCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Reports Found</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  You haven't submitted any vulnerability reports yet. Use the Scanner to find and report vulnerabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
