"use client";
import { getData, post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareLine } from "react-icons/ri";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "@/store/post-data";
import EditOrDeletePost from "./EditOrDeletePost";

const PostCard = () => {
  const posts = useSelector((state: any) => state.postSlice.posts);
  const currentUserId = useSelector((state: any) => state.profileSlice.user._id);
  const [activePostId, setActivePostId] = useState(null);
  const [activeComments, setActiveComments] = useState([]);
  const [activeReply, setActiveReply] = useState("");
  const [editPost, setEditPost] = useState(null);
  const dispatch = useDispatch();

  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  // Fetch posts data from the server
  const fetchPosts = useCallback( async () => {
  try {
    const response = await getData(endpoints.GET_POSTS);
    if (response?.data?.success) {
      const postsData = response.data.data.posts;
      
        // Dispatch posts to Redux

      // Initialize likedPosts based on self_like
      const initialLikedPosts: { [key: string]: boolean } = {};
      postsData.forEach((post: any) => {
        initialLikedPosts[post._id] = post.self_liked; // Use self_like from the server
      });
      setLikedPosts(initialLikedPosts);
    }
  } catch (error) {
    toast.error(error.message || "Error fetching posts");
  }
}, []);


  useEffect(() => {
    // fetchPosts();
  
      
      fetchPosts();
    
    
  }, []);

  // Handle like button click
  const handleLikeClick = async (postId: string) => {
    if (!postId) {
      console.error("Invalid postId", postId);
      return;
    }

    const isSelfLiked = !likedPosts[postId]; // Toggle the current self_like state
    setLikedPosts((prev) => ({ ...prev, [postId]: isSelfLiked })); // Optimistically update the local state

    try {
      const response = await post(endpoints.POST_LIKE, {
        post_id: postId,
        self_liked: isSelfLiked,
      });
      if (response.data.success) {
        // Update Redux store with the new self_like state and like count
        dispatch(
          postActions.updateNewData({
            data: posts.map((post: any) => {
              if (post._id === postId) {
                return {
                  ...post,
                  self_like: isSelfLiked, // Update the self_like state
                  likes: isSelfLiked ? post.likes + 1 : post.likes - 1, // Adjust the like count
                };
              }
              return post;
            }),
          })
        );
        // toast.success(isSelfLiked ? "You liked this post!" : "You unliked this post!");
      } else {
        toast.error("Failed to update your like status.");
        // Revert the like state in case of failure
        setLikedPosts((prev) => ({ ...prev, [postId]: !isSelfLiked }));
      }
    } catch (error) {
      console.error("Error during like operation:", error);
      toast.error(error.message || "Error updating your like status.");
      // Revert the like state in case of failure
      setLikedPosts((prev) => ({ ...prev, [postId]: !isSelfLiked }));
    }
  };

  const handleCommentToggle = async (postId: any) => {
    console.log("postId:", postId);
    if (activePostId === postId) {
      setActivePostId(null);
      setActiveComments([]); // Clear comments when toggling off
      return;
    }
  
    // Otherwise, fetch comments for the new post and set it as active
    setActivePostId(postId);
    

    try {
      const response = await getData(
        `${endpoints.GET_POST_COMMENTS}?post_id=${postId}`
      );
      if (response.data?.success) {
        setActiveComments(response.data.data);
        setActiveReply(response?.data?.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEditPost = async (postId: any) => {
    if (activePostId !== postId) {
      setActivePostId(activePostId === postId ? null : postId);
    }

    try {
      const response = await getData(
        `${endpoints.GET_POST_COMMENTS}?post_id=${postId}`
      );
      if (response.data?.success) {
        setActiveComments(response.data.data);
        setActiveReply(response?.data?.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  return (
    <div className="flex flex-col p-6 space-y-8 w-auto">
      {posts.map((post: any) => (
        <div key={post._id} className="flex text-white rounded-lg">
          <div className="flex flex-col bg-[#121212] p-6 shadow-lg rounded-l-lg max-w-[660px] w-full">
            <div className="flex items-start justify-between mb-4 max-w-[660px] w-full">
              <div className="flex items-center space-x-4">
                <img
                  src={`${post?.user?.profile_url || "/avatar.jpeg"}`} // Replace with actual avatar
                  alt={post.user?.user_name || "User"}
                  className="rounded-full w-10 h-10 object-cover"
                />
                <div>
                  <p className="font-bold">{post.user?.user_name || "User"}</p>
                  <p className="text-sm text-gray-400">{post.timeAgo}</p>
                </div>
              </div>
              <div className="relative">
               
              {post?.user?._id === currentUserId && (
                  <EditOrDeletePost post_id={post._id} postData={post} />
                )}
              </div>
            </div>

            <h2 className="text-lg font-semibold">{post.header}</h2>
            <p className="text-gray-400 mt-2 max-w-[650px] w-full">
              {post.description}
            </p>

            {post.media && (
              <div className="mt-4 items-center max-w-[640px] justify-center mx-auto px-4 bg-slate-400 w-full rounded-xl">
                <img
                  src={post.media}
                  alt="Post"
                  className="rounded-xl w-[400px] h-[400px] object-cover items-center justify-center mx-auto"
                />
              </div>
            )}

            {/* Like Button */}
            <div className="flex items-center justify-between mt-4 mr-2">
              <button
                onClick={() => handleLikeClick(post._id)}
                className="text-gray-400 text-sm flex items-center cursor-pointer"
              >
                {likedPosts[post._id] ? (
                  <IoMdHeart className="mr-2 text-white" />
                ) : (
                  <IoMdHeartEmpty className="mr-2 text-gray-400" />
                )}
                {post.likes.toLocaleString()} Likes
              </button>

              <button
              
                onClick={() => handleCommentToggle(post._id)}
                className="text-gray-400 hover:text-white text-sm flex items-center"
              >
                <IoChatbubbleEllipsesOutline className="mr-2" />
                {post.total_comments}{" "}
                {post.total_comments >= 2 ? "Comments" : "Comment"}
              </button>
              <button className="text-gray-400 hover:text-white flex items-center">
                <RiShareLine className="mr-2" />
                Share
              </button>
            </div>
          </div>

          <Comments
            postData={post}
            activePostId={activePostId}
            setActivePostId={setActivePostId}
            handleCommentToggle={handleCommentToggle}
            activeComments={activeComments}
            setActiveComments={setActiveComments}
          />
        </div>
      ))}
    </div>
  );
};

export default PostCard;