const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not found in environment');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe API key not configured' })
    };
  }

  try {
    const { size, quantity } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Capsule 001 - "The Wildest Party"',
              description: `White heavyweight tee, size ${size}`,
            },
            unit_amount: 2999, // £29.99 in pence
          },
          quantity: quantity || 1,
        },
      ],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'AU', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE', 'SE', 'NO', 'DK', 'FI', 'IE', 'AT', 'CH', 'PL', 'CZ', 'PT', 'GR', 'NZ', 'SG', 'HK', 'JP', 'KR'],
      },
      metadata: {
        size: size,
        product: 'capsule-001-wildest-party',
      },
      success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Stripe error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
