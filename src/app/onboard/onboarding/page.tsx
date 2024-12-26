"use client";
import React, { useEffect } from "react";
import Onboarding from "./component/Onboarding";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter(); // Initialize the router for redirection

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  });
  return <Onboarding />;
};

export default Page;
