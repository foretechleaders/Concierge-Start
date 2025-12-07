// netlify/functions/createCheckout.js
import Stripe from "stripe";

export const handler = async (event) => {
  try {
    console.log("➡️ Stripe Checkout Function Invoked");

    const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    if (!SECRET_KEY) {
      console.error("❌ STRIPE_SECRET_KEY missing");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Stripe secret key missing." }),
      };
    }

    const stripe = new Stripe(SECRET_KEY);

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing request body" }),
      };
    }

    const data = JSON.parse(event.body);
    console.log("➡️ Parsed Body:", data);

    if (!data.priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing priceId" }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      success_url: `https://virginia-beach-concierge-clean.netlify.app/services?success=true`,
      cancel_url: `https://virginia-beach-concierge-clean.netlify.app/services?canceled=true`,
    });

    console.log("➡️ Session Created:", session.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("❌ Stripe Error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
