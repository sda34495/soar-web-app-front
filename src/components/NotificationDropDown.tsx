import React from "react";
import { useSelector } from "react-redux";

// Function to format date in a human-readable format
const formatDate = (timestamp) => {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"; // Return fallback if invalid date
  }

  const now = new Date();
  const diffInMilliseconds = now - date; 

  // Calculate the difference in seconds
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  // Return a formatted date based on the time difference
  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 172800) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString(); // Return the date in a localized string format
  }
};

const NotificationDropdown = () => {
  const notifications = useSelector((state:any) => state.profileSlice.notifications);

  return (
    <div className="absolute top-14  md:top-14 md:right-0 bg-[#1e1e1e] border border-[#454545] rounded-xl shadow-lg py-2 w-64 z-50">
      <div className="px-4 py-2 text-sm font-semibold text-white border-b border-[#454545]">
        Notifications
      </div>
      {notifications.length > 0 ? (
        <ul className="flex flex-col space-y-1 max-h-40 sm:max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
            <li
              key={notification._id}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-300 border-b border-[#454545]"
            >
              <div className="text-sm font-medium ">{notification.title}</div>
              <div className="text-xs text-gray-400">{notification.message}</div>
              <div className="text-xs text-gray-500 mt-1">
                {formatDate(notification.createdAt)} 
              </div>
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
