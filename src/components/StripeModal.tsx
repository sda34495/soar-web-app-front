"use client";
import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CenterImageModal from "./UI/CenterImageModal";

// Load Stripe
const stripePromise = loadStripe("pk_test_51OKibhHp0rU7NH90hPjbadXkJHXYRFStnHnJGBn6YOWo19ikplzKDw64jZnbUQtLPVmIZXjjfvlVZdyDWeNcpOUH00m2PdJlVR");

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, price }) => {
  if (!isOpen) return null;

  const [showSecondModal, setShowSecondModal] = useState(false);

  return (
    <Elements stripe={stripePromise}>
      <StripePaymentModal
        price={price}
        onClose={onClose}
        onPaymentSuccess={() => {
          setShowSecondModal(true);
        }}
      />
      <CenterImageModal
        title="Congratulations"
        description="Your session has been booked."
        isOpen={showSecondModal}
        image="/cone.png"
        onClose={() => setShowSecondModal(false)}
      />
    </Elements>
  );
};

const StripePaymentModal: React.FC<{
  price: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
}> = ({ price, onClose, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscription = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Create Subscription via Backend
      const { data: { clientSecret } } = await axios.post("/api/create-subscription", {
        priceId: "YOUR_PRICE_ID", // Replace with your Stripe Price ID for the subscription
      });

      if (!stripe || !elements) {
        setLoading(false);
        setError("Stripe is not loaded properly.");
        return;
      }

      // 2. Confirm Subscription Setup
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setLoading(false);
        setError("Card element is not loaded.");
        return;
      }

      const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message || "Subscription setup failed.");
        setLoading(false);
        return;
      }

      if (setupIntent?.status === "succeeded") {
        onPaymentSuccess();
      } else {
        setError("Subscription setup failed. Please try again.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#202020] text-white rounded-3xl border border-zinc-700 max-w-md w-full p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Process Payment</h2>
          <button onClick={onClose} className="text-white">&times;</button>
        </div>
        <p className="text-sm text-gray-400 mb-4">Secure Stripe Payment</p>

        {/* Card Input */}
        <div className="space-y-4">
          <label htmlFor="card" className="text-sm text-[#7C7C7C]">Card Details</label>
          <div className="bg-zinc-600/30 opacity-90 p-2 border rounded-lg">
            <CardElement options={{ style: { base: { color: "#fff" } } }} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="px-10 w-full py-1 text-white font-semibold rounded-full border-2 border-[#7c7c7c]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-10 w-full py-3 text-black bg-custom-gradient hover:bg-custom-gradient-hover rounded-full font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSubscription}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default BookingModal;
