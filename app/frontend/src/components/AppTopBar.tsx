import { MessageSquare, LogOut, Moon, Sun, Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface AppTopBarProps {
  user: User | null;
  onToggleAssistant: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onMenuToggle?: () => void;
}

export const AppTopBar = ({ user, onToggleAssistant, darkMode, onToggleDarkMode, onMenuToggle }: AppTopBarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="h-14 max-[480px]:h-12 border-b flex items-center justify-between px-4 max-[480px]:px-2 shrink-0 bg-background z-10 relative">
      <div className="flex items-center gap-2">
        {onMenuToggle && (
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="hidden max-[480px]:flex h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <span className="hidden max-[480px]:block text-sm font-bold tracking-tight">
          PowerAI
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToggleAssistant} className="max-[480px]:px-2 text-xs">
          <MessageSquare className="h-4 w-4 max-[480px]:mr-0 mr-1" />
          <span className="max-[480px]:hidden">Assistant</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onToggleDarkMode} className="h-8 w-8">
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <div className="flex items-center gap-2 pl-2 border-l max-[480px]:pl-1 max-[480px]:gap-1">
          <div className="w-7 h-7 max-[480px]:w-6 max-[480px]:h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="h-7 w-7">
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
