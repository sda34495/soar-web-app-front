"use client";
import Image from "next/image";
import React, { useState } from "react";
import PostModal from "./PostModal";
import { CiCirclePlus } from "react-icons/ci";

const UploadPostHandel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handeleSubmit = (e: any) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="flex flex-col cursor-pointer space-y-2 items-center justify-center bg-black border p-6 border-[#7c7c7c] border-dashed max-w-[660px] rounded-md w-full">
        <Image src="/plus.svg" alt="plus icon w-5 h-5" width={30} height={30} />
        <h3>Create the post</h3>
        <p className="text-xs text-[#BDBDBD]">
          For showing your success and watching other growing
        </p>
      </button>

      <PostModal
        title="Title"
        description="Enter your details for setting up your session"
        isOpen={isModalOpen}
      >
        <form onSubmit={handeleSubmit} action="">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Description"
              required
              className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"
            />
            {/* <input type="image" placeholder="Description" className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"/> */}
            <div className="flex flex-col items-start ">
              {/* Upload Button */}
              <label
                htmlFor="upload"
                className={`" border-2  border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-800" ${
                  selectedImage ? "w-96 h-64" : "w-36 h-16 p-1"
                }`}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="object-contain w-full h-full rounded-md"
                  />
                ) : (
                  <div className="flex  items-center">
                    <span className="text-gray-400 text-2xl mr-2">
                      <CiCirclePlus />
                    </span>
                    <span className="text-gray-400">Upload media</span>
                  </div>
                )}
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />

              {/* Optional Clear Button */}
              {selectedImage && (
                <button
                  onClick={() => setSelectedImage(null)}
                  className="mt-1 text-sm text-red-500 hover:underline"
                >
                  Remove Image
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md  border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  id="check4"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <span className="text-gray-400" id="check4">
                Allow comments
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full ">
              <button onClick={() => setIsModalOpen(false)} className="bg-transparent border-[#7C7C7C] border  rounded-full p-3 w-full">
                {" "}
                Cancel
              </button>
              <button
                type="submit"
                className="bg-custom-gradient text-black font-extrabold rounded-full p-3 w-full"
              >
                {" "}
                {selectedImage ? "Publish Post" : "Next"}
              </button>
            </div>
          </div>
        </form>
      </PostModal>
    </div>
  );
};

export default UploadPostHandel;
