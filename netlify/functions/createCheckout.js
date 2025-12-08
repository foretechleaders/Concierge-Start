// netlify/functions/createCheckout.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  platinum: {
    monthly: "price_1SbTxIR6LDjE4lhuSxWkmZbq",
    yearly: "price_1SbTyXR6LDjE4lhuXrQU3W09",
  },
  premium: {
    monthly: "price_1SbTqkR6LDjE4lhukW9S8ZAi",
    yearly: "price_1SbTvyR6LDjE4lhucS12hyWM",
  },
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { plan, billing } = body;

    if (!plan || !billing) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing plan or billing" }),
      };
    }

    const priceId = PRICE_IDS[plan]?.[billing];
    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid plan or billing" }),
      };
    }

    const origin =
      event.headers.origin ||
      `https://${event.headers["x-forwarded-host"] || "virginia-beach-concierge-clean.netlify.app"}`;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
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
};
