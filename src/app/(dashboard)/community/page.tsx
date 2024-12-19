// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import PostModal from "./component/PostModal";
// import { CiCirclePlus } from "react-icons/ci";
// import UploadPostHandel from "./component/UploadPostHandel";
// import PostCard from "./component/PostCard";
// import useSidebarLoading from "@/Hook/SidebarLoading";
// import { getData } from "@/utils/axios";
// import endpoints from "@/utils/endpoints";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { postActions } from "@/store/post-data";

// const Communitypage = () => {
//   const [posts, setPosts] = useState([]);
//   const dispatch = useDispatch();

//   const fetchPosts = async () => {
//     try {
//       const response = await getData(endpoints.GET_POSTS);
//       const postsData = response.data.data;

//       if (response?.data?.success) {
//         setPosts(postsData);
//         dispatch(postActions.updatePost({"data": postsData }));
//       }
//     } catch (error) {
//       toast.error(error.message || "Error fetching posts");
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const updatedPoast = useSelector((state: any) => state.postSlice);
//   useEffect(() => {
//     console.log("Updated posts state:", posts);
//     console.log(updatedPoast);
//   }, [posts]);

//   useSidebarLoading();
//   return (
//     <div className="">
//       {posts?.length > 0 ? (
//         <PostCard posts={posts} fetchPosts={fetchPosts} />
//       ) : (
//         <div className="">
//           <UploadPostHandel fetchPosts={fetchPosts} />
//           <div className="flex flex-col items-center justify-center text-center w-[500px] h-[350px] ">
//             <div className="flex flex-col max-w-[250px] items-center justify-center p-3 space-y-2">
//               <Image
//                 src="/community.svg"
//                 alt="plus icon w-5 h-5"
//                 width={50}
//                 height={50}
//               />
//               <h3>No Post available</h3>
//               <p className="text-xs text-[#BDBDBD]">
//                 Posts will be shown when some people will upload
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Communitypage;

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "@/store/post-data";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import toast from "react-hot-toast";
import PostCard from "./component/PostCard";
import UploadPostHandel from "./component/UploadPostHandel";
import useSidebarLoading from "@/Hook/SidebarLoading";

const Communitypage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.postSlice.posts); // Access posts from Redux store

  // console.log("Data Fixed", postsData)

  // const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const response = await getData(endpoints.GET_POSTS);
      const postsData = response.data.data;

      if (response?.data?.success) {
        console.log("Post data before", postsData);
        console.log("Post data after", postsData);
        dispatch(postActions.updateNewData({ data: postsData }));

        // setPosts(postsData)
      }
    } catch (error) {
      toast.error(error.message || "Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on mount
  }, []);

  useSidebarLoading();

  return (
    <div className="">
      {posts?.length > 0 ? (
        <PostCard />
      ) : (
        <div className="">
          <UploadPostHandel  nav={false}/>
          <div className="flex flex-col items-center justify-center text-center w-[500px] h-[350px] ">
            <div className="flex flex-col max-w-[250px] items-center justify-center p-3 space-y-2">
              <h3>No Post available</h3>
              <p className="text-xs text-[#BDBDBD]">
                Posts will be shown when some people will upload
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communitypage;
