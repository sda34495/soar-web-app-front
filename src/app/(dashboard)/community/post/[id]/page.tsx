import Image from "next/image";
import { IoMdHeart } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareLine } from "react-icons/ri";

const PostWithRightComments = () => {
  return (
    <div className="flex flex-col lg:flex-row border border-zinc-600 bg-[#121212] h-[700px] rounded-3xl">
      {/* Left Section: Post Content */}
      <div className="relative flex-1 flex justify-center items-center bg-zinc-900 rounded-lg m-4 p-4">
        {/* Cross Icon: Closes the Post View */}
        <div className="absolute top-4 left-5 bg-black/30 text-white rounded-full flex justify-center items-center w-8 h-8 cursor-pointer hover:opacity-80">
          ✕
        </div>
        {/* Post Image */}
        <img
          src="https://images.indianexpress.com/2020/06/messi-ronaldo-fb.jpg"
          className="rounded-md w-full h-[650px] object-cover"
        />
      </div>

      {/* Right Section: Comments and Interactions */}
      <div className="w-full lg:w-1/3 bg-zinc-900 m-4 rounded-lg shadow-md">
        <div className="p-4">
          {/* Post Info: User Details and Post Text */}
          <div className="mb-4">
            <div className="flex flex-row items-center gap-3">
              {/* User Avatar */}
              <Image
                src="/avatar.jpeg"
                height={80}
                width={80}
                alt="Profile image"
                className="rounded-full w-10 h-10 object-cover border border-zinc-600"
              />
              {/* User Name and Post Date */}
              <h3 className="font-bold text-white">Raghu</h3>
              <p className="text-gray-400 text-sm">29 Dec</p>
            </div>
            {/* Post Caption */}
            <p className="text-gray-200 mt-2">
              Huge Respect For These Guys 🐂❤️
            </p>
          </div>

          {/* Interactions: Likes, Comments, and Shares */}
          <div className="flex items-center justify-between text-gray-400 mb-4">
            <span>1K Likes</span>
            <span>39 Comments</span>
            <span>62K Shares</span>
          </div>
          {/* Interaction Buttons */}
          <div className="flex justify-between text-gray-400 border-t border-gray-700 pt-2">
            {/* Like Button */}
            <button className="hover:text-white flex flex-row items-center gap-1">
              <IoMdHeart className="text-white-500 text-xl cursor-pointer" />
              Like
            </button>
            {/* Comment Button */}
            <button className="text-gray-400 hover:text-white text-sm flex items-center">
              <IoChatbubbleEllipsesOutline className="mr-2" />
              Comments
            </button>
            {/* Share Button */}
            <button className="text-gray-400 hover:text-white flex items-center">
              <RiShareLine className="mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Comment Input Section */}
        <div className="border-t border-gray-700 p-4">
          {/* Static Comment */}
          <div className="flex items-start gap-3 mb-4">
            <Image
              src="/bean.png"
              height={40}
              width={40}
              alt="Commenter Profile"
              className="rounded-full w-10 h-10 object-cover border border-zinc-600"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white">Ali</h4>
                <span className="text-sm text-gray-500">1h ago</span>
              </div>
              <p className="text-gray-300 mt-1">
                Truly amazing! These legends never fail to inspire. ❤️
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                <button className="hover:text-white">Like</button>
                <button className="hover:text-white">Reply</button>
              </div>

              {/* Nested Reply */}
              <div className="flex items-start gap-3 mt-4 pl-4 border-l border-gray-600">
                <Image
                  src="/boys.png"
                  height={40}
                  width={40}
                  alt="Reply Profile"
                  className="rounded-full w-10 h-10 object-cover border border-zinc-600"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white">Zara</h4>
                    <span className="text-sm text-gray-500">30m ago</span>
                  </div>
                  <p className="text-gray-300 mt-1">
                    Absolutely agree, Ali! Legends indeed. 🙌
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                    <button className="hover:text-white">Like</button>
                    <button className="hover:text-white">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Textarea */}
          <textarea
            placeholder="Comment as Syed Rizwan Hussain Rizvi"
            className="peer p-3 text-sm mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
          />
          {/* Submit Comment Button */}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-custom-gradient text-black font-extrabold rounded-full p-3 px-10"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWithRightComments;
