"use client";
import React, { useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditPostModal from "./EditPostModal";

const EditPost = ({ post_id, postData }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const dropdownRef = useRef(null);

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

  const handleEditPost = async (postId: any) => {};

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
        <button
          className="border-b border-[#454545] py-2 hover:bg-gray-400 rounded-t-lg"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <button className="py-2 hover:bg-gray-400 rounded-b-lg">Delete</button>
      </div>

      {editMode && (
        <EditPostModal
          postData={postData}
          editMode={editMode}
          setEditMode={setEditMode}
          editOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default EditPost;
