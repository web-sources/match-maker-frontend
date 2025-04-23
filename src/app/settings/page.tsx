import React from "react";
import { SettingsSidebar } from "./components/settingSidebar";
import SettingsRouter from "./components/SettingsRouter";

const SettingPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="md:col-span-1">
          <SettingsSidebar />
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          <SettingsRouter />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
