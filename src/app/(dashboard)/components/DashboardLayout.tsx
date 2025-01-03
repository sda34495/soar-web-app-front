"use client";
import React, { useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "@/components/UI/Navbar";
import { Provider, useSelector } from "react-redux";
import store from "@/store/store";
import Link from "next/link";

const MainContent = ({ children }: any) => {
  const userData = useSelector((state: any) => state.profileSlice.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
    }
  }, []);

  const isSubscribed = userData?.is_subscribed;

  return (
    <div className="flex justify-center bg-yellow-900 min-h-screen relative">
      <div className="grid md:grid-cols-[1fr,4fr] max-w-screen w-full bg-white shadow-lg">
        {/* Sidebar */}
        <div className="bg-[#121212] hidden z-10 text-white md:flex justify-center overflow-y-auto h-screen sticky top-0 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 scrollbar-thumb-rounded">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="bg-[#191919] text-white flex flex-col relative">
          {/* Circle with Gradient and Blur */}
          <div className="absolute top-24 right-0 w-[200px] h-[600px] bg-[#f4d494] blur-[150px] rounded-full opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#663A1D] blur-[120px] rounded-full opacity-50"></div>

          <div className="sticky top-0 max-w-6xl z-50 p-4">
            <Navbar />
          </div>

          <div className="flex-1 overflow-y-auto z-10 px-4 max-w-6xl">
            {children}
          </div>
        </div>
      </div>

      {/* Blurry Overlay for Unsubscribed Users */}
      {userData.is_subscribed == false && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="text-center text-white px-6 py-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Subscription Required</h2>
            <p className="mb-4">
              You need to subscribe to continue using this program.
            </p>

            <Link
              href="/onboard/package"
              className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const MainLayout = ({ children }: any) => {
  return (
    <Provider store={store}>
      <MainContent>{children}</MainContent>
    </Provider>
  );
};

export default MainLayout;
