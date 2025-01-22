"use client";
import React, { useState } from "react";
import { post } from "@/utils/axios"; // Import the post function to make the API call
import CenterImageModal from "./UI/CenterImageModal"; // Success modal
// import StripePaymentModal from "./UI/StripePaymentModal"; // Stripe Payment Modal
import endpoints from "@/utils/endpoints";
import toast from "react-hot-toast";
import { OneTimePaymentModal } from "./StripeModal";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
  setUpdatePost?: any;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  consultationReason?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  price,
  setUpdatePost
}) => {
  const [showSecondModal, setShowSecondModal] = useState(false); // For the second modal
  const [showPaymentModal, setShowPaymentModal] = useState(false); // For Stripe Payment Modal
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consultationReason: "",
  });

  const [loginErrors, setLoginErrors] = useState<FormErrors>({}); // Validation errors
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error state

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setLoginErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Clear specific field error on change
  };

  // Validate the form fields
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } 
    // else if (formData.phone.length !== 11) {
    //   newErrors.phone = "Phone number must be exactly 11 digits.";
    // }
    if (!formData.consultationReason.trim())
      newErrors.consultationReason = "Reason for consultation is required.";

    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form data to the API
  const formSubmission = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
   

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email_address: formData.email,
      phone: formData.phone,
      consultation_reason: formData.consultationReason,
    };

    try {
      const response = await post(endpoints.BOOK_COACHING_SESSION, payload);

      if (response.data?.success) {
        // Close the first modal and show the success modal
        onClose();
        setTimeout(() => {
          setUpdatePost(true);
          setShowSecondModal(true); // Open the success modal after a short delay
        }, 500);

        
      } else {
        // Handle failure (show error)
        setError("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking failed:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        consultationReason: "",
      })
      
    }
  };

  const handleNext = () => {
    if (!validate()) {
      return; // Stop execution if validation fails
    }

    // Open the payment modal
    setShowPaymentModal(true);
  };

  return (
    <>
      {/* First Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#202020] text-white rounded-3xl border border-zinc-700 max-w-md w-full p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <img src="/laptop.png" alt="Laptop" className="h-16" />
              <span className="border-2 border-golden bg-golden/10 rounded-xl py-2 px-3 text-xl font-semibold">
                Premium{" "}
                <span className="text-2xl ml-1 font-Bricolage-Grotesque">
                  ${price}
                </span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2 font-Bricolage-Grotesque">
              Booking your session
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Enter your details for setting up your session
            </p>

            {/* Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {loginErrors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {loginErrors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="(123) 456-7890"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value) && value.length <= 11) {
                        // Allow only digits and max length of 15
                        handleInputChange(e);
                      }
                    }}
                    maxLength={15} // Set max digits allowed
                    className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                  />
                  {loginErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Your reason here"
                  name="consultationReason"
                  value={formData.consultationReason}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                ></textarea>
                {loginErrors.consultationReason && (
                  <p className="text-red-500 text-xs mt-1">
                    {loginErrors.consultationReason}
                  </p>
                )}
              </div>

              {/* Show general error message if there's any */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>

            {/* Footer */}
            <div className="mt-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="px-10 w-full py-1 text-white font-semibold rounded-full border-2 border-[#7c7c7c]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-10 w-full py-3 text-black bg-custom-gradient hover:bg-custom-gradient-hover rounded-full font-semibold"
                onClick={handleNext}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Booking..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <OneTimePaymentModal
          price={price}
          endpoint={endpoints.STRIPE_PAYMENT}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={formSubmission} // Submit form after successful payment
        />
      )}

      {/* Second Modal (Success) */}
      {showSecondModal && (
        <CenterImageModal
          description="Your session has been booked."
          isOpen={showSecondModal}
          onClose={() => setShowSecondModal(false)}
          image="/cone.png"
        />
      )}
    </>
  );
};

export default BookingModal;
