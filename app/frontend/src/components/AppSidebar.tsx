import { useState } from "react";
import { LayoutDashboard, FolderOpen, Download, Settings, Plus, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onNewDashboard: () => void;
  mobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

const navItems = [
  { id: "dashboards", label: "Dashboards", icon: LayoutDashboard },
  { id: "files", label: "Saved Files", icon: FolderOpen },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "settings", label: "Settings", icon: Settings },
];

export const AppSidebar = ({ currentView, onViewChange, onNewDashboard, mobileMenuOpen, onCloseMobileMenu }: AppSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 block min-[481px]:hidden"
          onClick={onCloseMobileMenu}
        />
      )}
      <div
        className={`
          relative border-r bg-surface flex flex-col shrink-0 overflow-hidden
          transition-all duration-300 ease-in-out z-50
          /* Desktop */
          ${collapsed ? "w-[64px]" : "w-56"}
          /* Tablet */
          max-[1024px]:!w-[56px]
          /* Mobile */
          max-[480px]:!w-64 max-[480px]:fixed max-[480px]:inset-y-0 max-[480px]:left-0
          ${mobileMenuOpen ? "max-[480px]:translate-x-0" : "max-[480px]:-translate-x-full"}
        `}
      >
        {/* Header: Logo + Collapse Toggle */}
        <div className={`h-14 flex items-center border-b shrink-0 px-4
          ${collapsed ? "justify-center !px-0" : "justify-between"}
          max-[1024px]:justify-center max-[1024px]:!px-0
          max-[480px]:!justify-between max-[480px]:!px-4
        `}>
          <span className={`text-sm font-bold tracking-tight whitespace-nowrap overflow-hidden
            ${collapsed ? "hidden" : "block"}
            max-[1024px]:hidden max-[480px]:!block
          `}>
            PowerAI
          </span>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-all duration-200
              max-[1024px]:hidden
            `}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
          <button
            onClick={onCloseMobileMenu}
            className="hidden max-[480px]:block p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
      </div>

        {/* New Dashboard Button */}
        <div className={`p-2 shrink-0 ${collapsed ? "flex justify-center" : ""} max-[1024px]:flex max-[1024px]:justify-center max-[480px]:!block`}>
          <button
            onClick={onNewDashboard}
            title="New Dashboard"
            className={`w-10 h-10 flex items-center justify-center rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shrink-0
              ${collapsed ? "flex" : "hidden"}
              max-[1024px]:!flex max-[480px]:!hidden
            `}
          >
            <Plus className="h-4 w-4" />
          </button>
          
          <Button size="sm" className={`w-full justify-start gap-2 ${collapsed ? "hidden" : "flex"} max-[1024px]:!hidden max-[480px]:!flex`} onClick={onNewDashboard}>
            <Plus className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap overflow-hidden">New Dashboard</span>
          </Button>
        </div>

        {/* Nav Items */}
        <nav className={`flex-1 px-2 py-1 flex flex-col gap-0.5 ${collapsed ? "items-center" : ""} max-[1024px]:items-center max-[480px]:!items-stretch`}>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                onViewChange(id);
              }}
              title={label}
              className={`
                flex items-center gap-2.5 rounded-lg text-sm transition-all duration-200 shrink-0
                ${collapsed ? "w-10 h-10 justify-center" : "w-full px-3 py-2.5 justify-start"}
                max-[1024px]:!w-10 max-[1024px]:!h-10 max-[1024px]:!justify-center max-[1024px]:!p-0
                max-[480px]:!w-full max-[480px]:!px-3 max-[480px]:!py-2.5 max-[480px]:!justify-start
                ${currentView === id
                  ? "bg-background text-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background"
                }
              `}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200
                ${collapsed ? "hidden" : "block"}
                max-[1024px]:hidden max-[480px]:!block
              `}>
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* Collapsed indicator line at bottom */}
        {collapsed && (
          <div className="h-1 w-6 mx-auto mb-3 rounded-full bg-border max-[1024px]:hidden" />
        )}
      </div>
    </>
  );
};
