"use client";
import React, { useState, useEffect } from "react";
import { getData, post } from "@/utils/axios";
import toast from "react-hot-toast";
import endpoints from "@/utils/endpoints";

const Notification = () => {
  const [deviceNotifications, setDeviceNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch initial state from the server
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const response = await getData(endpoints.GET_PROFILE_DETAILS);
        console.log("API Response:", response.data);

        if (response?.data?.success) {
          const { device_notification, email_notification } = response.data.data;

          setDeviceNotifications(device_notification || false);
          setEmailNotifications(email_notification || false);
        } else {
          toast.error(response?.data?.message || "Failed to fetch preferences.");
        }
      } catch (error) {
        console.error("Error fetching notification settings:", error);
        toast.error("Failed to load notification preferences. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationSettings();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await post(endpoints.UPATE_PROFILE_SETTINGS, {
        device_notification: deviceNotifications,
        email_notification: emailNotifications,
      });
      toast.success(response.data?.message || "Preferences updated successfully.");
    } catch (error) {
      console.error("Error updating notification settings:", error);
      toast.error("Failed to update notification preferences. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form className="max-w-[660px] space-y-8" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold text-[#EFEFEF]">Notification preferences</h3>

        <div className="flex items-center justify-between">
          <p className="text-[#7c7c7c] font-medium text-xl">
            Receive notifications on device
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={deviceNotifications}
              onChange={() => setDeviceNotifications((prev) => !prev)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00AB5B]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[#7c7c7c] font-medium text-xl">
            Receive notifications on your email
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications((prev) => !prev)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00AB5B]"></div>
          </label>
        </div>

        <button
          type="submit"
          className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Notification;
