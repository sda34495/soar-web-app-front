"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgImage from "../../../../public/bg.png";
import { FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import Tab_Switch from "@/components/Tab_Switch";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
    } else {
      setLoginErrors({});
      console.log("Login data submitted", loginData);
      try {
        localStorage.clear();
        console.log("Attempting login with:", loginData);

        const response = await post("users/login", loginData);
        console.log("Logged in successfully:", response.data);
        if (!response) return;
        console.log(response);

        console.log("Login response:", response.data);

        if (response.status !== 200) {
          throw new Error(response.data.message || "Login failed");
        }

        const { user, token } = response.data.data;
        console.log(response.data);
        console.log("usre , token" + JSON.stringify(user) , token)

        toast.success("Logged in successfully");
        localStorage.setItem("user", "user");
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userdetails", JSON.stringify(user));
        router.push("/dashboard");

        
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
        localStorage.clear();
        // console.log('Attempting login with:', loginData)
        const formdata = new FormData();
        formdata.append("first_name", signupData.firstName);
        formdata.append("last_name", signupData.lastName);
        formdata.append("email", signupData.email);
        formdata.append("password", signupData.password);

        console.log(formdata);
        const response = await post("users/signup", formdata);
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

        <Tab_Switch />

        {/* Login and Signup Forms */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
          {/* Login Form */}
          <div className="flex-1 relative z-20 lg:block hidden">
           <Login/>
          </div>

          {/* Divider */}
          <div className=" hidden lg:flex flex-col items-center h-full relative z-20">
            <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
            <div className="w-0.5 h-96 bg-[#656565] flex-grow"></div>
            <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
          </div>

          {/* Signup Form */}
          <div className="lg:block flex-1 relative z-20 hidden">
           <SignUp/>
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
