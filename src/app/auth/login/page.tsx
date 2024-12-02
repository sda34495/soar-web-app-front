"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgImage from "../../../../public/bg.png";
import { FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

// Define types for form data
interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define types for error messages
interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
}

function LoginPage() {
  // States for Login and Signup forms
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // States for error handling
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [signupErrors, setSignupErrors] = useState<FormErrors>({});

  // Handling Login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Handling Signup form input changes
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
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

  // Validate Signup form
  const validateSignup = (): FormErrors => {
    let errors: FormErrors = {};
    if (!signupData.firstName) {
      errors.firstName = "First name is required";
    }
    if (!signupData.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!signupData.email) {
      errors.email = "Email is required";
    }
    if (!signupData.password) {
      errors.password = "Password is required";
    }
    if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  // Handle Login form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
    } else {
      console.log("Login data submitted", loginData);
    }
    setLoginData({
      email: "",
      password: "",
    });
  };

  // Handle Signup form submission
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateSignup();
    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
    } else {
      // Handle successful signup (e.g., API call)
      console.log("Signup data submitted", signupData);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="bg-[#C2A171] min-h-screen text-white flex items-center justify-center px-4">
      {/* Container */}
      <div className="py-12 relative opacity-95 overflow-hidden mt-8 mb-8 bg-gradient-to-l  from-[#333333] to-[#121212] rounded-3xl max-w-4xl w-full px-8 sm:px-10 lg:px-12">
        {/* Background image */}
        <Image
          src={bgImage}
          alt="bgimage"
          className="w-full h-full opacity-95 absolute inset-0 -z-10"
        />

        {/* Header */}
        <div className="text-center   mb-2 relative z-20">
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
          {/* Login Form */}
          <div className="flex-1 relative z-20">
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
                    className="peer py-3 px-4 pl-11 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] font-semibold border "
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

              <Link href="/onboard/onboarding" type="submit">
                <button className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4">
                  Login
                </button>
              </Link>

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
                  <FaTwitter className="text-[#C2A171] w-8 h-8" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiInstagramFill className="text-[#C2A171] w-8 h-8" />
                </a>
              </div>
            </form>
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center h-full relative z-20">
            <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
            <div className="w-0.5 h-96 bg-[#656565] flex-grow"></div>
            <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
          </div>

          {/* Signup Form */}
          <div className="flex-1 relative z-20">
            <h2 className="text-2xl font-semibold font-Bricolage-Grotesque mb-4">
              Signup
            </h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  className="w-1/2 bg-transparent opacity-70 border rounded-lg p-3  border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {signupErrors.firstName && (
                  <p className="text-red-500 text-sm">
                    {signupErrors.firstName}
                  </p>
                )}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  className="w-1/2 border rounded-lg p-3  bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {signupErrors.lastName && (
                  <p className="text-red-500 text-sm">
                    {signupErrors.lastName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full border rounded-lg p-3  bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {signupErrors.email && (
                  <p className="text-red-500 text-sm">{signupErrors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="w-full border rounded-lg p-3  bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                  />

                  <div
                    className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-[#7c7c7c]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-[#7c7c7c]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {signupErrors.password && (
                  <p className="text-red-500 text-sm">
                    {signupErrors.password}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className="w-full border rounded-lg p-3  bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                  />

                  <div
                    className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-[#7c7c7c]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-[#7c7c7c]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {signupErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {signupErrors.confirmPassword}
                  </p>
                )}
              </div>
              <Link href="/onboard/onboarding" type="submit">
                <button className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4">
                  Signup
                </button>
              </Link>
              <p className="text-md font-semibold mt-4 text-[#989898] text-center">
                Already have an account?{" "}
                <span className="text-[#C2A171] cursor-pointer hover:underline">
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-4 text-sm sm:text-lg text-center text-[#989898]">
          Daily Check-in App for your health
        </footer>
      </div>
    </div>
  );
}

export default LoginPage;
