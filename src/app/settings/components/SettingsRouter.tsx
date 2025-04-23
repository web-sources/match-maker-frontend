// components/SettingsRouter.tsx
"use client";

import { usePathname } from "next/navigation";
import ProfileSettings from "../profile/page";
import ChangePassword from "../changepassword/page";
import Image from "next/image";
//import SecuritySettings from "./settings/SecuritySettings";
//import NotificationSettings from "./settings/NotificationSettings";
//import PrivacySettings from "./settings/PrivacySettings";
//import DiscoverySettings from "./settings/DiscoverySettings";
//import SubscriptionSettings from "./settings/SubscriptionSettings";
//import BlockedUsersSettings from "./settings/BlockedUsersSettings";

export default function SettingsRouter() {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {pathname === "/settings/profile" && <ProfileSettings />}
      {pathname === "/settings/changepassword" && <ChangePassword />}
      {/* {pathname === "/settings/security" && <SecuritySettings />} */}
      {/* {pathname === "/settings/notifications" && <NotificationSettings />} */}
      {/* {pathname === "/settings/privacy" && <PrivacySettings />} */}
      {/* {pathname === "/settings/discovery" && <DiscoverySettings />} */}
      {/* {pathname === "/settings/subscription" && <SubscriptionSettings />} */}
      {/* {pathname === "/settings/blocked" && <BlockedUsersSettings />} */}

      {/* Fallback for root settings path */}
      {pathname === "/settings" && (
        <div className="flex flex-col items-center justify-center h-80 text-center">
          <Image
            src="/setting.png"
            width={128}
            height={128}
            className="w-32 mb-4"
            alt="Settings"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome to Settings
          </h2>
          <p className="text-gray-500 text-sm">
            Select a category from the left to get started.
          </p>
        </div>
      )}
    </div>
  );
}
