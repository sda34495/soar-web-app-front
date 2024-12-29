// src/socket.js
import { profileActions } from "@/store/profile-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const url = process.env.NEXT_PUBLIC_SOCKET_URL;

// Initialize socket connection
const socket = io(url); // Replace with your server URLs

const useSocket = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.profileSlice.user._id);

  useEffect(() => {
    // Function to play click sound
    const playClickSound = () => {
      const audio = new Audio('/click.mp3'); // Ensure this path points to your audio file
      audio.play();
    };

    socket.emit("identify", userId);

    socket.on("notification", (data) => {
      playClickSound(); // Play sound on notification
      dispatch(profileActions.appendNotifications({ data: data.notification }));
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);
};

export default useSocket;
