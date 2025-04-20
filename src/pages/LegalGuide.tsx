
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

export default function LegalGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-6 w-6 text-bugsu-purple" />
          <h1 className="text-2xl font-bold">Legal Guide</h1>
        </div>

        <Tabs defaultValue="overview" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="laws">Legal Framework</TabsTrigger>
            <TabsTrigger value="policies">Policy Guidance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Ethical Bug Hunting</CardTitle>
                <CardDescription>Understanding the legal boundaries of security research</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Bug bounty hunting and security research must be conducted within legal and ethical boundaries. 
                  This guide helps you understand the legal frameworks governing security testing.
                </p>
                <h3 className="text-lg font-medium mt-4">Key Principles</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Always obtain proper authorization before testing any system</li>
                  <li>Respect the scope defined in bug bounty programs</li>
                  <li>Report vulnerabilities responsibly to affected parties</li>
                  <li>Never exploit vulnerabilities for personal gain or to access sensitive data</li>
                  <li>Document your testing methodology carefully</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="laws">
            <Card>
              <CardHeader>
                <CardTitle>Legal Framework</CardTitle>
                <CardDescription>Laws that govern security research and testing</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This section covers relevant laws and regulations that security researchers should be aware of.
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Computer Fraud and Abuse Act (CFAA)</h3>
                    <p className="text-muted-foreground mt-1">
                      Prohibits unauthorized access to protected computers. Security testing without explicit permission may violate this law.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Digital Millennium Copyright Act (DMCA)</h3>
                    <p className="text-muted-foreground mt-1">
                      Contains provisions that may affect security research, particularly when it involves circumventing access controls.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle>Policy Guidance</CardTitle>
                <CardDescription>Best practices for responsible disclosure</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Learn about responsible disclosure policies and how to engage with organizations ethically.
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Responsible Disclosure</h3>
                    <p className="text-muted-foreground mt-1">
                      Guidelines for reporting vulnerabilities to organizations in a way that gives them time to fix issues before public disclosure.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Bug Bounty Programs</h3>
                    <p className="text-muted-foreground mt-1">
                      How to participate in formal bug bounty programs and stay within their defined scope and rules.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
