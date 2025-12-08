import React, { useState } from "react";
import "./../styles.css";

const PRICE_IDS = {
  monthly: {
    premium: "price_1SbTqkR6LDjE4lhukW9S8ZAi",
    platinum: "price_1SbTxIR6LDjE4lhuSxWkmZbq",
  },
  yearly: {
    premium: "price_1SbTvyR6LDjE4lhucS12hyWM",
    platinum: "price_1SbTyXR6LDjE4lhuXrQU3W09",
  },
};

export default function Services() {
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = async (planKey) => {
    try {
      const billing = isYearly ? "yearly" : "monthly";
      const priceId = PRICE_IDS[billing][planKey];

      if (!priceId) {
        alert("Missing Stripe Price ID.");
        return;
      }

      const res = await fetch("/.netlify/functions/createCheckout", {
        method: "POST",
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (data.error) {
        alert("Stripe error: " + data.error);
        return;
      }

      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      alert("Unexpected error. Check console.");
    }
  };

  return (
    <div className="services-page">
      
      <h1 className="page-title">Concierge Membership Plans</h1>

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

      <div className="plans-container">

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
