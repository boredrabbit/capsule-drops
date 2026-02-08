const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fetch = require('node-fetch');

// Gelato API configuration
const GELATO_API_KEY = process.env.GELATO_API_KEY;
const GELATO_PRODUCT_UID = process.env.GELATO_PRODUCT_UID;

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];

  let stripeEvent;

  try {
    // Verify webhook signature (you'll need to set this up in Stripe)
    // For now, we'll parse the event directly
    stripeEvent = JSON.parse(event.body);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook signature verification failed' })
    };
  }

  // Handle the checkout.session.completed event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;

    console.log('Payment successful! Creating Gelato order...');
    console.log('Session:', JSON.stringify(session, null, 2));

    try {
      // Extract customer details
      const customerName = session.customer_details.name || 'Customer';
      const customerEmail = session.customer_details.email;
      const shippingAddress = session.shipping_details?.address || session.customer_details?.address;
      const size = session.metadata?.size || 'L'; // Default to L if not provided

      console.log('Extracted size:', size);
      console.log('Session metadata:', JSON.stringify(session.metadata, null, 2));

      if (!shippingAddress) {
        throw new Error('No shipping address provided');
      }

      if (!size) {
        throw new Error('No size provided in metadata');
      }

      // Create Gelato order
      const gelatoOrder = await createGelatoOrder({
        customerName,
        customerEmail,
        shippingAddress,
        size,
        sessionId: session.id,
      });

      console.log('Gelato order created:', gelatoOrder);

      return {
        statusCode: 200,
        body: JSON.stringify({
          received: true,
          gelatoOrderId: gelatoOrder.id
        }),
      };
    } catch (error) {
      console.error('Error creating Gelato order:', error);
      // Still return 200 to acknowledge receipt of webhook
      // You should set up error monitoring/notifications
      return {
        statusCode: 200,
        body: JSON.stringify({
          received: true,
          error: error.message
        }),
      };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};

/**
 * Create an order in Gelato using Product UID (template-based ordering)
 * Uses your custom template with perfect positioning!
 */
async function createGelatoOrder({ customerName, customerEmail, shippingAddress, size, sessionId }) {
  const gelatoEndpoint = 'https://order.gelatoapi.com/v4/orders';

  // Map size to Gelato variant UID format
  // The product UID stays the same, we just specify the size variant
  const productUid = GELATO_PRODUCT_UID;

  // Map Stripe address to Gelato format
  const orderData = {
    orderType: 'order',
    orderReferenceId: sessionId,
    customerReferenceId: customerEmail,
    currency: 'GBP',
    shippingAddress: {
      firstName: customerName.split(' ')[0] || customerName,
      lastName: customerName.split(' ').slice(1).join(' ') || '',
      addressLine1: shippingAddress.line1,
      addressLine2: shippingAddress.line2 || '',
      city: shippingAddress.city,
      postCode: shippingAddress.postal_code,
      state: shippingAddress.state || '',
      country: shippingAddress.country,
      email: customerEmail,
      phone: '', // Optional: Collect phone if needed
    },
    items: [
      {
        itemReferenceId: `capsule-001-${size}`,
        productUid: productUid,
        variantUid: size.toLowerCase(), // S, M, L, XL, XXL
        quantity: 1,
        metadata: {
          size: size,
          product: 'capsule-001-wildest-party',
        },
      },
    ],
  };

  console.log('Creating Gelato order with data:', JSON.stringify(orderData, null, 2));

  const response = await fetch(gelatoEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': GELATO_API_KEY,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gelato API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result;
}
