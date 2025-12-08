import React, { useEffect, useState } from "react";

export default function Account() {
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("stripeCustomerId");
    if (stored) setCustomerId(stored);
  }, []);

  const openPortal = async () => {
    if (!customerId) {
      alert("No Stripe customer found.");
      return;
    }

    const res = await fetch("/.netlify/functions/createPortal", {
      method: "POST",
      body: JSON.stringify({
        customerId,
        returnUrl: window.location.origin + "/account",
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Portal error: " + data.error);
    }
  };

  return (
    <div className="services-page">
      <h1 className="page-title">Your Account</h1>

      {!customerId ? (
        <p>You do not have an active subscription.</p>
      ) : (
        <>
          <p>Manage your subscription, payment methods, and invoices.</p>

          <button className="subscribe-btn" onClick={openPortal}>
            Manage Billing
          </button>
        </>
      )}
    </div>
  );
}
