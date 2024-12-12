"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { post } from "@/utils/axios";
import Spinner from "./UI/Spinner";
import endpoints from "@/utils/endpoints";

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

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [signupData, setSignupData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // States for error handling
  const [signupErrors, setSignupErrors] = useState<FormErrors>({});

  // Handling Signup form input changes
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
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

  const [activeTab, setActiveTab] = useState('Login')


 // Handle Signup form submission
 const handleSignupSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const errors = validateSignup();
  if (Object.keys(errors).length > 0) {
    setSignupErrors(errors);
    return;
  } else {
    setSignupErrors({});
    try {
      setLoading(true)
      localStorage.clear();
      // console.log('Attempting login with:', loginData)
      const formdata = new FormData();
      formdata.append("first_name", signupData.firstName);
      formdata.append("last_name", signupData.lastName);
      formdata.append("email", signupData.email);
      formdata.append("password", signupData.password);

      console.log(formdata);
      const response = await post(endpoints.REGISTER, formdata);
      console.log("Singup in successfully:", response.data);
      if (!response) return;
      console.log(response);

      console.log("Signup response:", response.data);

      if (response.status !== 200) {
        throw new Error(response.data.message || "Signup failed");
      }

      const { user, token } = response.data.data;

      toast.success("Signup in successfully");
      localStorage.setItem("user", "user");
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userdetails", JSON.stringify(user));
      router.push('/onboard/welcome');

     
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      console.log("Signup error:", error);

      if (error.response) {
        
        setError(
          error.response.data.message || "signup failed. Please try again."
        );
      } else if (error.request) {
        // console.log("No response received:", error.request);
        setError("No response from server. Please check your connection.");
      } else {
        // console.log("Error:", error.message);
        setError("An error occurred while logging in.");
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      // setSignupData({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // })
    }

  }
};

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div>
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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

              <button
                type="submit"
                className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4"
              >
                {loading ? <Spinner/> :  "Signup"}
              </button>
            </form>

            <p className="text-md font-semibold mt-4 text-[#989898] text-center">
              Already have an account?{" "}
              <button>
                <Link
                  href={"/auth/login#login"}
                  className="text-[#C2A171] cursor-pointer hover:underline"
                >
                  Login
                </Link>
              </button>
            </p>
          </div>
  );
}

export default SignUp;
