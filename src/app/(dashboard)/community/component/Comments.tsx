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

    // setPosts(updatedPosts);
    setNewComment("");
    // setActivePostId(null);
  };

  const handleAddReply = async (e: any, postId: any, comment: any) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const formdata = new FormData();
    formdata.append("post_id", postId);
    formdata.append("comment", replyText);
    formdata.append("parent_comment_id", comment._id);
    for (const [key, value] of formdata.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await post(endpoints.CREATE_COMMENT, formdata);
      console.log("comment posted Successfully ");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setReplyOpen(null);
      setReplyText("");
    }

    // setPosts(updatedPosts);
    // setActivePostId(null);
  };

  useEffect(() => {
    console.log(newComment);
    console.log(activeComments);
  }, [newComment]);

  return (
    <div>
      {activePostId === postData._id && (
        <div className="w-full bg-[#121212] p-6 rounded-r-lg shadow-lg lg:min-w-[360px]  max-w-[360px] h-full">
          <div className="flex items-center justify-between">
            <p className="text-white ">Comments</p>
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
                  className={`flex  items-center justify-between space-x-6 my-3 ${
                    index === 0 ? "border-t border-gray-700" : "" // First comment gets top border
                  } ${
                    index === activeComments.length - 1
                      ? "border-b border-gray-700"
                      : "" // Last comment gets bottom border
                  } ${
                    index !== 0 ? "border-t border-gray-700" : "" // All others get top border
                  } pt-4`}
                >
                  
                  <div className="flex flex-row items-center justify-between w-full  ">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://via.placeholder.com/30" // Replace with actual avatar
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

                {replyOpne === comment._id && (
                  <form
                    onSubmit={(e) => handleAddReply(e, postData._id, comment)}
                  >
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Add your comment"
                      rows={1}
                      className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"
                    />
                    <div className="flex items-center justify-end space-x-4 mt-2">
                      <button
                        onClick={() => setReplyOpen(null)}
                        className="bg-transparent border-[#7C7C7C] border  rounded-full p-3 w-full"
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
