import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "./components/app-sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import Chat from "./routes/chat";
import Overview from "./routes/overview";
import Home from "./routes/home";
import useVersion from "./hooks/use-version";
import Dashboard from "./routes/dashboard";
import Landing from "./routes/landing";
import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { Header } from "./components/header";
import { PrivyWrapper } from "./lib/privy/provider";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Number.POSITIVE_INFINITY,
        },
    },
});

function App() {
    useVersion();
    return (
        <QueryClientProvider client={queryClient}>
            <PrivyWrapper>
                <div
                    className="dark antialiased min-h-screen"
                    style={{
                    colorScheme: "dark",
                        }}
                    >
                <BrowserRouter>
                    <TooltipProvider delayDuration={0}>
                        <SidebarProvider>
                            <div className="flex flex-col size-full mx-6">
                                <Header />
                                <div className="flex flex-1">
                                    <SidebarWrapper />
                                    <SidebarInset>
                                        <Routes>
                                            <Route path="/" element={<Landing />} />
                                            <Route path="/home" element={<Home />} />
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route
                                                path="chat/:agentId"
                                                element={<Chat />}
                                            />
                                            <Route
                                                path="settings/:agentId"
                                                element={<Overview />}
                                            />
                                        </Routes>
                                    </SidebarInset>
                                </div>
                            </div>
                        </SidebarProvider>
                        <Toaster />
                    </TooltipProvider>
                </BrowserRouter>
            </div>
            </PrivyWrapper>
        </QueryClientProvider>
    );
}

export default App;
