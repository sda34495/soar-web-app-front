"use client";
import { post } from "@/utils/axios";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import endpoints from "@/utils/endpoints";

interface FormData {
  fitness_plan_description: string;
  finance_plan_description: string;
  sobriety_plan_description: string;
  be_still_plan_description: string;
}

interface Errors {
  fitness_plan_description?: string;
  finance_plan_description?: string;
  sobriety_plan_description?: string;
  be_still_plan_description?: string;
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    fitness_plan_description: "",
    finance_plan_description: "",
    sobriety_plan_description: "",
    be_still_plan_description: "",
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
    if (!formData.fitness_plan_description)
      formErrors.fitness_plan_description = "Fitness goal is required.";
    if (!formData.finance_plan_description)
      formErrors.finance_plan_description = "Finance goal is required.";
    if (!formData.sobriety_plan_description)
      formErrors.sobriety_plan_description = "Sobriety goal is required.";
    if (!formData.be_still_plan_description)
      formErrors.be_still_plan_description = "Be still goal is required.";

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
      <div className="relative w-full min-h-screen  bg-image bg-cover bg-center bg-zinc-900 dark:bg-zinc-900">
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
              <h2 className="text-white text-2xl">
                How are you planning to use SOAR?
              </h2>
              <p className="text-zinc-500 mt-2">
                We&apos;ll fit the experience to your needs. Don&apos;t worry,
                you can change it later.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-8 max-w-lg text-white gap-6"
            >
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
                  {errors.fitness_plan_description && (
                    <p className="text-red-500 text-sm">
                      {errors.fitness_plan_description}
                    </p>
                  )}
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
                  {errors.finance_plan_description && (
                    <p className="text-red-500 text-sm">
                      {errors.finance_plan_description}
                    </p>
                  )}
                </div>
              </div>

              {/* Sobriety Goal Input */}
              <div className="flex items-center space-x-2 gap-3">
                <div className="flex gap-1">
                  <img src="/al.png" alt="Icon 1" className="w-12 h-12" />
                </div>
                <div className="flex w-full space-y-2 flex-col">
                  <label className="text-xl font-semibold">
                    Alcohol / No-substance
                  </label>
                  <input
                    type="text"
                    name="sobriety_plan_description"
                    value={formData.sobriety_plan_description}
                    onChange={handleInputChange}
                    placeholder="Enter your alcohol/No-substance goal here"
                    className="py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {errors.sobriety_plan_description && (
                    <p className="text-red-500 text-sm">
                      {errors.sobriety_plan_description}
                    </p>
                  )}
                </div>
              </div>
              {/* Sobriety Goal Input */}
              <div className="flex items-center space-x-2 gap-3">
                <div className="flex gap-1">
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 500 550"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="fill-current"
                  >
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M243.458,153.771c0.085,0,0.171-0.006,0.257-0.006c0.087,0,0.172,0.006,0.258,0.006     c42.464,0,76.884-34.422,76.884-76.887c0-42.46-34.42-76.884-76.884-76.884c-0.086,0-0.171,0.006-0.258,0.006     c-0.086,0-0.171-0.006-0.257-0.006c-42.465,0-76.884,34.424-76.884,76.884C166.572,119.349,200.991,153.771,243.458,153.771z"
                    />
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M436.565,311.038l-86.702-63.042l-27.417-66.953c-5.218-12.74-17.645-20.336-30.638-20.05l-0.004-0.03h-49.479h-49.477     l-0.004,0.03c-12.994-0.286-25.419,7.31-30.638,20.05l-27.418,66.953l-86.702,63.042c-14.443,10.502-17.64,30.724-7.136,45.169     c6.327,8.698,16.185,13.32,26.179,13.32c6.594,0,13.248-2.012,18.988-6.189l93.744-68.154l-2.389,24.675l-88.637,89.839     c-12.297,12.795-15.765,31.698-8.809,48.027c6.955,16.327,22.987,26.926,40.735,26.926h42.368     c-10.918-9.882-17.88-24.627-17.88-41.093c0-29.688,22.571-53.839,50.315-53.839c0,0,32.453,0,48.258,0     c15.807,0,28.35,12.922,28.35,12.922h-76.608c-21.085,0-38.24,18.354-38.24,40.917c0,22.562,17.155,40.916,38.24,40.916h74.192     c0.832-0.06,1.68-0.063,2.5-0.161h89.683c17.748,0,33.779-10.6,40.735-26.929c6.955-16.326,3.488-35.228-8.808-48.025     l-86.706-89.951h-0.024l-2.345-24.224l93.743,68.154c5.738,4.178,12.395,6.189,18.986,6.189c9.995,0,19.853-4.622,26.18-13.32     C454.205,341.762,451.009,321.54,436.565,311.038z"
                    />
                  </svg>{" "}
                </div>
                <div className="flex w-full space-y-2 flex-col">
                  <label className="text-xl font-semibold">Be Still</label>

                  <input
                    type="text"
                    name="be_still_plan_description"
                    value={formData.be_still_plan_description}
                    onChange={handleInputChange}
                    placeholder="Enter your be still goal here"
                    className="py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {errors.be_still_plan_description && (
                    <p className="text-red-500 text-sm">
                      {errors.be_still_plan_description}
                    </p>
                  )}
                </div>
              </div>

              <button className="py-4 mb-4 mt-8 w-40 font-semibold text-black bg-custom-gradient hover:bg-custom-gradient-hover rounded-full">
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
