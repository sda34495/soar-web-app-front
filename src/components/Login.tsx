"use client";

import React, { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { post } from "@/utils/axios";
import Spinner from "./UI/Spinner";
import endpoints from "@/utils/endpoints";

interface LoginData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
}

function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  // States for error handling
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});

  // Handling Login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate Login form
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

  // Handle Login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
    } else {
      setLoginErrors({});
      
      try {
        setLoading(true);
        localStorage.clear();
        

        const response = await post(endpoints.LOGIN, loginData);
        if (!response) return;
        


        if (response.status !== 200) {
          throw new Error(response.data.message || "Login failed");
        }

        const { user, token } = response.data.data;

        toast.success("Logged in successfully");
        localStorage.setItem("user", "user");
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userdetails", JSON.stringify(user));
        router.push("/check-in");
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Login failed";
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

  return (
    <>
      <h2 className="text-2xl font-semibold font-Bricolage-Grotesque mb-4">
        Login
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
              id="login"
              className="peer py-3 px-4 pl-11 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] font-semibold border "
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
          </div>
          {loginErrors.password && (
            <p className="text-red-500 text-sm">{loginErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4"
        >
          {loading ? <Spinner /> : "Login"}
        </button>
      </form>

      <p className="text-md mt-3 text-[#989898] font-semibold text-center cursor-pointer hover:underline">
        <a href="/auth/forgetPassword">Forget Password</a>
      </p>
      <hr className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
      <div className="flex flex-row items-center justify-center space-x-3">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-[#C2A171] w-8 h-8" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter className="text-[#C2A171] w-8 h-8" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiInstagramFill className="text-[#C2A171] w-8 h-8" />
        </a>
      </div>
    </>
  );
}

export default Login;
