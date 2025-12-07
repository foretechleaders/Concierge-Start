import React, { useState } from "react";
import { Check, X } from "lucide-react";

/* -------------------------------------------
   PRICE ID CONFIGURATION (YOUR REAL PRICE IDs)
---------------------------------------------- */

const PRICE_IDS = {
  premium: {
    monthly: "price_1SbTyXR6LDjE4lhuXrQU3W09",
    annual: "price_1SbTxIR6LDjE4lhuSxWkmZbq",
  },
  platinum: {
    monthly: "price_1SbTvyR6LDjE4lhucS12hyWM",
    annual: "price_1SbTqkR6LDjE4lhukW9S8ZAi",
  },
};

export default function Services() {
  const [billing, setBilling] = useState("monthly"); // monthly | annual

  console.log("Loaded PRICE_IDS:", PRICE_IDS);

  /* -------------------------------------------
     STRIPE CHECKOUT HANDLER (SERVERLESS)
---------------------------------------------- */
  async function handleSubscribe(planKey) {
    console.log("🔔 Subscribe pressed → Plan:", planKey);
    console.log("Billing selected:", billing);

    const priceId = PRICE_IDS[planKey][billing];
    console.log("🔥 Stripe priceId:", priceId);

    if (!priceId) {
      alert("ERROR: Missing Stripe price ID");
      console.error("Missing PRICE ID for plan:", planKey, "billing:", billing);
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/createCheckout", {
        method: "POST",
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      console.log("Stripe session response:", data);

      if (data.url) {
        console.log("➡️ Redirecting to Stripe Checkout:", data.url);
        window.location.href = data.url;
      } else {
        alert("Checkout failed. See console.");
        console.error("❌ Checkout error:", data);
      }
    } catch (err) {
      console.error("❌ Network or serverless error:", err);
      alert("Network error contacting Stripe.");
    }
  }

  /* -------------------------------------------
     PRICING PLAN DEFINITIONS
---------------------------------------------- */
  const plans = [
    {
      name: "Premium",
      key: "premium",
      monthly: 9.99,
      annual: 99,
      subtitle: "Save 10% on partners",
      highlight: false,
      features: {
        concierge: true,
        discounts: true,
        priority: false,
        vip: false,
        phone: false,
      },
    },
    {
      name: "Platinum",
      key: "platinum",
      monthly: 24.99,
      annual: 249,
      subtitle: "VIP response",
      highlight: true,
      features: {
        concierge: true,
        discounts: true,
        priority: true,
        vip: true,
        phone: true,
      },
    },
  ];

  const priceDisplay = (plan) =>
    billing === "monthly"
      ? `$${plan.monthly.toFixed(2)}/mo`
      : `$${plan.annual.toFixed(0)}/yr`;

  /* -------------------------------------------
     UI RENDER
---------------------------------------------- */
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">
        Concierge Services
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Choose a plan that fits your lifestyle in Virginia Beach.
      </p>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center mb-10">
        <span
          className={`px-4 py-2 cursor-pointer ${
            billing === "monthly" ? "font-semibold text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </span>

        <div
          className="mx-3 w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer"
          onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
        >
          <div
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              billing === "monthly" ? "left-1" : "left-6"
            }`}
          />
        </div>

        <span
          className={`px-4 py-2 cursor-pointer ${
            billing === "annual" ? "font-semibold text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setBilling("annual")}
        >
          Annual
        </span>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={`border rounded-2xl shadow-sm p-6 transition hover:shadow-lg bg-white ${
              plan.highlight ? "border-blue-600 shadow-md" : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
            <p className="text-gray-500 mb-4">{plan.subtitle}</p>

            <p className="text-3xl font-bold mb-6">{priceDisplay(plan)}</p>

            <button
              className={`w-full py-3 rounded-xl font-semibold text-white transition mb-6 ${
                plan.highlight
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
              onClick={() => handleSubscribe(plan.key)}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <h2 className="text-2xl font-bold mb-4 text-center">Compare Plans</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl shadow text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">Feature</th>
              <th className="p-4 text-center">Premium</th>
              <th className="p-4 text-center">Platinum</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Concierge Support", key: "concierge" },
              { label: "Local Discounts", key: "discounts" },
              { label: "Priority Support", key: "priority" },
              { label: "VIP Response", key: "vip" },
              { label: "Phone/Text Support", key: "phone" },
            ].map((row) => (
              <tr key={row.label} className="border-b last:border-none">
                <td className="p-4 font-medium">{row.label}</td>
                {plans.map((plan) => (
                  <td key={plan.key} className="p-4 text-center">
                    {plan.features[row.key] ? (
                      <Check className="w-5 h-5 text-blue-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
