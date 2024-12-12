"use client";
import React, { useState } from "react";
import { post } from "@/utils/axios"; // Import the post function to make the API call
import StripModal from "@/components/StripeModal"; // Import your existing second modal component
import CenterImageModal from "./UI/CenterImageModal"; // Success modal
import { Book_Coaching_Session } from "@/utils/endpoints";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, price }) => {
  const [showSecondModal, setShowSecondModal] = useState(false); // For the second modal
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consultationReason: "",
  }); 
  
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error state

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    console.log("User Input Data:", formData);


    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email_address: formData.email,
      phone: formData.phone,
      consultation_reason: formData.consultationReason,
    };

    try {
      // Call the API to book the coaching session
      const response = await post(Book_Coaching_Session, payload);

      if (response.data?.success) {
        // Close the first modal and show the second modal
        onClose();
        setTimeout(() => {
          setShowSecondModal(true); // Open the second modal after a short delay
        }, 500);

        console.log(response.data)
      } else {
        // Handle failure (show error)
        setError("Booking failed. Please try again.");
      }
    } catch (err) {
      // Catch any errors from the API request
      console.error("Booking failed:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
                <span className="text-2xl ml-1 font-Bricolage-Grotesque">${price}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2 font-Bricolage-Grotesque">Booking your session</h2>
            <p className="text-sm text-gray-400 mb-4">Enter your details for setting up your session</p>

            {/* Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
              </div>
              <textarea
                placeholder="Your reason here"
                name="consultationReason"
                value={formData.consultationReason}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
              ></textarea>

              {/* Show error message if there's any */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
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

      {/* Second Modal (CenterImageModal) */}
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
