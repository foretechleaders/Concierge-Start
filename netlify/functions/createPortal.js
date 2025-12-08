// netlify/functions/createPortal.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { sessionId } = body;

    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing sessionId" }),
      };
    }

    // Get the checkout session so we can grab the customer id
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!checkoutSession.customer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No customer found on session" }),
      };
    }

    // Figure out where to send the user back AFTER the portal
    const origin =
      event.headers.origin ||
      `https://${event.headers["x-forwarded-host"] || "virginia-beach-concierge-clean.netlify.app"}`;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: `${origin}/services`,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: portalSession.url }),
    };
  } catch (err) {
    console.error("❌ createPortal error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
