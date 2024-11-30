"use client";
import React, { useState } from 'react';

const NotificationPreferences = () => {
  const [deviceNotifications, setDeviceNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="max-w-lg mx-auto p-6 text-white rounded-lg mt-16  ml-1">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 text-sm font-medium  bg-[#202020]  text-gray-400 rounded-full hover:bg-gray-700">
          General profile
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full shadow-md">
          Notifications
        </button>
        <button className="px-4 py-2 text-sm font-medium  bg-[#202020] text-gray-400 rounded-full hover:bg-gray-700">
          Password security
        </button>
      </div>

      {/* Notification Preferences */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Notification preferences</h3>

        {/* Notification on Device */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">Receive notifications on device</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={deviceNotifications}
              onChange={() => setDeviceNotifications(!deviceNotifications)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer-checked:bg-green-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>

        {/* Notification on Email */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-400">Receive notifications on your email</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer-checked:bg-green-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>

        {/* Save Settings Button */}
        <button className="px-6 py-2 text-black c bg-custom-gradient hover:bg-custom-gradient-hover rounded-full font-medium hover:from-yellow-500 hover:to-yellow-700">
        Save Settings
              </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
