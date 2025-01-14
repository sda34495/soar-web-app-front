"use client";
import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CenterImageModal from "./UI/CenterImageModal";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import { useRouter } from "next/navigation";

// Load Stripe with your publishable key
const stripekey = process.env.NEXT_PUBLIC_STRIPE_KEY

const stripePromise = loadStripe(stripekey); // Replace with your Stripe publishable key

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string; // Price ID for the subscription
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, price }) => {


  const [showSecondModal, setShowSecondModal] = useState(false);


  const router = useRouter()
  const handelClose = () => {
    onClose();
    setShowSecondModal(false);
    router.push("/check-in")
  }


  if (!isOpen) return null;
  return (

    <Elements stripe={stripePromise}>
      <StripePaymentModal
        price={price}
        endpoint={endpoints.STRIPE_PAYMENT}
        onClose={onClose}
        onPaymentSuccess={() => {
          setShowSecondModal(true);
        }}
      />
      <CenterImageModal
        title="Congratulations"
        description="You have successfully subscribed to our service."
        isOpen={showSecondModal}
        image="/cone.png"
        onClose={handelClose}
      />
    </Elements>
  );
};

export const StripePaymentModal: React.FC<{
  price: string;
  endpoint: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
}> = ({ price, onClose, onPaymentSuccess, endpoint }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscription = async () => {
    setLoading(true);
    setError("");
    try {
      const { data: result } = await getData(endpoint);


      const clientSecret = result.data.clientSecret;

      if (!stripe || !elements) {
        setLoading(false);
        setError("Stripe is not loaded properly.");
        return;
      }

      // 2. Get individual card elements
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        setLoading(false);
        setError("One or more card elements are not loaded.");
        return;
      }

      // 3. Confirm the card setup
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      if (error) {
        setError(error.message || "Card setup confirmation failed.");
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // await axios.post(
        //   "http://localhost:8082/api/payments/confirm-subscription",
        //   { setupIntentId: setupIntent.id, priceId: price },
        //   {
        //     headers: {
        //       Authorization: `Bearer YOUR_JWT_TOKEN`,
        //     },
        //   }
        // );
        onPaymentSuccess();
      } else {
        setError("Card setup was not completed successfully.");
      }

    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred.");
    } finally {
      onClose();
      setLoading(false);
    }
  };


  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#202020] text-white rounded-3xl border border-zinc-700 max-w-md w-full p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Process Payment</h2>
          <button onClick={onClose} className="text-white text-2xl">&times;</button>
        </div>
        <p className="text-sm text-gray-400 mb-4">Secure Stripe Payment</p>

        {/* Card Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="card-number" className="text-sm text-[#7C7C7C]">Card Number</label>
            <div className="bg-zinc-600/30 opacity-90 p-2 border rounded-lg">
              <CardNumberElement
                id="card-number"
                options={{
                  style: {
                    base: {
                      color: "#fff",
                      fontSize: "16px",
                      "::placeholder": { color: "#7c7c7c" },
                    },
                    invalid: { color: "#fa755a" },
                  },
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="card-expiry" className="text-sm text-[#7C7C7C]">Expiry</label>
              <div className="bg-zinc-600/30 opacity-90 p-2 border rounded-lg">
                <CardExpiryElement
                  id="card-expiry"
                  options={{
                    style: {
                      base: {
                        color: "#fff",
                        fontSize: "16px",
                        "::placeholder": { color: "#7c7c7c" },
                      },
                      invalid: { color: "#fa755a" },
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="card-cvc" className="text-sm text-[#7C7C7C]">CVC</label>
              <div className="bg-zinc-600/30 opacity-90 p-2 border rounded-lg">
                <CardCvcElement
                  id="card-cvc"
                  options={{
                    style: {
                      base: {
                        color: "#fff",
                        fontSize: "16px",
                        "::placeholder": { color: "#7c7c7c" },
                      },
                      invalid: { color: "#fa755a" },
                    },
                  }}
                />
              </div>
            </div>
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
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};



export const OneTimePaymentModal: React.FC<{
  price: string;
  endpoint: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
}> = ({ price, endpoint, onClose, onPaymentSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentModal
        price={price}
        endpoint={endpoint}
        onClose={onClose}
        onPaymentSuccess={onPaymentSuccess}
      />
    </Elements>
  );
};