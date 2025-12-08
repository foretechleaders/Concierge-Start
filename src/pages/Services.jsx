import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./styles.css";

// ✅ Stripe Publishable Key (from Netlify env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ✅ Correct Price IDs (TEST MODE)
const PRICE_IDS = {
  premium: {
    monthly: "price_1SbTqkR6LDjE4lhukW9S8ZAi",   // $9.99/mo
    yearly: "price_1SbTvyR6LDjE4lhucS12hyWM",    // $99/yr
  },
  platinum: {
    monthly: "price_1SbTxIR6LDjE4lhuSxWkmZbq",   // $24.99/mo
    yearly: "price_1SbTyXR6LDjE4lhuXrQU3W09",    // $249/yr
  },
};

export default function Services() {
  const [billing, setBilling] = useState("monthly");

  // ============================================================
  // 🚀 HANDLE SUBSCRIBE — sends ONLY { priceId } to backend
  // ============================================================
  const handleSubscribe = async (planKey) => {
    const priceId = PRICE_IDS[planKey][billing];

    if (!priceId) {
      alert("Invalid plan or billing option.");
      return;
    }

    try {
      const stripe = await stripePromise;

      const res = await fetch("/.netlify/functions/createCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),  // ⭐ ONLY sending priceId
      });

      const data = await res.json();

      if (data.error || !data.url) {
        alert("Unable to start checkout: " + JSON.stringify(data.error));
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Unexpected checkout error.");
    }
  };

  // Pretty formatting
  const formatPrice = (price) =>
    billing === "yearly" ? `$${price}/yr` : `$${price}/mo`;

  return (
    <div className="services-page container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Concierge Membership Plans</h1>

      {/* Billing Toggle */}
      <div className="billing-toggle flex items-center gap-3 mb-8">
        <button
          className={`toggle-btn ${billing === "monthly" ? "active" : ""}`}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          className={`toggle-btn ${billing === "yearly" ? "active" : ""}`}
          onClick={() => setBilling("yearly")}
        >
          Yearly (Save!)
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-grid grid md:grid-cols-2 gap-8">
        
        {/* ⭐ PREMIUM PLAN */}
        <div className="plan-card p-6 rounded-xl shadow bg-white">
          <h2 className="text-2xl font-semibold mb-2">Premium</h2>
          <p className="text-gray-600 mb-4">Save 10% on partners</p>

          <p className="price text-4xl font-bold mb-4">
            {formatPrice(billing === "monthly" ? 9.99 : 99)}
          </p>

          <button
            className="subscribe-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleSubscribe("premium")}
          >
            Subscribe
          </button>
        </div>

        {/* ⭐ PLATINUM PLAN */}
        <div className="plan-card p-6 rounded-xl shadow bg-white">
          <h2 className="text-2xl font-semibold mb-2">Platinum</h2>
          <p className="text-gray-600 mb-4">Priority concierge support</p>

          <p className="price text-4xl font-bold mb-4">
            {formatPrice(billing === "monthly" ? 24.99 : 249)}
          </p>

          <button
            className="subscribe-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleSubscribe("platinum")}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="comparison mt-12">
        <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>

        <table className="comparison-table w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-3 border">Feature</th>
              <th className="p-3 border">Premium</th>
              <th className="p-3 border">Platinum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border">Partner Discounts</td>
              <td className="p-3 border text-center">✔️</td>
              <td className="p-3 border text-center">✔️</td>
            </tr>
            <tr>
              <td className="p-3 border">Concierge Support</td>
              <td className="p-3 border">Standard</td>
              <td className="p-3 border">Priority</td>
            </tr>
            <tr>
              <td className="p-3 border">VIP Response Time</td>
              <td className="p-3 border text-center">—</td>
              <td className="p-3 border text-center">✔️</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
