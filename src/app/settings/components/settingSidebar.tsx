// components/SettingsSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Lock,
  Bell,
  Shield,
  CreditCard,
  EyeOff,
  Globe,
  Key,
} from "lucide-react";

const settingsLinks = [
  {
    name: "Profile",
    href: "/settings/profile",
    icon: <User className="h-4 w-4" />,
  },
  {
    name: "Change Password",
    href: "/settings/changepassword",
    icon: <Key className="h-4 w-4" />,
  },
  {
    name: "Account Security",
    href: "/settings/security",
    icon: <Lock className="h-4 w-4" />,
  },
  {
    name: "Notifications",
    href: "/settings/notifications",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    name: "Privacy",
    href: "/settings/privacy",
    icon: <EyeOff className="h-4 w-4" />,
  },
  {
    name: "Discovery Preferences",
    href: "/settings/discovery",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    name: "Subscription",
    href: "/settings/subscription",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    name: "Blocked Users",
    href: "/settings/blocked",
    icon: <Shield className="h-4 w-4" />,
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {settingsLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            pathname === link.href
              ? "bg-pink-50 text-pink-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span className="mr-3">{link.icon}</span>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
