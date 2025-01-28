"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditPostModal from "./EditPostModal";
import PostModal from "./PostModal";
import { getData, post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { postActions } from "@/store/post-data";

const DeletePost = ({ post_id, postData }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getData(endpoints.GET_POSTS);
      const postsData = response.data.data.posts;

      if (response?.data?.success) {
        // console.log("Post data before", postsData);
        // console.log("Post data after", postsData);
        dispatch(postActions.updateNewData({ data: postsData }));
      }
    } catch (error) {
      toast.error(error.message || "Error fetching posts");
    }
  };

  const handleDeletePost = async (postId: any) => {
    try {
      const formData = new FormData();
      formData.append("post_id", postId);
      setLoading(true);
      const response = await post(endpoints.DELETE_POST, formData);
      if (response.data.success) {
        console.log("Post deleted successfully");
        fetchPosts();
        setDeleteMode(false);
        toast.success("Post Deleted Successfully");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="text-gray-400 hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BsThreeDotsVertical />
      </button>
      <div
        ref={dropdownRef}
        className={`${
          isOpen ? "flex" : "hidden"
        } absolute flex flex-col   top-6 right-1 bg-[#1e1e1e] border border-[#454545] rounded-lg shadow-lg  w-28 z-50`}
      >
        {/* <button
          className="border-b border-[#454545] py-2 hover:bg-gray-400 rounded-t-lg"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button> */}
        <button
          className="py-2 hover:bg-gray-400 rounded-b-lg"
          onClick={() => setDeleteMode(true)}
        >
          Delete
        </button>
      </div>

      <EditPostModal
        postData={postData}
        editMode={editMode}
        setEditMode={setEditMode}
        editOpen={setIsOpen}
      />

      <PostModal
        isOpen={deleteMode}
        title="Delete Post"
        description="Are you sure you want to delete this post?"
      >
        <div className="mt-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="px-10 w-full py-1 text-white font-semibold rounded-full border-2 border-[#7c7c7c]"
            onClick={() => setDeleteMode(false)}
          >
            Cancel
          </button>
          <button
            className="px-10 w-full py-3 text-black bg-red-600 hover:bg-red-800 rounded-full font-semibold"
            onClick={() => handleDeletePost(post_id)}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </PostModal>
    </div>
  );
};

export default DeletePost;
