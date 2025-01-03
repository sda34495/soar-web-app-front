// import React from "react";

// const EditPostModal = ({ postData, post_id, setEditMode, handleEditPost }) => {
//   return (
//     <div>

//     </div>
//   );
// };

// export default EditPostModal;

"use client";
import Image from "next/image";
import React, { useState } from "react";
import PostModal from "./PostModal";
import { CiCirclePlus } from "react-icons/ci";
import { getData, post, postImage } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import toast from "react-hot-toast";
import Spinner from "@/components/UI/Spinner";
import { useDispatch } from "react-redux";
import { postActions } from "@/store/post-data";

const EditPostModal = ({ postData, setEditMode,  editMode ,editOpen}) => {
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [updatedpostData, setUpdatedPostData] = useState({
    id: postData._id,
    title: postData.header,
    description: postData.description,
    allowComments: postData.allow_comments,
    media: postData.media,
  });
  const [imageUrl, setImageUrl] = useState(
    postData.media ? postData.media : ""
  );
  const dispatch = useDispatch();

  // Handle Image Upload
  const handleImageChange = (event: any) => {
    const file = event.target?.files[0];
    if (file) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await getData(endpoints.GET_POSTS);
      const postsData = response.data.data.posts;

      if (response?.data?.success) {
        console.log("Post data before", postsData);
        console.log("Post data after", postsData);
        dispatch(postActions.updateNewData({ data: postsData }));
      }
    } catch (error) {
      toast.error(error.message || "Error fetching posts");
    }
  };
  const handeleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post_id", updatedpostData.id);
    formData.append("header", updatedpostData.title);
    formData.append("description", updatedpostData.description);
    formData.append("allow_comments", updatedpostData.allowComments.toString());
    if (selectedImage) {
      formData.append("media", selectedImage);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      setLoading(true);
      const response = await postImage(endpoints.EDIT_POST, formData);
      console.log(response.data);
      if (response?.data?.success) {
        toast.success("Post Edited successfully.");
        handleCloseModal();
        fetchPosts();
      }
    } catch {
      toast.error("Failed to edit post.");
    } finally {
      setLoading(false);
      handleCloseModal();
      editOpen(false);
    }
  };

  const handleCloseModal = () => {
    setEditMode(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <PostModal
        title="Create post"
        description="Enter your details for setting up your session"
        isOpen={editMode}
      >
        <form onSubmit={handeleSubmit}>
          <div className="flex flex-col space-y-4 mt-2">
            <input
              onChange={(e) =>
                setUpdatedPostData({
                  ...updatedpostData,
                  title: e.target.value,
                })
              }
              value={updatedpostData.title}
              type="text"
              placeholder="Title"
              required
              className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"
            />

            <textarea
              onChange={(e) =>
                setUpdatedPostData({
                  ...updatedpostData,
                  description: e.target.value,
                })
              }
              value={updatedpostData.description}
              placeholder="Description"
              required
              className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"
              rows={2}
            />

            {/* <input type="image" placeholder="Description" className="bg-transparent border-[#7c7c7c] border rounded-md p-3 text-sm w-full placeholder-[#7c7c7c] mt-2"/> */}
            <div className="flex flex-col items-start ">
              {/* Upload Button */}
              <label
                htmlFor="upload"
                className={`" border-2  border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-800" ${
                  imageUrl ? "w-96 h-64" : "w-36 h-16 p-1"
                }`}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="object-contain w-full h-full rounded-md"
                  />
                ) : (
                  <div className="flex  items-center">
                    <span className="text-gray-400 text-2xl mr-2">
                      <CiCirclePlus />
                    </span>
                    <span className="text-gray-400">Upload media</span>
                  </div>
                )}
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Optional Clear Button */}
              {selectedImage && (
                <button
                  onClick={() => setSelectedImage(null)}
                  className="mt-1 text-sm text-red-500 hover:underline"
                >
                  Remove Image
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setUpdatedPostData({
                      ...updatedpostData,
                      allowComments: e.target.checked,
                    })
                  }
                  checked={updatedpostData.allowComments}
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md  border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  id="check4"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <span className="text-gray-400" id="check4">
                Allow comments
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full ">
              <button
                onClick={handleCloseModal}
                className="bg-transparent border-[#7C7C7C] border  rounded-full p-3 w-full"
              >
                {" "}
                Cancel
              </button>
              <button
                type="submit"
                className="bg-custom-gradient text-black font-extrabold rounded-full p-3 w-full"
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <Spinner />
                ) : selectedImage ? (
                  "Publish Post"
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </div>
        </form>
      </PostModal>
    </div>
  );
};

export default EditPostModal;
