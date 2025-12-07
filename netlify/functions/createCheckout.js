import Stripe from "stripe";

// Load Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    const { priceId, plan, billing } = JSON.parse(event.body);

    if (!priceId) throw new Error("Missing Stripe priceId");

    /* --------------------------------------------------
       FIX ORIGIN (this solves the redirect issue)
    --------------------------------------------------- */
    const origin =
      process.env.URL ||              // Netlify Production
      process.env.DEPLOY_PRIME_URL || // Netlify Preview Deploys
      "http://localhost:5173";        // Local Development

    console.log("Resolved origin:", origin);

    /* --------------------------------------------------
       Create Checkout Session (2025+)
    --------------------------------------------------- */
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      // Add metadata so we know what the user selected
      metadata: {
        selected_plan: plan,
        billing_cycle: billing,
      },

      success_url: `${origin}/services?success=true&plan=${plan}&billing=${billing}`,
      cancel_url: `${origin}/services?canceled=true`,
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
