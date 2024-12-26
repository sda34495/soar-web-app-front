import React, { useState } from "react";
import { useSelector } from "react-redux";

const NotificationDropdown = () => {

  const notifications = useSelector((state: any) => state.profileSlice.notifications);



  return (
    <div className="absolute top-14 right-0 bg-[#1e1e1e] border border-[#454545] rounded-xl shadow-lg py-2 w-64 z-50">
      <div className="px-4 py-2 text-sm font-semibold text-white border-b border-[#454545]">
        Notifications
      </div>
      {notifications.length > 0 ? (
        <ul className="flex flex-col space-y-1">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className="px-4 py-2 hover:bg-custom-gradient-hover cursor-pointer text-gray-300 border-b border-[#454545]"
            >
              <div className="text-sm font-medium">{notification.title}</div>
              <div className="text-xs text-gray-400">{notification.message}</div>
              <div className="text-xs text-gray-500 mt-1">{notification.createdAt}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-2 text-sm text-gray-400">No notifications</div>
      )}
    </div>
  );
};

export default NotificationDropdown;
