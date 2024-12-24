"use client";
import { post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";

const RecursiveComment = ({
  comment,
  depth = 0,
  postId,
  replyOpen,
  setReplyOpen,
  replyText,
  setReplyText,
  handleAddReply,
}) => (
  <div
    className={`mt-4 ml-5 ${depth > 0 ? "shadow-md" : ""} ${
      depth > 0
        ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] rounded-xl p-2"
        : ""
    }`}
  >
    <div className="flex items-center justify-between space-x-6 ">
      <div className="flex items-center space-x-2">
        <img
          src={comment?.profile_url || "/avatar.jpeg"} // Replace with actual avatar
          alt="Avatar"
          className="rounded-full w-8 h-8"
        />
        <div>
          <p className="text-xs text-[#BDBDBD]">{comment.user_name || "Name"}</p>
          <p className="text-sm text-white">{comment.comment}</p>
          <button
            className="text-xs text-[#BDBDBD] hover:text-white mt-1"
            onClick={() => setReplyOpen(comment._id)}
          >
            Reply
          </button>
        </div>
      </div>
      <IoMdHeartEmpty />
    </div>

    {/* Reply Form */}
    {replyOpen === comment._id && (
      <form
        onSubmit={(e) => handleAddReply(e, postId, comment)}
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
            Reply
          </button>
        </div>
      </form>
    )}

    {/* Render Replies Inline */}
    {comment.replies?.map((reply, index) => (
      <RecursiveComment
        key={index}
        comment={reply}
        depth={depth + 1}
        postId={postId}
        replyOpen={replyOpen}
        setReplyOpen={setReplyOpen}
        replyText={replyText}
        setReplyText={setReplyText}
        handleAddReply={handleAddReply}
      />
    ))}
  </div>
);


const Comments = ({
  postData,
  activePostId,
  setActivePostId,
  handleCommentToggle,
  activeComments,
}) => {
  const [newComment, setNewComment] = React.useState("");
  const [replyOpen, setReplyOpen] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState("");

  const handleAddComment = async (postId, e, newComment) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const formdata = new FormData();
    formdata.append("post_id", postId);
    formdata.append("comment", newComment);

    try {
      await post(endpoints.CREATE_COMMENT, formdata);
      handleCommentToggle(postId);
    } catch (error) {
      toast.error(error.message);
    }

    setNewComment("");
  };

  const handleAddReply = async (e, postId, comment) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const formdata = new FormData();
    formdata.append("post_id", postId);
    formdata.append("comment", replyText);
    formdata.append("parent_comment_id", comment._id);

    try {
      await post(endpoints.CREATE_COMMENT, formdata);
      toast.success("Reply posted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setReplyOpen(null);
      setReplyText("");
    }
  };

  return (
    <div>
      {activePostId === postData._id && (
        <div className="w-full bg-[#121212] p-6 rounded-r-lg shadow-lg lg:min-w-[360px] max-w-[360px] h-full">
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
                className="bg-transparent border-[#7C7C7C] border rounded-full p-3 w-full"
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
          <div className="mt-3 overflow-y-auto max-h-[350px] p-2">
            {activeComments?.map((comment, index) => (
              <RecursiveComment
                key={index}
                comment={comment}
                postId={postData._id}
                replyOpen={replyOpen}
                setReplyOpen={setReplyOpen}
                replyText={replyText}
                setReplyText={setReplyText}
                handleAddReply={handleAddReply}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
