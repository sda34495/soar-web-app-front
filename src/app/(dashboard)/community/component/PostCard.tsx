"use client";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareLine } from "react-icons/ri";

const PostCard = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Chance Levin",
      time: "7 hours ago",
      title: "Body strength - my primary goal",
      description:
        "I want to express that after 6 months of our cooperation it is necessary to test yo",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg4WJdn8aO5G5JFXyTBUh8WhnWQJyw3eVNw&s", // Replace with an actual image URL
      likes: "2.5K",
      comments: [
        "Amazing progress, you are awesome!",
        "Keep up the good work!",
      ],
    },
    {
      id: 2,
      user: "Cheng",
      time: "1 day ago",
      title: "Endurance training is everything",
      description:
        "Building stamina to excel in workouts. ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg4WJdn8aO5G5JFXyTBUh8WhnWQJyw3eVNw&s", // Replace with an actual image URL
      likes: "3.5K",
      comments: ["Keep going, you're doing great!"],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [activePostId, setActivePostId] = useState(null);

  const handleCommentToggle = (postId: any) => {
    setActivePostId(activePostId === postId ? null : postId);
  };

  const handleAddComment = (postId: any) => {
    if (!newComment.trim()) return;
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    );
    setPosts(updatedPosts);
    setNewComment("");
    // setActivePostId(null);
  };

  return (
    <div className="flex flex-col p-6  space-y-8 w-auto ">
      {posts.map((post: any) => (
        <div
          key={post.id}
          className="flex   text-white rounded-lg    "
        >
          <div className="flex flex-col bg-[#121212] p-6 shadow-lg rounded-l-lg max-w-[660px] w-full ">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 max-w-[660px] w-full">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/40" // Replace with actual avatar
                  alt={post.user}
                  className="rounded-full w-10 h-10 object-cover"
                />
                <div>
                  <p className="font-bold">{post.user}</p>
                  <p className="text-sm text-gray-400">{post.time}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <BsThreeDotsVertical />
              </button>
            </div>

            {/* Title and Description */}
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-gray-400 mt-2 max-w-[650px] w-full">
              {post.description}{" "}
              <span className="text-blue-500 cursor-pointer">Read more</span>
            </p>

            {/* Image */}
            <div className="mt-4 items-center max-w-[640px] justify-center mx-auto px-4 bg-slate-400 w-full rounded-xl">
              <img
                src={post.image}
                alt="Post"
                className="rounded-xl w-[400px] h-[400px] object-cover items-center justify-center mx-auto  "
              />
            </div>

            {/* Interaction Buttons */}
            <div className="flex items-center justify-between  mt-4 mr-2">
              <p className="text-gray-400 text-sm flex items-center cursor-pointer">
              <IoMdHeartEmpty className="mr-2"/>
                {post.likes.toLocaleString()} Likes
              </p>
              <button
                onClick={() => handleCommentToggle(post.id)}
                className="text-gray-400 hover:text-blue-500 text-sm flex items-center"
              >
                <IoChatbubbleEllipsesOutline className="mr-2"/>
                {post.comments.length}   Comments
              </button>
              <button className="text-gray-400 hover:text-blue-500 flex items-center">
              <RiShareLine className="mr-2"  />
                Share
              </button>
            </div>
          </div>

          {activePostId === post.id && (
            <div className="w-full bg-[#121212] p-6 rounded-r-lg shadow-lg max-w-[360px] ">
              {/* Comment Box */}

              <div className="flex items-center justify-between">
                <p className="text-white ">Comments</p>
                <BsThreeDotsVertical />
              </div>
              <div className="">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment"
                  rows={4}
                  className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"
                />
                <div className="flex items-center justify-end space-x-4 mt-2">
                  <button
                    // onClick={() => setActivePostId(null)}
                    className="bg-transparent border-[#7C7C7C] border  rounded-full p-3 w-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="bg-custom-gradient text-black font-extrabold rounded-full p-3 w-full"
                  >
                    Comment
                  </button>
                </div>
              </div>
             

              {/* Comments */}
              <div className="mt-6">
                {post.comments.map((comment: any, index: any) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between space-x-6 my-3 ${
                      index === 0 ? "border-t border-gray-700" : "" // First comment gets top border
                    } ${
                      index === post.comments.length - 1
                        ? "border-b border-gray-700"
                        : "" // Last comment gets bottom border
                    } ${
                      index !== 0 ? "border-t border-gray-700" : "" // All others get top border
                    } pt-4`}
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://via.placeholder.com/30" // Replace with actual avatar
                        alt="Avatar"
                        className="rounded-full w-8 h-8"
                      />
                      <div>
                        <p className="text-xs text-[#BDBDBD]">Name</p>
                        <p className="text-sm text-white">{comment}</p>
                        <button className="text-xs text-[#BDBDBD] hover:text-white">
                          reply
                        </button>
                      </div>
                    </div>
                    <div>
                      <IoMdHeartEmpty />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostCard;
