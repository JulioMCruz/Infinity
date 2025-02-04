import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/page-title";
import { NavLink } from "react-router";

export default function Landing() {
    return (
        <div className="flex flex-col gap-4 h-full p-4">
            <PageTitle 
                title="Welcome to Infinity" 
                subtitle="Your AI companion platform" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Get Started</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <p className="text-muted-foreground">
                            Begin your journey with ElizaOS by exploring our AI agents or checking out the dashboard.
                        </p>
                        <div className="flex gap-4">
                            <NavLink to="/dashboard" className="flex-1">
                                <Button className="w-full">Dashboard</Button>
                            </NavLink>
                            <NavLink to="/home" className="flex-1">
                                <Button variant="outline" className="w-full">View Agents</Button>
                            </NavLink>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Documentation</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <p className="text-muted-foreground">
                            Learn more about ElizaOS features and capabilities through our comprehensive documentation.
                        </p>
                        <NavLink to="https://elizaos.github.io/eliza/docs/intro/" target="_blank">
                            <Button variant="outline" className="w-full">View Documentation</Button>
                        </NavLink>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 