import { useLocation } from "react-router";
import { AppSidebar } from "./app-sidebar";

export function SidebarWrapper() {
    const location = useLocation();
    const showSidebar = location.pathname === '/home' || 
                       location.pathname.startsWith('/chat/') || 
                       location.pathname.startsWith('/settings/');

    if (!showSidebar) return null;
    
    return <AppSidebar />;
} 