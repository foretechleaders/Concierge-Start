import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "../styles.css"; // FIXED CSS PATH

// -------------------------
// Stripe Checkout Price IDs
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

// -------------------------
// Stripe Client Init
// -------------------------
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Services() {
  const [billing, setBilling] = useState("monthly");

  // -------------------------
  // Handle Subscribe Click
  // -------------------------
  const handleSubscribe = async (planKey) => {
    try {
      console.log("Subscribe clicked:", planKey, billing);

      const stripe = await stripePromise;

      const priceId = PRICE_IDS[planKey][billing];
      console.log("Using Price ID:", priceId);

      const response = await fetch("/.netlify/functions/createCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          plan: planKey,
          billing,
        }),
      });

      const data = await response.json();
      console.log("Checkout response:", data);

      if (data.error) {
        alert("Unable to start checkout: " + JSON.stringify(data.error));
        return;
      }

      // Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId: data.sessionId });

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong: " + err.message);
    }
  };

  // -------------------------
  // Component UI
  // -------------------------
  return (
    <div className="services-page container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-6">Concierge Membership Plans</h1>

      {/* Billing Toggle */}
      <div className="billing-toggle mb-8">
        <button
          onClick={() => setBilling("monthly")}
          className={billing === "monthly" ? "active" : ""}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("yearly")}
          className={billing === "yearly" ? "active" : ""}
        >
          Yearly (Save!)
        </button>
      </div>

      {/* Pricing Plans */}
      <div className="plans-grid">
        {/* PREMIUM */}
        <div className="plan-card">
          <h2>Premium</h2>
          <p>Save 10% on partners</p>

          <div className="price">
            {billing === "monthly" && <span>$9.99/mo</span>}
            {billing === "yearly" && <span>$99/yr</span>}
          </div>

          <button onClick={() => handleSubscribe("premium")} className="subscribe-btn">
            Subscribe
          </button>
        </div>

        {/* PLATINUM */}
        <div className="plan-card">
          <h2>Platinum</h2>
          <p>Priority concierge support</p>

          <div className="price">
            {billing === "monthly" && <span>$24.99/mo</span>}
            {billing === "yearly" && <span>$249/yr</span>}
          </div>

          <button onClick={() => handleSubscribe("platinum")} className="subscribe-btn">
            Subscribe
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <h2 className="text-3xl font-semibold mt-16 mb-6">Compare Plans</h2>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Premium</th>
            <th>Platinum</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Partner Discounts</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Concierge Support</td>
            <td>Standard</td>
            <td>Priority</td>
          </tr>
          <tr>
            <td>VIP Response Time</td>
            <td>—</td>
            <td>✔</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
