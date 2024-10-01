// src/app/api/stripe/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // 10.00 TRY
      currency: 'try',
      payment_method_data: {
        type: 'card',
        card: {
          number: body.cardNumber,
          exp_month: body.expiryDate.split('/')[0],
          exp_year: body.expiryDate.split('/')[1],
          cvc: body.cvc,
        },
      },
      confirm: true,
    });

    return new Response(JSON.stringify({ message: 'Stripe ile ödeme başarılı!' }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}