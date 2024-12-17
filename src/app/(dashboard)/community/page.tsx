"use client";
import Image from "next/image";
import React, { useState } from "react";
import PostModal from "./component/PostModal";
import { CiCirclePlus } from "react-icons/ci";
import UploadPostHandel from "./component/UploadPostHandel";
import PostCard from "./component/PostCard";
import useSidebarLoading from "@/Hook/SidebarLoading";

const Communitypage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle Image Upload
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useSidebarLoading();
  return (
    <div className="">
      
      {/* <UploadPostHandel />

      <div className="flex flex-col items-center justify-center text-center w-[500px] h-[350px] ">
        <div className="flex flex-col max-w-[250px] items-center justify-center p-3 space-y-2">
          <Image
            src="/community.svg"
            alt="plus icon w-5 h-5"
            width={50}
            height={50}
          />
          <h3>No Post available</h3>
          <p className="text-xs text-[#BDBDBD]">
            Posts will be shown when some people will upload
          </p>
        </div>
      </div> */}

      <PostCard />

   
    </div>
  );
};

export default Communitypage;
