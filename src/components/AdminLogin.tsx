"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgImage from "../../public/bg.png"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import endpoints from "@/utils/endpoints";
import { post } from "@/utils/axios";
import Spinner from "./UI/Spinner";
interface LoginData {
  email: string;
  password: string;
}
interface FormErrors {
  email?: string;
  password?: string;
  
}
function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
   const [loginData, setLoginData] = useState<LoginData>({
      email: "",
      password: "",
   });
   const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
  };
  const validateLogin = (): FormErrors => {
    let errors: FormErrors = {};
    if (!loginData.email) {
      errors.email = "Email is required";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
    } else {
      setLoginErrors({});
      console.log("Login data submitted", loginData);
      try {
        setLoading(true);
        localStorage.clear();
        console.log("Attempting login with:", loginData);

        const response = await post(endpoints.ADMIN_LOGIN, loginData);
        console.log("Logged in successfully:", response.data);
        if (!response) return;
        console.log(response);

        console.log("Login response:", response.data);

        if (response.status !== 200) {
          throw new Error(response.data.message || "Login failed");
        }

        const { user, token } = response.data.data;
        console.log(response.data);
        console.log("usre , token" + JSON.stringify(user), token);

        toast.success("Logged in successfully");
        localStorage.setItem("user", "admin");
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userdetails", JSON.stringify(user));
        router.push("/admin/users");
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Login failed";
        console.log("Login error:", error);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    setLoginData({
      email: "",
      password: "",
    });
  };
   const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  return (
    <div className=" bg-[#C2A171] min-h-screen text-white flex items-center justify-center px-4">
      {/* Container */}
      <div className="  relative opacity-95 overflow-hidden mt-8 mb-10 bg-gradient-to-l from-[#333333] to-[#121212] rounded-3xl max-w-3xl w-full p-8 sm:p-10 lg:p-12">
        {/* Background image */}
        <Image
          src={bgImage}
          alt="bgimage"
          className="w-full h-full opacity-95 absolute inset-0 -z-10" // Add -z-10 to send the image behind
        />

        {/* Header */}
        <div className="text-center mb-2 relative z-20">
          {" "}
          {/* Added relative z-20 */}
          <h1 className="text-4xl z-50 md:text-5xl lg:text-8xl font-bold text-transparent bg-clip-text bg-custom-heading-gradient">
            SOAR
          </h1>
          <p className="text-[#F8F8F8] text-lg sm:text-xl md:text-2xl ">
            Strive. Overcome. Achieve. Repeat
          </p>
          <div className="py-3 mt-4 flex items-center text-lg before:flex-1 before:border-t before:border-[#656565] before:me-6 after:flex-1 after:border-t after:border-[#656565] after:ms-6 dark:text-[#989898] text-[#989898]">
            Let get started
          </div>
        </div>

        {/* Login and Signup Forms */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
          {" "}
          {/* Add relative z-20 */}
          {/* Login Form */}
          <div className="flex-1 relative justify-center w-full max-w-xs mx-auto z-20">
            <h2 className="text-3xl mb-8 mt-4 text-center font-semibold font-Bricolage-Grotesque ">
              Admin Login
            </h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="peer py-3 px-4 pl-11 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] font-semibold focus:outline-none  border "
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                    <svg
                      className="shrink-0 w-6 h-6 text-[#7c7c7c]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                {loginErrors.email && (
            <p className="text-red-500 text-sm">{loginErrors.email}</p>
          )}
              </div>

              <div className="mb-4">
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="peer py-3 px-4 pl-11 block w-full bg-transparent opacity-70 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold focus:outline-none  border"
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                    <svg
                      className="shrink-0 w-6 h-6 text-[#7c7c7c]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                      <circle cx="16.5" cy="7.5" r=".5"></circle>
                    </svg>
                  </div>
                  {loginErrors.password && (
            <p className="text-red-500 text-sm">{loginErrors.password}</p>
          )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-8"
                >
                   {loading ? <Spinner /> : "Login"}
                </button>
               
              </div>
            </form>
          </div>
          {/* Signup Form */}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
