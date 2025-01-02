import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

function SmallSideBar() {


    const [activeItem, setActiveItem] = useState("");
    const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility
    const pathname = usePathname(); // Hook to get current pathname
    const dispatch = useDispatch();
    const router = useRouter();
  
    function updateloader(arg0: string): void {
      setActiveItem(arg0); // Example action
    }
  return (
    <>
    {isOpen && (
    <aside className=" text-gray-200 bg-black h-screen flex flex-col justify-between">

          <div>
            <div className="flex flex-col mt-5 items-center justify-center mb-16">
              <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
              <div className="text-gold font-semibold text-4xl text-transparent bg-clip-text bg-custom-heading-gradient mt-1 mb-1">
                SOAR
              </div>
              <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
            </div>       
            <ul className=" flex flex-col space-y-2 ">
              {/* Check-in link */}
              <button onClick={() => {
                updateloader("Check-in")
                setIsOpen(false);
              } 
                
                }>
                <Link href="/check-in">
                  <li
                    className={`flex items-center px-1 py-2  cursor-pointer font-semibold  ${
                      activeItem === "Check-in"
                        ? "bg-custom-gradient rounded-xl p-1  text-black font-semibold"
                        : "text-[#BDBDBD] "
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Check-in"
                          ? "/sidebar/dark-check-in.svg"
                          : "/sidebar/check-in.svg"
                      }
                      alt="Check-in"
                      className="mr-4"
                    />
                    <p className="">Check-in</p>
                  </li>
                </Link>
              </button>

              {/* Dashboard link */}
              <button onClick={() => {updateloader("Dashboard");
                setIsOpen(false)
              }}>
                <Link href="/dashboard">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold  ${
                      activeItem === "Dashboard"
                        ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Dashboard"
                          ? "/sidebar/dark-dashboard.svg"
                          : "/sidebar/chart.svg"
                      }
                      alt="Dashboard"
                      className="mr-4"
                    />
                    <p>Dashboard</p>
                  </li>
                </Link>
              </button>

              {/* Leaderboard link */}
              <button onClick={() => {updateloader("Leaderboard");
              setIsOpen(false);

              }}>
                <Link href="/leaderboard">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Leaderboard"
                        ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Leaderboard"
                          ? "/sidebar/dark-podium.svg"
                          : "/sidebar/chartstar.svg"
                      }
                      alt="Leaderboard"
                      className="mr-4"
                    />
                    <p>Leaderboard</p>
                  </li>
                </Link>
              </button>

              {/* Coaching link */}
              <button onClick={() => {updateloader("Coaching");
              setIsOpen(false)
              }}>
                <Link href="/coaching">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Coaching"
                        ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Coaching"
                          ? "/sidebar/dark-coaching.svg"
                          : "/sidebar/coaching.svg"
                      }
                      alt="Coaching"
                      className="mr-4"
                    />
                    <p>Coaching</p>
                  </li>
                </Link>
              </button>

              <button onClick={() => {updateloader("Talk to Doctor");
                setIsOpen(false);
              }}>
                <Link href="/talktodoctor">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Talk to Doctor"
                        ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Talk to Doctor"
                          ? "/sidebar/health-dark.svg"
                          : "/sidebar/health.svg"
                      }
                      alt="Talk to doc"
                      className="mr-4"
                    />
                    <p>Talk to Doctor</p>
                  </li>
                </Link>
              </button>

              <button onClick={() => {updateloader("Settings");
                setIsOpen(false);
              }}>
                {/* Settings link */}
                <Link href="/setting">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Settings"
                        ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Settings"
                          ? "/sidebar/dark-setting.svg"
                          : "/sidebar/setting.svg"
                      }
                      alt="Settings"
                      className="mr-4"
                    />
                    <p>Settings</p>
                  </li>
                </Link>
              </button>

              {/* Professional Referral link */}
              <button onClick={() => {updateloader("Professional Referral");
                setIsOpen(false);
              }}>
                <Link href="/professional-referral">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Professional Referral"
                        ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Professional Referral"
                          ? "/sidebar/dark-ref.svg"
                          : "/sidebar/chain.svg"
                      }
                      alt="Professional Referral"
                      className="mr-4 "
                    />
                    <p className="text-start">Professional Referral</p>
                  </li>
                </Link>
              </button>

              <button onClick={() => {updateloader("community");
                setIsOpen(false);
              }}>
                <Link href="/community">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "community"
                        ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <HiOutlineUserGroup
                      className={`mr-4  w-5 h-5  ${
                        activeItem === "community"
                          ? "text-black"
                          : "text-[#BDBDBD]"
                      }`}
                    />
                    <p>Community</p>
                  </li>
                </Link>
              </button>
            </ul>
          </div>

          
          <div className="py-4">
            <div className="mb-6 flex items-center text-start">
              <button
                onClick={() => {updateloader("Support");
                  setIsOpen(false);
                }}
                className="w-full" // Make the button span the full width
              >
                <Link href="/support">
                  <li
                    className={`font-semibold text-start px-1 py-2 rounded-xl flex items-center ${
                      pathname === "/support"
                        ? "bg-custom-gradient font-semibold text-black w-full" // Full width when selected
                        : "w-full" // Ensures full width for non-selected too
                    }`}
                  >
                    <img
                      src={
                        pathname === "/support"
                          ? "/sidebar/dark-support.svg"
                          : "/sidebar/support.svg"
                      }
                      alt="Support"
                      className="mr-4"
                    />
                    Support
                  </li>
                </Link>
              </button>
            </div>
          </div>
        </aside>
         )}
    </>
  )
}

export default SmallSideBar