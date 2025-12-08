import React, { useState } from "react";
import "./../styles.css"; // FIXED path (no ./styles.css)

const PRICE_IDS = {
  monthly: {
    premium: "price_1SbTqkR6LDjE4lhukW9S8ZAi",   // $9.99/mo
    platinum: "price_1SbTxIR6LDjE4lhuSxWkmZbq",  // $24.99/mo
  },
  yearly: {
    premium: "price_1SbTvyR6LDjE4lhucS12hyWM",   // $99/yr
    platinum: "price_1SbTyXR6LDjE4lhuXrQU3W09",  // $249/yr
  },
};

export default function Services() {
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = async (planKey) => {
    try {
      const billing = isYearly ? "yearly" : "monthly";
      const priceId = PRICE_IDS[billing][planKey];

      if (!priceId) {
        alert("Missing price ID for plan.");
        return;
      }

      console.log("Selected plan:", planKey, billing, priceId);

      // Call the Netlify checkout function
      const res = await fetch("/.netlify/functions/createCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      console.log("Checkout session response:", data);

      if (data.error) {
        alert("Stripe error: " + data.error);
        return;
      }

      if (!data.url) {
        alert("Stripe error: No Checkout URL returned.");
        return;
      }

      // ⭐ NEW 2025+ Stripe redirect method
      window.location.href = data.url;

    } catch (err) {
      console.error(err);
      alert("Unexpected error. See console.");
    }
  };

  return (
    <div className="services-page container">

      <h1 className="page-title">Concierge Membership Plans</h1>

      {/* BILLING TOGGLE */}
      <div className="billing-toggle">
        <button
          className={!isYearly ? "active" : ""}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>

        <button
          className={isYearly ? "active" : ""}
          onClick={() => setIsYearly(true)}
        >
          Yearly (Save!)
        </button>
      </div>

      {/* MEMBERSHIP PLANS */}
      <div className="plans-container">

        {/* PREMIUM PLAN */}
        <div className="plan-card">
          <h2>Premium</h2>
          <p>Save 10% on partners</p>

          <div className="price">
            {isYearly ? "$99/yr" : "$9.99/mo"}
          </div>

          <button
            className="subscribe-btn"
            onClick={() => handleSubscribe("premium")}
          >
            Subscribe
          </button>
        </div>

        {/* PLATINUM PLAN */}
        <div className="plan-card">
          <h2>Platinum</h2>
          <p>Priority concierge support</p>

          <div className="price">
            {isYearly ? "$249/yr" : "$24.99/mo"}
          </div>

          <button
            className="subscribe-btn"
            onClick={() => handleSubscribe("platinum")}
          >
            Subscribe
          </button>
        </div>

      </div>

      {/* COMPARISON TABLE */}
      <h2 className="compare-title">Compare Plans</h2>

      <table className="compare-table">
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
