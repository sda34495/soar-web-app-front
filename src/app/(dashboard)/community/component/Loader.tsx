"use client";
import React from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles

const StaticPostCard = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex flex-col p-6 space-y-8 w-auto">
      {/* Static Post Example */}
      <div className="flex text-white rounded-lg">
        <div className="flex flex-col bg-[#121212] p-6 shadow-lg rounded-lg max-w-[660px] w-full">
          <div className="flex items-start justify-between mb-4 max-w-[660px] w-full">
            <div className="flex items-center space-x-4">
              {isLoading ? (
                <Skeleton circle width={40} height={40} baseColor="#3d3d3d" highlightColor="#555" />
              ) : (
                <img
                  src="/avatar.jpeg" // Placeholder avatar
                  alt="User"
                  className="rounded-full w-10 h-10 object-cover"
                />
              )}
              <div>
                {isLoading ? (
                  <Skeleton width={120} height={16} baseColor="#3d3d3d" highlightColor="#555" />
                ) : (
                  <p className="font-bold">John Doe</p>
                )}
                {isLoading ? (
                  <Skeleton width={80} height={12} baseColor="#3d3d3d" highlightColor="#555" />
                ) : (
                  <p className="text-sm text-gray-400">2 hours ago</p>
                )}
              </div>
            </div>
            <div className="relative">
              <BsThreeDotsVertical className="text-gray-400 cursor-pointer" />
            </div>
          </div>

          {isLoading ? (
            <Skeleton width="60%" height={20} baseColor="#3d3d3d" highlightColor="#555" />
          ) : (
            <h2 className="text-lg font-semibold">Sample Post Header</h2>
          )}
          {isLoading ? (
            <Skeleton width="80%" height={16} baseColor="#3d3d3d" highlightColor="#555" />
          ) : (
            <p className="text-gray-400 mt-2 max-w-[650px] w-full">
              This is a static example of a post description. It replicates a
              Facebook-like post layout.
            </p>
          )}

          <div className="mt-4 items-center max-w-[640px] justify-center mx-auto px-4 bg-slate-400 w-full rounded-xl">
            {isLoading ? (
              <Skeleton width={200}  baseColor="#3d3d3d" highlightColor="#555" className=" h-[400px] mb-2 w-full flex   rounded-md"  />
            ) : (
              <img
                src="/placeholder-image.jpg" // Placeholder image
                alt="Post"
                className="rounded-xl w-[400px] h-[400px] object-cover items-center justify-center mx-auto"
              />
            )}
          </div>

          <div className="flex items-center justify-between mt-4 mr-2">
            {isLoading ? (
              <Skeleton width={60} height={20} baseColor="#3d3d3d" highlightColor="#555" />
            ) : (
              <button className="text-gray-400 text-sm flex items-center cursor-pointer hover:text-blue-500">
                <IoMdHeartEmpty className="mr-2" />
                1.2K Likes
              </button>
            )}
            {isLoading ? (
              <Skeleton width={60} height={20} baseColor="#3d3d3d" highlightColor="#555" />
            ) : (
              <button className="text-gray-400 hover:text-blue-500 text-sm flex items-center">
                <IoChatbubbleEllipsesOutline className="mr-2" />
                345 Comments
              </button>
            )}
            {isLoading ? (
              <Skeleton width={60} height={20} baseColor="#3d3d3d" highlightColor="#555" />
            ) : (
              <button className="text-gray-400 hover:text-blue-500 flex items-center">
                <RiShareLine className="mr-2" />
                Share
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPostCard;
