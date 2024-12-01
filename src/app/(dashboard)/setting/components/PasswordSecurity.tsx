import React from "react";

const PasswordSecurity = () => {
  return (
    <div>
      <form className=" max-w-[660px] mb-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold "> Update Password</h3>
          <div className="">
            <label htmlFor="oldpassword" className="text-[#7c7c7c] ">
              Current Password
            </label>
            <input
              type="password"
              name="oldpassword"
              id="oldpassword"
              className="peer p-5 text-xl mt-1  block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c]  focus:outline-none  border "
            />
          </div>

          <div className="">
            <label htmlFor="newpassword" className="text-[#7c7c7c]">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c]  rounded-lg  placeholder-[#7c7c7c]  focus:outline-none   border  "
            />
          </div>
          <div className="">
            <label htmlFor="confirmpassword" className="text-[#7c7c7c]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              
              id="confirmpassword"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c]  rounded-lg  placeholder-[#7c7c7c]  focus:outline-none   border  "
            />
          </div>
          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSecurity;
{
  /* <form className=" max-w-[660px]">
        <div className="space-y-4">
            <h3 className="text-2xl font-bold "> Account settings</h3>
          <div className="">
            <label htmlFor="username" className="text-[#7c7c7c] ">
              User name
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              className="peer py-3 px-4  mt-1  block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c]  focus:outline-none  border "
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full">
              <label htmlFor="firstname" className="text-[#7c7c7c]">
                First name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                id="firstname"
                className="peer py-3 px-4  mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c]  focus:outline-none  border "
              />{" "}
            </div>
            <div className="w-full">
              <label htmlFor="lastname" className="text-[#7c7c7c]">
                Last name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                id="lastname"
                className="peer py-3 px-4 mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] focus:outline-none  border "
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="email" className="text-[#7c7c7c]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              id="email"
              className="peer py-3 px-4 mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c]  rounded-lg  placeholder-[#7c7c7c]  focus:outline-none   border  "
            />
          </div>
          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Update
          </button>
        </div>
      </form>
      
      */
}
