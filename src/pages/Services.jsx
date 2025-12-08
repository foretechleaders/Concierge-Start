import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "../styles.css"; // your global CSS

// -------------------------
// Stripe Price IDs
// -------------------------
const PRICE_IDS = {
  premium: {
    monthly: "price_1SbTqkR6LDjE4lhukW9S8ZAi",   // $9.99/mo
    yearly: "price_1SbTvyR6LDjE4lhucS12hyWM",    // $99/yr
  },
  platinum: {
    monthly: "price_1SbTxIR6LDjE4lhuSxWkmZbq",   // $24.99/mo
    yearly: "price_1SbTyXR6LDjE4lhuXrQU3W09",    // $249/yr
  }
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Services() {
  const [billing, setBilling] = useState("monthly");

  const handleSubscribe = async (planKey) => {
    try {
      const stripe = await stripePromise;

      const priceId = PRICE_IDS[planKey][billing];

      const response = await fetch("/.netlify/functions/createCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, plan: planKey, billing }),
      });

      const data = await response.json();
      if (data.error) {
        alert("Checkout Error: " + JSON.stringify(data.error));
        return;
      }

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      alert("Stripe error: " + error.message);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Concierge Membership Plans</h1>

      {/* Billing Toggle */}
      <div className="flex space-x-4 mb-10">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-4 py-2 rounded ${
            billing === "monthly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setBilling("yearly")}
          className={`px-4 py-2 rounded ${
            billing === "yearly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Yearly (Save!)
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* PREMIUM */}
        <div className="border rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Premium</h2>
          <p className="text-gray-600 mb-4">Save 10% on partners</p>

          <div className="text-3xl font-bold mb-6">
            {billing === "monthly" ? "$9.99/mo" : "$99/yr"}
          </div>

          <button
            onClick={() => handleSubscribe("premium")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        </div>

        {/* PLATINUM */}
        <div className="border rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Platinum</h2>
          <p className="text-gray-600 mb-4">Priority concierge support</p>

          <div className="text-3xl font-bold mb-6">
            {billing === "monthly" ? "$24.99/mo" : "$249/yr"}
          </div>

          <button
            onClick={() => handleSubscribe("platinum")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <h2 className="text-3xl font-semibold mt-16 mb-6">Compare Plans</h2>

      <table className="table-auto w-full border rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Feature</th>
            <th className="px-4 py-2 text-left">Premium</th>
            <th className="px-4 py-2 text-left">Platinum</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border px-4 py-2">Partner Discounts</td>
            <td className="border px-4 py-2">✔</td>
            <td className="border px-4 py-2">✔</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Concierge Support</td>
            <td className="border px-4 py-2">Standard</td>
            <td className="border px-4 py-2">Priority</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">VIP Response</td>
            <td className="border px-4 py-2">—</td>
            <td className="border px-4 py-2">✔</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
