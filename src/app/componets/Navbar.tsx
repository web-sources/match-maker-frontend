"use client";

import {
  MessageSquare,
  Users,
  Home,
  BookOpen,
  Star,
  Menu,
  User,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export function Navbar() {
  const { accessToken, logout, isprofile_complete } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return nothing until mounted
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Heart className="h-8 w-8 text-rose-500 fill-rose-500 drop-shadow-md animate-pulse" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
              Matchmaker
            </span>
          </div>

          {/* Center nav items */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem
              icon={<Home className="h-5 w-5 text-white" />}
              text="Home"
              href="/"
              active
            />
            <NavItem
              icon={<Users className="h-5 w-5 text-white" />}
              text="Members"
              href="/member"
            />
            <NavItem
              icon={<BookOpen className="h-5 w-5 text-white" />}
              text="Stories"
              href="/stories"
            />
            <NavItem
              icon={<Star className="h-5 w-5 text-white" />}
              text="Reviews"
              href="/reivew"
            />
          </div>

          <div className="flex items-center space-x-4">
            {accessToken ? (
              isprofile_complete ? (
                <div className="flex items-center space-x-4">
                  <button
                    className="relative p-2 rounded-full hover:bg-pink-50 transition-colors"
                    onClick={() => router.push("/messages")}
                  >
                    <MessageSquare className="h-5 w-5 text-gray-600 hover:text-pink-500 cursor cursor-pointer" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-xs text-white flex items-center justify-center border-2 border-white">
                      3
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:outline-none">
                        <Avatar className="h-9 w-9 cursor-pointer border-2 border-pink-200 hover:border-pink-300 transition-all hover:scale-105">
                          <AvatarImage src={"/default-avatar.jpg"} />
                          <AvatarFallback className="bg-pink-100 text-pink-600">
                            {"U"}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 rounded-xl shadow-lg border border-gray-100 p-2"
                    >
                      <DropdownMenuLabel className="px-4 py-2 font-medium text-gray-900 flex items-center">
                        <User className="h-4 w-4 mr-2 text-pink-500" />
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-100" />

                      <DropdownMenuItem
                        className="px-4 py-2 rounded-lg hover:bg-pink-50 cursor-pointer focus:bg-pink-50"
                        onClick={() => router.push("/profile")}
                      >
                        <User className="h-4 w-4 mr-2 text-gray-600" />
                        View Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="px-4 py-2 rounded-lg hover:bg-pink-50 cursor-pointer focus:bg-pink-50"
                        onClick={() => router.push("/settings")}
                      >
                        <Settings className="h-4 w-4 mr-2 text-gray-600" />
                        Settings
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-gray-100" />

                      <DropdownMenuItem
                        className="px-4 py-2 rounded-lg hover:bg-pink-50 cursor-pointer focus:bg-pink-50 text-red-500"
                        onClick={logout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button
                  onClick={() => router.push("/onboarding")}
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-md"
                >
                  Complete Profile
                </Button>
              )
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md cursor cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md cursor cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden text-gray-500 hover:text-gray-700 transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-white p-6">
                <div className="space-y-6 mt-10">
                  <NavItem icon={<Home />} text="Home" href="/" />
                  <NavItem icon={<Users />} text="Members" href="/member" />
                  <NavItem icon={<BookOpen />} text="Stories" href="/stories" />
                  <NavItem icon={<Star />} text="Reviews" href="/review" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  href: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <a
      href={href}
      className={`relative group flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
        active ? "text-rose-600" : "text-white"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {text}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-rose-500 to-pink-500 transform transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${
          active ? "scale-x-100" : ""
        }`}
      ></span>
    </a>
  );
}
