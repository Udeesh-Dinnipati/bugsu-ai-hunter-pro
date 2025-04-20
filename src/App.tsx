
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Scanner from "./pages/Scanner";
import Reports from "./pages/Reports";
import LegalGuide from "./pages/LegalGuide";
import NotFound from "./pages/NotFound";
import DebugTool from "./components/DebugTool";

const queryClient = new QueryClient();

const App = () => {
  const [isDebugModalOpen, setIsDebugModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenDebugTool = () => {
      setIsDebugModalOpen(true);
    };

    document.addEventListener('openDebugTool', handleOpenDebugTool);
    
    return () => {
      document.removeEventListener('openDebugTool', handleOpenDebugTool);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/legal-guide" element={<LegalGuide />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <DebugTool 
          isOpen={isDebugModalOpen} 
          onClose={() => setIsDebugModalOpen(false)} 
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
