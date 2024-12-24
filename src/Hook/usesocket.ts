// src/socket.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";


const url = process.env.NEXT_PUBLIC_SOCKET_URL;

// Initialize socket connection
const socket = io(url); // Replace with your server URL

const useSocket = () => {


  const userId = useSelector((state: any) => state.profileSlice.user._id);
  console.log(userId)
  console.log(url)
  // const userId = "hello123" //replace with the actual user id
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
