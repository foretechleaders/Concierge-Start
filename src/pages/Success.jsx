import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) {
        setError("Missing session id.");
        setLoadingSession(false);
        return;
      }

      try {
        const res = await fetch(`/api/getSession?sessionId=${sessionId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load session");
        }

        setSession(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load your subscription details.");
      } finally {
        setLoadingSession(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  async function handleManageBilling() {
    if (!sessionId) return;

    try {
      setPortalLoading(true);
      const res = await fetch("/api/createPortal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to create portal session");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Unable to open billing portal. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  }

  let planLabel = "";
  let amountLabel = "";

  if (session && session.line_items && session.line_items.data.length > 0) {
    const item = session.line_items.data[0];
    const price = item.price;
    const product = price.product;

    const unitAmount = price.unit_amount || 0;
    const currency = (price.currency || "usd").toUpperCase();
    const interval = price.recurring?.interval || "month";

    amountLabel = `$${(unitAmount / 100).toFixed(2)} / ${interval}`;
    planLabel = product?.name || item.description || "Subscription";
  }

  return (
    <div className="page-wrapper" style={{ padding: "3rem 1.5rem" }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Subscription successful 🎉</h1>

        {loadingSession && <p>Loading your subscription details...</p>}

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        {!loadingSession && !error && session && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">{planLabel}</h2>
            <p className="text-lg mb-2">{amountLabel}</p>
            {session.customer_details?.email && (
              <p className="text-gray-600">
                Connected to: <strong>{session.customer_details.email}</strong>
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleManageBilling}
            disabled={portalLoading || !sessionId}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {portalLoading ? "Opening Billing Portal..." : "Manage Billing"}
          </button>

          <Link
            to="/services"
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
