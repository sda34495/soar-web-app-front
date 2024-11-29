// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { FaRegCheckSquare } from "react-icons/fa";


// import char from "@/components/SVGs/chart.svg";

// const Sidebar = () => {
//   const [activeItem, setActiveItem] = useState("");

//   const menuItems = [
//     { name: "Check-in", icon: "/sidebar/check.svg", href: "/check-in" },
//     { name: "Dashboard", icon: "/sidebar/chart.svg", href: "/dashboard" },
//     { name: "Leaderboard ", icon: "/sidebar/chartstar.svg", href: "/leaderboard" },
//     { name: "Coaching", icon: "/sidebar/coaching.svg", href: "/coaching" },
//     { name: "Settings", icon: "/sidebar/setting.svg", href: "/setting" },
//     {
//       name: "Professional Referral",
//       icon: "/sidebar/chain.svg",
//       href: "/professional-referral",
//     },
//   ];

//   const percentage = 50;

//   return (
//     <aside className="w-64 h-screen bg-black text-gray-200 flex flex-col justify-between">
//       <div>
//         <div className="text-gold font-bold p-6 text-xl">SOAR</div>
//         <ul className="mt-1">
//           {menuItems.map((item) => (
//             <li
//               key={item.name}
//               onClick={() => setActiveItem(item.name)}
//               className={`flex items-center p-1 cursor-pointer font-semibold ${
//                 activeItem === item.name
//                   ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
//                   : "text-[#BDBDBD]"
//               }`}
//             >
//               <Link href={item.href} className="flex items-center px-2">
              
//               <img src={item.icon} alt="test" className="mr-4" />
//               <p >{item.name}</p>
//               </Link>
//             </li>
//           ))}
//         </ul>
        
//       </div>

//       <div className="p-4">
//         <div className="mb-6 text-start">
//           <Link href={"/support"} className="fonst-semibold text-start p-1 rounded-lg text-gray-300 hover:bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] font-semibold hover:text-black w-full">
//             Support
//           </Link>
//         </div>
//         <div className="bg-gray-800 rounded-lg p-4 ">
//           <div className="text-gold font-bold text-lg">2nd</div>
//           <div className="text-gray-400 mt-2">Your Position</div>
//           <p className="text-gray-400 text-sm mt-1">
//             Complete the check-in and increase your points to get a better
//             position
//           </p>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation"; // Import the navigation hook

// const Sidebar = () => {
//   const [activeItem, setActiveItem] = useState("");
//   const pathname = usePathname(); // Hook to get current pathname

//   const menuItems = [
//     { name: "Check-in", icon: "/sidebar/check.svg", href: "/check-in" },
//     { name: "Dashboard", icon: "/sidebar/chart.svg", href: "/dashboard" },
//     { name: "Leaderboard", icon: "/sidebar/chartstar.svg", href: "/leaderboard" },
//     { name: "Coaching", icon: "/sidebar/coaching.svg", href: "/coaching" },
//     { name: "Settings", icon: "/sidebar/setting.svg", href: "/setting" },
//     {
//       name: "Professional Referral",
//       icon: "/sidebar/chain.svg",
//       href: "/professional-referral",
//     },
//   ];

//   // Use an effect to update the active item based on the current pathname
//   useEffect(() => {
//     // Set the activeItem based on the current route
//     const activeLink = menuItems.find(item => item.href === pathname);
//     if (activeLink) {
//       setActiveItem(activeLink.name);
//     }
//   }, [pathname]);

//   return (
//     <aside className="w-64 h-screen bg-black text-gray-200 flex flex-col justify-between">
//       <div>
//         <div className="text-gold font-bold p-6 text-xl">SOAR</div>
//         <ul className="mt-1">
//           {menuItems.map((item) => (
//             <li
//               key={item.name}
//               className={`flex items-center p-1 cursor-pointer font-semibold ${
//                 activeItem === item.name
//                   ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
//                   : "text-[#BDBDBD]"
//               }`}
//             >
//               <Link href={item.href} className="flex items-center px-2">
//                 <img src={item.icon} alt={item.name} className="mr-4" />
//                 <p>{item.name}</p>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Separate handling for the Support button */}
//       <div className="p-4">
//         <div className="mb-6 text-start">
//           <Link
//             href="/support"
//             className={`font-semibold text-start p-1 rounded-lg text-gray-300 w-full flex items-center ${
//               pathname === "/support"
//                 ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] font-semibold text-black"
//                 : ""
//             }`}
//           >
           
//             Support
//           </Link>
//         </div>
//         <div className="bg-gray-800 rounded-lg p-4">
//           <div className="text-gold font-bold text-lg">2nd</div>
//           <div className="text-gray-400 mt-2">Your Position</div>
//           <p className="text-gray-400 text-sm mt-1">
//             Complete the check-in and increase your points to get a better position
//           </p>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation"; // Import the navigation hook

// const Sidebar = () => {
//   const [activeItem, setActiveItem] = useState("");
//   const pathname = usePathname(); // Hook to get current pathname

//   // Use effect to set activeItem based on pathname using switch
//   useEffect(() => {
//     switch (pathname) {
//       case "/check-in":
//         setActiveItem("Check-in");
//         break;
//       case "/dashboard":
//         setActiveItem("Dashboard");
//         break;
//       case "/leaderboard":
//         setActiveItem("Leaderboard");
//         break;
//       case "/coaching":
//         setActiveItem("Coaching");
//         break;
//       case "/setting":
//         setActiveItem("Settings");
//         break;
//       case "/professional-referral":
//         setActiveItem("Professional Referral");
//         break;
//       case "/support":
//         setActiveItem("Support");
//         break;
//       default:
//         setActiveItem(""); // Default if no match
//         break;
//     }
//   }, [pathname]);

//   return (
//     <aside className="w-64 h-screen bg-black text-gray-200 flex flex-col justify-between">
//       <div>
//         <div className="text-gold font-bold p-6 text-xl">SOAR</div>
//         <ul className="mt-1">
//           {/* Check-in link */}
//           <li
//             className={`flex items-center p-1 cursor-pointer font-semibold ${
//               activeItem === "Check-in"
//                 ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
//                 : "text-[#BDBDBD]"
//             }`}
//           >
//             <Link href="/check-in" className="flex items-center px-2">
//               <img src="/sidebar/check.svg" alt="Check-in" className="mr-4" />
//               <p>Check-in</p>
//             </Link>
//           </li>

//           {/* Dashboard link */}
//           <li
//             className={`flex items-center p-1 cursor-pointer font-semibold ${
//               activeItem === "Dashboard"
//                 ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
//                 : "text-[#BDBDBD]"
//             }`}
//           >
//             <Link href="/dashboard" className="flex items-center px-2">
//               <img src="/sidebar/chart.svg" alt="Dashboard" className="mr-4" />
//               <p>Dashboard</p>
//             </Link>
//           </li>

//           {/* Leaderboard link */}
//           <li
//             className={`flex items-center p-1 cursor-pointer font-semibold ${
//               activeItem === "Leaderboard"
//                 ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
//                 : "text-[#BDBDBD]"
//             }`}
//           >
//             <Link href="/leaderboard" className="flex items-center px-2">
//               <img src="/sidebar/chartstar.svg" alt="Leaderboard" className="mr-4" />
//               <p>Leaderboard</p>
//             </Link>
//           </li>

//           {/* Coaching link */}
//           <li
//             className={`flex items-center p-1 cursor-pointer font-semibold ${
//               activeItem === "Coaching"
//                 ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
//                 : "text-[#BDBDBD]"
//             }`}
//           >
//             <Link href="/coaching" className="flex items-center px-2">
//               <img src="/sidebar/coaching.svg" alt="Coaching" className="mr-4" />
//               <p>Coaching</p>
//             </Link>
//           </li>

//           {/* Settings link */}
//           <li
//             className={`flex items-center p-1 cursor-pointer font-semibold ${
//               activeItem === "Settings"
//                 ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
//                 : "text-[#BDBDBD]"
//             }`}
//           >
//             <Link href="/setting" className="flex items-center px-2">
//               <img src="/sidebar/setting.svg" alt="Settings" className="mr-4" />
//               <p>Settings</p>
//             </Link>
//           </li>

//           {/* Professional Referral link */}
//           <li
//             className={`flex items-center p-1 cursor-pointer font-semibold ${
//               activeItem === "Professional Referral"
//                 ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
//                 : "text-[#BDBDBD]"
//             }`}
//           >
//             <Link href="/professional-referral" className="flex items-center px-2">
//               <img src="/sidebar/chain.svg" alt="Professional Referral" className="mr-4" />
//               <p>Professional Referral</p>
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Support button handled separately */}
//       <div className="p-4">
//         <div className="mb-6 text-start">
//           <Link
//             href="/support"
//             className={`font-semibold text-start p-1 rounded-lg text-gray-300 w-full flex items-center ${
//               pathname === "/support"
//                 ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] font-semibold text-black"
//                 : "hover:bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] hover:text-black"
//             }`}
//           >
          
//             Support
//           </Link>
//         </div>
//         <div className="bg-gray-800 rounded-lg p-4">
//           <div className="text-gold font-bold text-lg">2nd</div>
//           <div className="text-gray-400 mt-2">Your Position</div>
//           <p className="text-gray-400 text-sm mt-1">
//             Complete the check-in and increase your points to get a better position
//           </p>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import the navigation hook
import Link from "next/link";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const pathname = usePathname(); // Hook to get current pathname

  // Use effect to set activeItem based on pathname using switch
  useEffect(() => {
    switch (pathname) {
      case "/check-in":
        setActiveItem("Check-in");
        break;
      case "/dashboard":
        setActiveItem("Dashboard");
        break;
      case "/leaderboard":
        setActiveItem("Leaderboard");
        break;
      case "/coaching":
        setActiveItem("Coaching");
        break;
      case "/setting":
        setActiveItem("Settings");
        break;
      case "/professional-referral":
        setActiveItem("Professional Referral");
        break;
      case "/support":
        setActiveItem("Support");
        break;
      default:
        setActiveItem(""); // Default if no match
        break;
    }
  }, [pathname]);

  return (
    <aside className="w-64 h-screen bg-black text-gray-200 flex flex-col justify-between px-2">
      <div>
        <div className="text-gold font-bold p-6 text-xl">SOAR</div>
        <ul className="mt-1 space-y-12">
          {/* Check-in link */}
          <Link href="/check-in">
            <li
              className={`flex items-center p-1 cursor-pointer font-semibold  ${
                activeItem === "Check-in"
                  ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
                  : "text-[#BDBDBD]"
              }`}
            >
              <img src="/sidebar/check.svg" alt="Check-in" className="mr-4" />
              <p>Check-in</p>
            </li>
          </Link>

          {/* Dashboard link */}
          <Link href="/dashboard">
            <li
              className={`flex items-center p-1 cursor-pointer font-semibold  ${
                activeItem === "Dashboard"
                  ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
                  : "text-[#BDBDBD]"
              }`}
            >
              <img src="/sidebar/chart.svg" alt="Dashboard" className="mr-4" />
              <p>Dashboard</p>
            </li>
          </Link>

          {/* Leaderboard link */}
          <Link href="/leaderboard">
            <li
              className={`flex items-center p-1 cursor-pointer font-semibold ${
                activeItem === "Leaderboard"
                  ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
                  : "text-[#BDBDBD]"
              }`}
            >
              <img src="/sidebar/chartstar.svg" alt="Leaderboard" className="mr-4" />
              <p>Leaderboard</p>
            </li>
          </Link>

          {/* Coaching link */}
          <Link href="/coaching">
            <li
              className={`flex items-center p-1 cursor-pointer font-semibold ${
                activeItem === "Coaching"
                  ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
                  : "text-[#BDBDBD]"
              }`}
            >
              <img src="/sidebar/coaching.svg" alt="Coaching" className="mr-4" />
              <p>Coaching</p>
            </li>
          </Link>

          {/* Settings link */}
          <Link href="/setting">
            <li
              className={`flex items-center p-1 cursor-pointer font-semibold ${
                activeItem === "Settings"
                  ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
                  : "text-[#BDBDBD]"
              }`}
            >
              <img src="/sidebar/setting.svg" alt="Settings" className="mr-4" />
              <p>Settings</p>
            </li>
          </Link>

          {/* Professional Referral link */}
          <Link href="/professional-referral">
            <li
              className={`flex items-center p-1 cursor-pointer font-semibold ${
                activeItem === "Professional Referral"
                  ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] rounded-lg p-1 text-black font-semibold"
                  : "text-[#BDBDBD]"
              }`}
            >
              <img src="/sidebar/chain.svg" alt="Professional Referral" className="mr-4" />
              <p>Professional Referral</p>
            </li>
          </Link>
        </ul>
      </div>

      {/* Support button handled separately */}
      <div className="py-4">
        <div className="mb-6 text-start">
          <Link href="/support">
            <li
              className={`font-semibold text-start p-1 rounded-lg text-gray-300 w-full flex items-center ${
                pathname === "/support"
                  ? "bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] font-semibold text-black"
                  : "hover:bg-[linear-gradient(267.36deg,_#C2A171_0.09%,_#D4B37E_15.51%,_#FCDB9B_49.49%,_#C2A171_95.32%)] hover:text-black"
              }`}
            >
              <img src="/sidebar/support.svg" alt="Support" className="mr-4" />
              Support
            </li>
          </Link>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-gold font-bold text-lg">2nd</div>
          <div className="text-gray-400 mt-2">Your Position</div>
          <p className="text-gray-400 text-sm mt-1">
            Complete the check-in and increase your points to get a better position
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

