import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings } from "lucide-react";

import { usePrivy } from '@privy-io/react-auth'

export function Header() {

    const { login, authenticated, ready, user,logout } = usePrivy()

    return (
        <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-2">
                    <a href="/" className="flex items-center space-x-2">
                        {/* <img
                            alt="elizaos-icon"
                            src="/elizaos-icon.png"
                            className="size-6"
                        /> */}
                        <span className="font-bold text-2xl">Infinity</span>
                    </a>
                </div>

                <div className="flex items-center gap-4">

                {ready && !authenticated && (
              <button
                onClick={login}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            )}
            {authenticated && (
              <>

                <div className="text-white">
                  Welcome, {user?.wallet?.address ? 
                    `${user.wallet.address.slice(0, 5)}...${user.wallet.address.slice(-5)}` 
                    : ''}
                </div>
              </>
            )}

            {authenticated && (
              <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative size-8"
                            >
                                <Avatar className="size-8">
                                    <AvatarFallback>
                                        <Settings className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

              </>
            )}


                </div>
            </div>
        </header>
    );
} 