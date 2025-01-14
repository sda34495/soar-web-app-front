"use client";
import Spinner from "@/components/UI/Spinner";
import { postActions } from "@/store/post-data";
import { getData, post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({
  postData,
  setPostData,
  activePostId,
  setActivePostId,
  handleCommentToggle,
  activeComments,
  setActiveComments,
  singlePost = false,
}) => {

  // console.log("all",postData)
  const posts = useSelector((state: any) => state.postSlice.posts);
  const [newComment, setNewComment] = React.useState("");
  const [replyOpne, setReplyOpen] = React.useState();
  const [replyText, setReplyText] = React.useState("");
  const [visibleReplies, setVisibleReplies] = React.useState({});
  const [loading , setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const updateCommentValue = (postId: string, newCommentCount: number) => {
    // console.log(newCommentCount)
    dispatch(
      postActions.updateNewData({
        data: posts.map((post: any) =>
          post._id === postId
            ? { ...post, total_comments: newCommentCount }
            : post
        ),
      })
    );
  };

  const handleAddComment = async (postId: any, e: any, newComment) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const formdata = new FormData();
    formdata.append("post_id", postId);
    formdata.append("comment", newComment);

    try {
      setLoading(true);
      await post(endpoints.CREATE_COMMENT, formdata);
      handleUpdateComment(postId);
      if(!singlePost){
        
        const newCommentCount = 
        posts.find((post: any) => post._id === postId).total_comments + 1;
        updateCommentValue(postId, newCommentCount);
      }else{
        const newCommentCount = postData.total_comments + 1;
        setPostData({ ...postData, total_comments: newCommentCount });

      }

      // Update the total_comments value
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    } 

    setNewComment("");
  };

  const handleUpdateComment = async (postId: any) => {
    try {
      const response = await getData(
        `${endpoints.GET_POST_COMMENTS}?post_id=${postId}`
      );
      if (response.data?.success) {
        setActiveComments(response.data.data);
        // setActiveReply(response?.data?.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
      await post(endpoints.CREATE_COMMENT, formdata);
      handleUpdateComment(postId);
      // handleCommentToggle(comment._id);
      // console.log("Reply posted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setReplyOpen(null);
      setReplyText("");
    }
  };

  const handleLikeToggle = async (
    id,
    type,
    currentLikeStatus,
    is_reply = false,
    reply_id = null
  ) => {
    const updatedLikeStatus = !currentLikeStatus;

    // Optimistically update the like status immediately
    if (!is_reply) {
      const updatedComments = activeComments.map((comment) => {
        if (comment._id === id) {
          // console.log("test");
          return {
            ...comment,
            self_liked: updatedLikeStatus,
            likes: updatedLikeStatus ? comment.likes + 1 : comment.likes - 1,
          };
        }
        return comment;
      });
      setActiveComments(updatedComments);
    } else {
      // console.log("active comm", activeComments);
      // console.log("test2");
      const updatedComments = activeComments.map((comment) => {
        if (comment._id === id) {
          // console.log("test3");
          comment.replies.map((reply) => {
            if (reply._id === reply_id) {
              // console.log(reply_id);
              return {
                ...reply,
                self_liked: updatedLikeStatus,
                likes: updatedLikeStatus ? reply.likes + 1 : reply.likes - 1,
              };
            } else {

              return reply;
            }
          });
          // if(reply_id === comment.replies._id){
          //               console.log("right Place")
          // }
          // console.log(comment);

          // comment.replies.map((reply) => {
          //   if (reply._id === id) {
          //     return {
          //       ...reply,
          //       self_liked: updatedLikeStatus,
          //       likes: updatedLikeStatus ? reply.likes + 1 : reply.likes - 1,
          //     };
          //   } else {
          //     return reply;
          //   }
          // });
        }
        return comment;
      });
      setActiveComments(updatedComments);
    }

    try {
      const formdata = new FormData();
      if (is_reply) {
        formdata.append(`${type}_id`, reply_id);
      } else {
        formdata.append(`${type}_id`, id);
      }

      await post(endpoints.POST_LIKE, formdata);
    } catch (error) {
      toast.error(error.message);
      // Rollback if there's an error
      const rollbackComments = activeComments.map((comment) => {
        if (comment._id === id) {
          return {
            ...comment,
            self_liked: !updatedLikeStatus,
            likes: updatedLikeStatus ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      });
      setActiveComments(rollbackComments);
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
        <div className="w-full bg-[#121212] p-6 rounded-r-lg shadow-lg lg:min-w-[360px] max-w-[360px] h-full">
          <div className="flex items-center justify-between">
            <p className="text-white">Comments</p>
            {/* <BsThreeDotsVertical /> */}
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
              <button className="bg-custom-gradient text-black font-extrabold rounded-full p-3 w-full" disabled={loading}>
                {loading ? (
                  <Spinner />
                ) : (
                  "Comment"
                )}
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
                        src={comment.user.profile_url || "/avatar.jpeg"} // Replace with actual avatar
                        alt="Avatar"
                        className="rounded-full w-12 h-12 mb-5"
                      />
                      <div>
                        <p className="text-xs text-[#BDBDBD]">
                          {comment?.user.username || "unknown"}
                        </p>
                        <p className="text-sm text-white">{comment.comment}</p>
                        <button
                          className="text-xs text-[#BDBDBD] hover:text-white"
                          onClick={() => setReplyOpen(comment._id)}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {comment.self_liked ? (
                        <IoMdHeart
                          className="text-white cursor-pointer"
                          onClick={() =>
                            handleLikeToggle(
                              comment._id,
                              "comment",
                              comment.self_liked
                            )
                          }
                        />
                      ) : (
                        <IoMdHeartEmpty
                          className="text-[#E0E0E0] cursor-pointer"
                          onClick={() =>
                            handleLikeToggle(
                              comment._id,
                              "comment",
                              comment.self_liked
                            )
                          }
                        />
                      )}
                      <span
                        className={`text-sm ${
                          comment.self_liked ? "text-white" : "text-[#E0E0E0]"
                        }`}
                      >
                        {comment.likes}
                      </span>
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
                        Reply
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
                      {visibleReplies[comment._id]
                        ? "-Hide Replies"
                        : "View Replies"}
                    </button>
                  </div>
                )}

                {visibleReplies[comment._id] && comment.replies?.length > 0 && (
                  <div className="ml-10 mt-2">
                    {comment.replies?.map((reply: any, replyIndex: any) => (
                      <div
                        key={replyIndex}
                        className="flex items-start mt-2 space-x-2"
                      >
                        <img
                          src={reply?.user?.profile_url || "/avatar.jpeg"} // Replace with actual avatar
                          alt="Reply Avatar"
                          className="rounded-full w-6 h-6"
                        />
                        <div className="flex-1">
                          <p className="text-xs text-[#BDBDBD]">
                            {reply?.user.username || "unknown"}
                          </p>
                          <p className="text-xs text-[#E0E0E0]">
                            {reply.comment}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {reply.self_liked ? (
                            <IoMdHeart
                              className="text-white cursor-pointer"
                              onClick={() =>
                                handleLikeToggle(
                                  comment._id,
                                  "comment",
                                  reply.self_liked,
                                  true,
                                  reply._id
                                )
                              }
                            />
                          ) : (
                            <IoMdHeartEmpty
                              className="text-[#E0E0E0] cursor-pointer"
                              onClick={() =>
                                handleLikeToggle(
                                  comment._id,
                                  "comment",
                                  reply.self_liked,
                                  true,
                                  reply._id
                                )
                              }
                            />
                          )}
                          <span className="text-sm text-[#E0E0E0]">
                            {reply.likes}
                          </span>
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
