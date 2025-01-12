"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams for dynamic route params
import { useSelector } from "react-redux";
import { getData, post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import toast from "react-hot-toast";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareLine } from "react-icons/ri";
import EditOrDeletePost from "../../component/EditOrDeletePost";
import Comments from "../../component/Comments";
import ShareModal from "@/components/ShareModal";


const PostDetail = () => {
  const { id } = useParams(); // Get params directly
  const currentUserId = useSelector((state: any) => state.profileSlice.user._id); // Logged-in user ID
  const [post, setPost] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [activeComments, setActiveComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(false); // State to toggle comments visibility
  const baseURL = "http://localhost:3000/community/post/";
  const [shareModal, setShareModal] = useState(false);

  // Fetch post data by ID
  useEffect(() => {
    if (!id) return; // If ID is not available, don't fetch the data yet

    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getData(`${endpoints.GET_POST_BY_ID}/${id}`);
        console.log("Fetched Post Response:", response);

        if (response?.data?.success) {
          const fetchedPost = response.data.data;
          setPost({
            ...fetchedPost,
            allow_comments: fetchedPost.allow_comments ?? false,
          });
          setLiked(fetchedPost.self_liked ?? false);
        } else {
          toast.error("Failed to fetch post details.");
        }
      } catch (error) {
        toast.error(error.message || "Error fetching post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle like/unlike button click
  const handleLikeClick = async () => {
    if (!post?._id) return;

    const isSelfLiked = !liked; // Toggle current like state
    setLiked(isSelfLiked); // Optimistically update local like state

    try {
      const response = await post(endpoints.POST_LIKE, {
        post_id: post._id,
        self_liked: isSelfLiked,
      });
      if (response?.data?.success) {
        setPost((prev: any) => ({
          ...prev,
          likes: isSelfLiked ? prev.likes + 1 : prev.likes - 1, // Update likes count
          self_liked: isSelfLiked, // Update self_liked status
        }));
      } else {
        toast.error("Failed to update like status.");
        setLiked(!isSelfLiked); // Revert state on failure
      }
    } catch (error) {
      toast.error(error.message || "Error updating like status.");
      setLiked(!isSelfLiked); // Revert state on error
    }
  };

  // Copy share link to clipboard
  const handleCopyLink = () => {
    setShareModal(true);
  };

  // Toggle comment visibility
  const handleCommentToggle = () => {
    setCommentsVisible((prev) => !prev);
  };
  


  if (loading) return <p className="text-center text-white">Loading post...</p>;
  if (!post) return <p className="text-center text-white">Post not found.</p>;

  return (
    <>
    <div className="flex flex-row items-center h-min-screen text-white  mx-auto">
       
          
        <div className="flex flex-col bg-[#121212] p-6 shadow-lg rounded-lg max-w-3xl w-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={post?.user?.profile_url || "/avatar.jpeg"}
              alt={post.user?.user_name || "User"}
              className="rounded-full w-10 h-10 object-cover"
              />
            <div>
              <p className="font-bold">{post.user?.user_name || "User"}</p>
              <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="relative">

          {post.user_id === currentUserId && (
            <EditOrDeletePost post_id={post._id} postData={post} />
            )}
            </div>
        </div>

        <h2 className="text-lg font-semibold">{post.header}</h2>
        <p className="text-gray-400 mt-2">{post.description}</p>

        {post.media && (
          <div className="mt-4">
            <img
              src={post.media}
              alt="Post media"
              className="rounded-lg w-full max-w-[640px] object-cover mx-auto"
              />
          </div>
        )}

        {/* Like, Comment, Share */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleLikeClick}
            className="flex items-center text-gray-400 text-sm hover:text-white"
            >
            {liked ? (
              <IoMdHeart className="mr-2 text-white" />
              ) : (
                <IoMdHeartEmpty className="mr-2" />
                )}
            {post.likes.toLocaleString()} Likes
          </button>

          <button
            onClick={handleCommentToggle} // Handle comment toggle
            className={`text-sm flex items-center ${
              post.allow_comments ? "text-gray-400 hover:text-white" : "text-gray-600 cursor-not-allowed"
            }`}
            disabled={!post.allow_comments}
            >
            <IoChatbubbleEllipsesOutline className="mr-2" />
            {post.total_comments} {post.total_comments === 1 ? "Comment" : "Comments"}
          </button>

          <button onClick={handleCopyLink} className="text-gray-400 hover:text-white flex items-center">
            <RiShareLine className="mr-2" />
            Share
          </button>
          
        </div>
        <div>

      
          </div>
         
          
        </div>

        <div className="flex h-full">
          
       
      {commentsVisible && post.allow_comments && (
        <Comments
        postData={post}
        activePostId={post._id}
        activeComments={activeComments}
        setActiveComments={setActiveComments} setActivePostId={undefined} handleCommentToggle={handleCommentToggle}        />
        )}
        </div>
            
       
      </div>

      {/* Comments Section */}
      
    
    <ShareModal title={"Share Post"} description={"Copy the link or Share via Social plattform"} isOpen={shareModal} image_url={"/copy.svg"} linkToShare={`${baseURL}/${id}`} onClose={()=>setShareModal(false)}
    />
    </>
  );
};

export default PostDetail;
