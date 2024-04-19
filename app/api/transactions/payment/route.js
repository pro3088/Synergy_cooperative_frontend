export const dynamic = "force-dynamic";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request, params) {
  try {
    const formData = await request.json();

    const amountWithoutCommas = formData.amount.replace(/,/g, "");
    const amount = parseInt(amountWithoutCommas, 10);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "NGN",
    });

    const response = JSON.stringify({clientSecret:paymentIntent.client_secret});

    return new Response(response, {
      status: 200,
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
