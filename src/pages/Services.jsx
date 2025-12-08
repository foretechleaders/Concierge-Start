import React, { useState } from "react";

const PRICE_IDS = {
  premium: {
    monthly: "price_1SbTqkR6LDjE4lhukW9S8ZAi", // $9.99/mo
    yearly: "price_1SbTvyR6LDjE4lhucS12hyWM",  // $99/yr
  },
  platinum: {
    monthly: "price_1SbTxIR6LDjE4lhuSxWkmZbq", // $24.99/mo
    yearly: "price_1SbTyXR6LDjE4lhuXrQU3W09",  // $249/yr
  },
};

export default function Services() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  /** ------------------------------------------------------------------
   *  HANDLE SUBSCRIBE BUTTON CLICK
   *  ------------------------------------------------------------------ */
  async function handleSubscribe(planKey) {
    console.log("🔵 Subscribe clicked:", planKey);
    console.log("🟣 Billing cycle:", billingCycle);

    const priceId = PRICE_IDS[planKey]?.[billingCycle];

    console.log("🟡 Selected PRICE ID:", priceId);

    if (!priceId) {
      console.error("❌ ERROR: Invalid planKey or billing cycle.");
      return;
    }

    try {
      console.log("🛠 Sending request to Netlify function…");

      const res = await fetch("/.netlify/functions/createCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }), // ⭐ FIX: REQUIRED BODY
      });

      const data = await res.json();
      console.log("🟢 Server response:", data);

      if (data?.url) {
        console.log("➡ Redirecting to Checkout:", data.url);
        window.location.href = data.url; // ⭐ Stripe-Approved Redirect
      } else {
        console.error("❌ Stripe error:", data);
        alert("Unable to start checkout: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("🔥 Network/Stripe error:", err);
      alert("Checkout error — see console for details.");
    }
  }

  return (
    <div className="services-page container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Concierge Membership Plans</h1>

      {/* TOGGLE FOR MONTHLY/YEARLY */}
      <div className="billing-toggle mb-8">
        <label className="mr-4 font-semibold">Billing:</label>
        <button
          className={`px-4 py-2 mr-2 ${
            billingCycle === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 ${
            billingCycle === "yearly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly (Save!)
        </button>
      </div>

      {/* PRICING GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* PREMIUM PLAN */}
        <div className="border rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-3">Premium</h2>
          <p className="text-gray-600 mb-4">Save 10% on partners</p>

          <p className="text-4xl font-semibold mb-4">
            {billingCycle === "monthly" ? "$9.99/mo" : "$99/yr"}
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            onClick={() => handleSubscribe("premium")}
          >
            Subscribe
          </button>
        </div>

        {/* PLATINUM PLAN */}
        <div className="border rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-3">Platinum</h2>
          <p className="text-gray-600 mb-4">Priority concierge support</p>

          <p className="text-4xl font-semibold mb-4">
            {billingCycle === "monthly" ? "$24.99/mo" : "$249/yr"}
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            onClick={() => handleSubscribe("platinum")}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className="comparison mt-16">
        <h2 className="text-3xl font-bold mb-6">Compare Plans</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4">Feature</th>
              <th className="p-4">Premium</th>
              <th className="p-4">Platinum</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">Partner Discounts</td>
              <td className="p-4">✔</td>
              <td className="p-4">✔</td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Concierge Support</td>
              <td className="p-4">Standard</td>
              <td className="p-4 font-semibold">Priority</td>
            </tr>
            <tr className="border-t">
              <td className="p-4">VIP Response Time</td>
              <td className="p-4">—</td>
              <td className="p-4">✔</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
