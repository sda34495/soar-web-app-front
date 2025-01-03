"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "@/store/post-data";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import toast from "react-hot-toast";
import PostCard from "./component/PostCard";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import UploadPostHandel from "./component/UploadPostHandel";
import useSocket from "@/Hook/usesocket";
import Loader from "./component/Loader"; // Import StaticPostCard

const Communitypage = () => {
  useSocket();
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.postSlice.posts); // Access posts from Redux store
  const [loading, setLoading] = useState(true); // Loading state

  const fetchPosts = async () => {
    try {
      const response = await getData(endpoints.GET_POSTS);
      const postsData = response.data.data;

      if (response?.data?.success) {
        dispatch(postActions.updateNewData({ data: postsData }));
      }
    } catch (error) {
      toast.error(error.message || "Error fetching posts");
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    
    fetchPosts(); // Fetch posts on mount
  }, []);

  useSidebarLoading();

  return (
    <div className="flex flex-col">
      {loading ? (
        <Loader isLoading={true} /> // Show skeleton loading
      ) : posts?.length > 0 ? (
        <PostCard />
      ) : (
        <div className="flex flex-col items-center justify-center text-center w-[500px] h-[350px]">
          <UploadPostHandel nav={false} />
          <div className="flex flex-col max-w-[250px] items-center justify-center p-3 space-y-2">
            <h3>No Post available</h3>
            <p className="text-xs text-[#BDBDBD]">
              Posts will be shown when some people will upload
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communitypage;
