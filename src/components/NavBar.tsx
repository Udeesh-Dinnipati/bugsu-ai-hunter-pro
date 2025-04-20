
import { Bug, Menu, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-border bg-card/30 backdrop-blur-md z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-bugsu-purple" />
          <span className="text-xl font-bold">
            Bug<span className="text-bugsu-purple">SU</span>
          </span>
        </Link>
      </div>

      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className={cn(
        "absolute top-16 left-0 w-full flex-col bg-card p-4 border-b border-border md:static md:flex md:flex-row md:w-auto md:bg-transparent md:border-none md:p-0 md:items-center gap-6 transition-opacity",
        menuOpen ? "flex" : "hidden md:flex",
        menuOpen ? "opacity-100" : "opacity-0 md:opacity-100"
      )}>
        <Link to="/scanner" onClick={() => setMenuOpen(false)}>
          <Button variant="ghost" className="justify-start md:justify-center w-full">
            <Bug className="mr-2 h-4 w-4" />
            Scanner
          </Button>
        </Link>
        <Link to="/reports" onClick={() => setMenuOpen(false)}>
          <Button variant="ghost" className="justify-start md:justify-center w-full">
            Reports
          </Button>
        </Link>
        <Link to="/legal-guide" onClick={() => setMenuOpen(false)}>
          <Button variant="ghost" className="justify-start md:justify-center w-full">
            Legal Guide
          </Button>
        </Link>
        <Button 
          variant="secondary" 
          className="justify-start md:justify-center"
          onClick={() => {
            setMenuOpen(false);
            document.dispatchEvent(new Event('openDebugTool'));
          }}
        >
          Debug Tool
        </Button>
      </div>
    </nav>
  );
}
