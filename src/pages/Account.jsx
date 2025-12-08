import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load Stripe customer ID from local storage
  useEffect(() => {
    const stored = localStorage.getItem("stripeCustomerId");
    if (!stored) {
      // If the user is not subscribed, redirect to services
      navigate("/services");
      return;
    }

    setCustomerId(stored);
    setLoading(false);
  }, [navigate]);

  const handlePortal = async () => {
    if (!customerId) {
      alert("No subscription found.");
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

    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert("Unable to open billing portal: " + data.error);
    }
  };

  if (loading) return <p>Loading your account...</p>;

  return (
    <div className="services-page">
      <h1 className="page-title">My Account</h1>

      <p>Your subscription is active.</p>

      <button className="subscribe-btn" onClick={handlePortal}>
        Manage Billing
      </button>
    </div>
  );
}
