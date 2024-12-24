"use client";
import { post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";

const Comments = ({
  postData,
  activePostId,
  setActivePostId,
  handleCommentToggle,
  activeComments,
  
}) => {
  const [newComment, setNewComment] = React.useState("");
  const [replyOpne, setReplyOpen] = React.useState();
  const [replyText, setReplyText] = React.useState("");
  const [visibleReplies, setVisibleReplies] = React.useState({});

  const handleAddComment = async (postId: any, e: any, newComment) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const formdata = new FormData();
    formdata.append("post_id", postId);
    formdata.append("comment", newComment);

    try {
      const response = await post(endpoints.CREATE_COMMENT, formdata);
      handleCommentToggle(postId);
    } catch (error) {
      toast.error(error.message);
    }

    setNewComment("");
  };

  const handleAddReply = async (e: any, postId: any, comment: any) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const formdata = new FormData();
    formdata.append("post_id", postId);
    formdata.append("comment", replyText);
    formdata.append("parent_comment_id", comment._id);
    // for (const [key, value] of formdata.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      const response = await post(endpoints.CREATE_COMMENT, formdata);
      console.log("comment posted Successfully ");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setReplyOpen(null);
      setReplyText("");
    }
  };

  // useEffect(() => {
  //   console.log(newComment);
  //   console.log(activeComments);
  // }, [newComment, activeComments]);

  const toggleReplies = (commentId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div>
      {activePostId === postData._id && (
        <div className="w-full bg-[#121212] p-6 rounded-r-lg shadow-lg lg:min-w-[360px]  max-w-[360px] h-full">
          <div className="flex items-center justify-between">
            <p className="text-white">Comments</p>
            <BsThreeDotsVertical />
          </div>
          <form onSubmit={(e) => handleAddComment(postData._id, e, newComment)}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment"
              rows={2}
              className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"
            />
            <div className="flex items-center justify-end space-x-4 mt-2">
              <button
                onClick={() => setActivePostId(null)}
                className="bg-transparent border-[#7C7C7C] border  rounded-full p-3 w-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-custom-gradient text-black font-extrabold rounded-full p-3 w-full"
              >
                Comment
              </button>
            </div>
          </form>
          <div className="mt-6 overflow-y-auto max-h-[350px] p-2">
            {activeComments?.map((comment: any, index: any) => (
              <div key={index} className="flex flex-col">
                <div
                  className={`flex items-center justify-between space-x-6 my-3 ${
                    index === 0 ? "border-t border-gray-700" : ""
                  } ${
                    index === activeComments.length - 1
                      ? "border-b border-gray-700"
                      : ""
                  } ${index !== 0 ? "border-t border-gray-700" : ""} pt-4`}
                >
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/avatar.jpeg" // Replace with actual avatar
                        alt="Avatar"
                        className="rounded-full w-8 h-8"
                      />
                      <div>
                        <p className="text-xs text-[#BDBDBD]">Name</p>
                        <p className="text-sm text-white">{comment.comment}</p>

                        <button
                          className="text-xs text-[#BDBDBD] hover:text-white"
                          onClick={() => setReplyOpen(comment._id)}
                        >
                          reply
                        </button>
                      </div>
                    </div>
                    <div>
                      <IoMdHeartEmpty />
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                {replyOpne === comment._id && (
                  <form
                    onSubmit={(e) => handleAddReply(e, postData._id, comment)}
                    className="ml-10"
                  >
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Add your reply"
                      rows={1}
                      className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"
                    />
                    <div className="flex items-center justify-end space-x-4 mt-2">
                      <button
                        onClick={() => setReplyOpen(null)}
                        className="bg-transparent border-[#7C7C7C] border rounded-full p-3 w-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-custom-gradient text-black font-extrabold rounded-full p-3 w-full"
                      >
                        reply
                      </button>
                    </div>
                  </form>
                )}

                {/* Replies Section */}
                {comment.replies?.length > 0 && (
                  <div className="ml-10">
                    <button
                      className="text-xs text-[#BDBDBD] hover:text-white"
                      onClick={() => toggleReplies(comment._id)}
                    >
                      {visibleReplies[comment._id] ? "Hide Replies" : "View Replies"}
                    </button>
                  </div>
                )}

                {/* Replies Section */}
                {visibleReplies[comment._id] && comment.replies?.length > 0 && (
                  <div className="ml-10 mt-2">
                    <p className="text-xs text-[#BDBDBD] font-semibold">Replies</p>
                    {comment.replies?.map((reply: any, replyIndex: any) => (
                      <div key={replyIndex} className="flex items-start mt-2 space-x-2">
                        <img
                          src={reply?.profile_url || "/avatar.jpeg"} // Replace with actual avatar
                          alt="Reply Avatar"
                          className="rounded-full w-6 h-6"
                        />
                        <div>
                          <p className="text-xs text-[#BDBDBD]">
                            {reply.user_name || "unknown"}
                          </p>
                          <p className="text-xs text-[#E0E0E0]">{reply.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
