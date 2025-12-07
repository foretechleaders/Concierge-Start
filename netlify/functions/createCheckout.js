import Stripe from "stripe";

// Load Stripe using secret key from Netlify environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    const { priceId } = JSON.parse(event.body);

    if (!priceId) {
      throw new Error("Missing Stripe priceId");
    }

    // Create a Stripe Checkout Session (2025+ method)
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL}/services?success=true`,
      cancel_url: `${process.env.URL}/services?canceled=true`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe Checkout Error:", err.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
