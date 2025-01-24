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
import Loader from "./component/Loader";

const Communitypage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.postSlice.posts);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page: number, reset: boolean = false) => {
    try {
      const response = await getData(`${endpoints.GET_POSTS}?page=${page}`);
      const postsData = response.data.data.posts;

      if (response?.data?.success) {
        if (reset) {
          dispatch(postActions.updateNewData({ data: postsData })); // Replace posts if resetting
        } else {
          dispatch(postActions.updateNewData({ data: [...posts, ...postsData] })); // Append posts
        }
        setTotalPages(response.data.data.totalPages); // Set totalPages from the response
      }
    } catch (error) {
      toast.error(error.message || "Error fetching posts");
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    // Reset posts when the component mounts
    dispatch(postActions.updateNewData({ data: [] }));
    fetchPosts(1, true); // Fetch the first page and reset posts
  }, [dispatch]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchPosts(currentPage); // Fetch posts for subsequent pages
    }
  }, [currentPage]);

  useSidebarLoading();

  return (
    <div className="flex flex-col">
      {loading ? (
        <Loader isLoading={true} /> // Show skeleton loading
      ) : posts?.length > 0 ? (
        <>
          <PostCard />
          {currentPage < totalPages && (
            <button
              onClick={handleShowMore}
              className="mt-4 bg-black/50 py-2 mx-auto mb-8 rounded-3xl w-[150px] border border-zinc-600 text-white hover:underline"
            >
              Show More..
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center w-[500px] h-[350px]">
          <UploadPostHandel nav={false} />
          <div className="flex flex-col max-w-[250px] items-center justify-center p-3 space-y-2">
            <h3>No Post available</h3>
            <p className="text-xs text-[#BDBDBD]">
              Posts will be shown when some people upload them
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communitypage;
