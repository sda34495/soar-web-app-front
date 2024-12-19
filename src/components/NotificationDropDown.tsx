import React, { useState } from "react";

const NotificationDropdown = () => {
  // Dummy notification data
  const [notifications] = useState([
    {
      id: 1,
      title: "New Message",
      description: "You have received a new message from John.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "System Update",
      description: "Your system has been updated successfully.",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      title: "New Comment",
      description: "Anna commented on your post.",
      timestamp: "3 days ago",
    },
  ]);

  return (
    <div className="absolute top-14 right-0 bg-[#1e1e1e] border border-[#454545] rounded-xl shadow-lg py-2 w-64 z-50">
      <div className="px-4 py-2 text-sm font-semibold text-white border-b border-[#454545]">
        Notifications
      </div>
      {notifications.length > 0 ? (
        <ul className="flex flex-col space-y-1">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="px-4 py-2 hover:bg-custom-gradient-hover cursor-pointer text-gray-300 border-b border-[#454545]"
            >
              <div className="text-sm font-medium">{notification.title}</div>
              <div className="text-xs text-gray-400">{notification.description}</div>
              <div className="text-xs text-gray-500 mt-1">{notification.timestamp}</div>
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
