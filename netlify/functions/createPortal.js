// netlify/functions/createPortal.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { sessionId } = JSON.parse(event.body || "{}");

    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing sessionId" }),
      };
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!checkoutSession.customer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No customer found on session" }),
      };
    }

    const origin =
      event.headers.origin ||
      `https://${event.headers["x-forwarded-host"]}`;

    const portal = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: `${origin}/services`,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: portal.url }),
    };
  } catch (err) {
    console.error("❌ createPortal error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
