import Stripe from "stripe";

export const handler = async (event) => {
  // Allow only POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Validate body presence
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing request body" }),
    };
  }

  // Try to parse the JSON safely
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  // Extract required fields
  const { priceId } = data;

  if (!priceId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing priceId" }),
    };
  }

  // Initialize Stripe with your Netlify env var secret key
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url:
        "https://virginia-beach-concierge-clean.netlify.app/success",
      cancel_url:
        "https://virginia-beach-concierge-clean.netlify.app/cancel",
    });

    // Return session URL for redirect
    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
