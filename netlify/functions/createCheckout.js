// netlify/functions/createCheckout.js
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
    const { priceId } = JSON.parse(event.body || "{}");

    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing priceId" }),
      };
    }

    const origin =
      event.headers.origin ||
      `https://${event.headers["x-forwarded-host"]}`;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/services?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/services?canceled=true`,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("❌ createCheckout error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
