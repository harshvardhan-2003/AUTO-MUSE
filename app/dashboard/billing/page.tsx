"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

function loadRazorpayScript() {
  if (document.getElementById("razorpay-script")) return;
  const script = document.createElement("script");
  script.id = "razorpay-script";
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const plans = [
  {
    name: "Basic",
    price: "₹199/month",
    amount: 19900,
    features: ["10,000 words/month", "Basic support", "Access to standard templates"],
    buttonText: "Choose Basic",
  },
  {
    name: "Pro",
    price: "₹499/month",
    amount: 49900,
    features: ["50,000 words/month", "Priority support", "Access to all templates", "Team collaboration"],
    buttonText: "Choose Pro",
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    amount: 0,
    features: ["Unlimited words", "Dedicated manager", "Custom integrations"],
    buttonText: "Contact Sales",
  },
];

function SubscriptionPlan({
  name,
  price,
  features,
  buttonText,
  onSubscribe,
  loading,
}: {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  onSubscribe: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col items-center bg-black text-white border border-gray-700 rounded-2xl shadow-xl p-8 min-w-[320px] max-w-xs mx-4 my-6 transition-transform hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-2 text-white">{name}</h2>
      <div className="text-xl font-semibold text-green-400 mb-4">{price}</div>
      <ul className="mb-6 list-disc list-inside text-white w-full">
        {features.map((feature, idx) => (
          <li key={idx} className="mb-2 text-white">{feature}</li>
        ))}
      </ul>
      <Button
        onClick={onSubscribe}
        className="w-full py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-900 text-white font-semibold transition-colors flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          buttonText
        )}
      </Button>
    </div>
  );
}

function Page() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleSubscribe = async (planName: string, amount: number) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again in a moment.");
      return;
    }

    if (amount === 0) {
      alert("Please contact sales for Enterprise plan.");
      return;
    }

    try {
      setLoadingPlan(planName);
      const res = await fetch("/api/create-subscription", {
        method: "POST",
      });
      const data = await res.json();

      const options = {
        key: RAZORPAY_KEY_ID,
        subscription_id: data.id,
        name: "AI Content Generator",
        description: `${planName} Subscription`,
        handler: function (response: any) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#39ff14",
        },
        modal: {
          ondismiss: () => {
            setLoadingPlan(null); // Reset loader if user closes payment modal
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Failed to initiate payment. Try again.");
      console.error("Razorpay Error:", err);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-center items-center overflow-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-10 text-white">Choose Your Plan</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl">
        {plans.map((plan) => (
          <SubscriptionPlan
            key={plan.name}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            buttonText={plan.buttonText}
            loading={loadingPlan === plan.name}
            onSubscribe={() => handleSubscribe(plan.name, plan.amount)}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
