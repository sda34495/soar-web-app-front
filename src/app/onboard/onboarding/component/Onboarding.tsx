'use client'
import { post } from "@/utils/axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import endpoints from "@/utils/endpoints";


interface FormData {
  fitness_plan_description: string;
  finance_plan_description: string;
  sobriety_plan_description: string;
}

interface Errors {
  fitness_plan_description?: string;
  finance_plan_description?: string;
  sobriety_plan_description?: string;
}

const Page = () => {
  
  const [formData, setFormData] = useState<FormData>({
    fitness_plan_description: "",
    finance_plan_description: "",
    sobriety_plan_description: ""
  });

  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter(); // Initialize the router for redirection

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): Errors => {
    let formErrors: Errors = {};
    if (!formData.fitness_plan_description) formErrors.fitness_plan_description = "Fitness goal is required.";
    if (!formData.finance_plan_description) formErrors.finance_plan_description = "Finance goal is required.";
    if (!formData.sobriety_plan_description) formErrors.sobriety_plan_description = "Sobriety goal is required.";

    return formErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Perform validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }

    try {
      const response = await post(endpoints.POST_ONBOARDING_PLANS, formData);
      console.log("Form submitted successfully:", response.data);
      toast.success("Submitted");

      // Redirect to the next page (replace '/next-page' with your actual target page)
      router.push("/onboard/package");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="relative w-full h-screen bg-image bg-cover bg-center bg-zinc-900 dark:bg-zinc-900">
        <div className="flex flex-col  mx-6 sm:mx-40 lg:mx-auto">
          <div className="sm:mx-auto  md:mx-20 w-full sm:w-2/3 lg:w-1/2">
            <header className="w-full mt-10 bg-red">
              <div className="w-[120px] text-center">
                <hr className="my-3 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fbedd3] to-[#c3a374]">
                  SOAR
                </h1>
                <hr className="my-3 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
              </div>
            </header>
            <div className="mt-10 items-start">
              <h2 className="text-white text-2xl">How are you planning to use SOAR?</h2>
              <p className="text-zinc-500 mt-2">
                We&apos;ll fit the experience to your needs. Don&apos;t worry, you can change it later.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col mt-8 max-w-lg text-white gap-6">
              {/* Fitness Goal Input */}
              <div className="flex items-center space-x-2 gap-3">
                <div className="flex gap-1">
                  <img src="/fitness.png" alt="Icon 1" className="w-12 h-12" />
                </div>
                <div className="flex w-full space-y-2 flex-col">
                  <label className="text-xl font-semibold">Fitness</label>
                  <input
                    type="text"
                    name="fitness_plan_description"
                    value={formData.fitness_plan_description}
                    onChange={handleInputChange}
                    placeholder="Enter your fitness goal here"
                    className="py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {errors.fitness_plan_description && <p className="text-red-500 text-sm">{errors.fitness_plan_description}</p>}
                </div>
              </div>

              {/* Finance Goal Input */}
              <div className="flex items-center space-x-2 gap-3">
                <div className="flex gap-1">
                  <img src="/dollar.png" alt="Icon 1" className="w-12 h-12" />
                </div>
                <div className="flex w-full space-y-2 flex-col">
                  <label className="text-xl font-semibold">Finance</label>
                  <input
                    type="text"
                    name="finance_plan_description"
                    value={formData.finance_plan_description}
                    onChange={handleInputChange}
                    placeholder="Enter your finance goal here"
                    className="py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {errors.finance_plan_description && <p className="text-red-500 text-sm">{errors.finance_plan_description}</p>}
                </div>
              </div>

              {/* Sobriety Goal Input */}
              <div className="flex items-center space-x-2 gap-3">
                <div className="flex gap-1">
                  <img src="/al.png" alt="Icon 1" className="w-12 h-12" />
                </div>
                <div className="flex w-full space-y-2 flex-col">
                  <label className="text-xl font-semibold">Alcohol / No-substance</label>
                  <input
                    type="text"
                    name="sobriety_plan_description"
                    value={formData.sobriety_plan_description}
                    onChange={handleInputChange}
                    placeholder="Enter your alcohol/No-substance goal here"
                    className="py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {errors.sobriety_plan_description && <p className="text-red-500 text-sm">{errors.sobriety_plan_description}</p>}
                </div>
              </div>

              <button className="py-4 mt-8 w-40 font-semibold text-black bg-custom-gradient hover:bg-custom-gradient-hover rounded-full">
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
