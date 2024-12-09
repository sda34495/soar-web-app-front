'use client'
import Splash from "@/components/Splash";
import Testauth from "@/components/Testauth";
import FitnessCard from "@/components/UI/FitnessCard";
import Image from "next/image";
import Welcome from "./onboard/welcome/page";
import toast, { Toaster } from "react-hot-toast";
import { use, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    toast.success("Welcome to SOAR");
  },[])

  return (
    <>
    <Splash/>
    <Toaster/>

    
    {/* <Testauth/> */}
    {/* <FitnessCard/> */}
    </>
  );
}
