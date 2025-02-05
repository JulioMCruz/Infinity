import PageTitle from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePrivy } from '@privy-io/react-auth'
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    
    const { authenticated } = usePrivy()

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex flex-col gap-4 h-full p-4">
            <PageTitle 
                title="Dashboard" 
                subtitle="Welcome to your dashboard" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Agents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Chats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">0</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 