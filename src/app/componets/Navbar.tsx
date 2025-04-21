"use client";

import {
  Heart,
  MessageSquare,
  Users,
  Home,
  BookOpen,
  Star,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

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
    <nav className="top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
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
              icon={<Home className="h-5 w-5" />}
              text="Home"
              href="/"
              active
            />
            <NavItem
              icon={<Users className="h-5 w-5" />}
              text="Members"
              href="/member"
            />
            <NavItem
              icon={<BookOpen className="h-5 w-5" />}
              text="Stories"
              href="/stories"
            />
            <NavItem
              icon={<Star className="h-5 w-5" />}
              text="Reviews"
              href="/reivew"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {accessToken ? (
              isprofile_complete ? (
                // ✅ Profile is complete — show normal logged-in UI
                <div className="flex items-center space-x-4">
                  <button className="relative p-1 text-gray-600 hover:text-rose-500 transition-colors">
                    <MessageSquare className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-8 w-8 cursor-pointer border-2 border-rose-500 transition-transform hover:scale-105">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push("/profile")}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/settings")}
                      >
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                // ❗ Profile incomplete — show Complete Profile button
                <Button
                  onClick={() => router.push("/onboarding")}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Complete Profile
                </Button>
              )
            ) : (
              // ❌ Not logged in — show login/signup
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="hidden sm:inline-flex cursor cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md  cursor cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu */}
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
        active ? "text-rose-600" : "text-gray-700"
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
