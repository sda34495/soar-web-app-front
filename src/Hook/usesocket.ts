// src/socket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

// Initialize socket connection
const socket = io("http://localhost:8082"); // Replace with your server URL

const useSocket = () => {
  const userId = "hello123" //replace with the actual user id
  useEffect(() => {
    socket.emit("identify", userId);

    socket.on("notification", (data) => {
      console.log("New notification:", data.message);
      alert(`Notification: ${data.message}`);
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);
};

export default useSocket;
