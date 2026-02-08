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
  const gelatoEndpoint = 'https://order.gelatoapis.com/v4/orders';

  // Map size to specific Gelato Product UID (each size variant has its own UID)
  const sizeToProductUid = {
    'XS': '7e04abe1-1b23-41c0-9618-180468a239a3',
    'S': 'fd2de83e-3a10-499d-ad07-438d1d45f5fc',
    'M': 'd026e986-be9d-412c-9345-3370ec7b898a',
    'L': '33d25c14-5d75-496c-89ae-d50f60cecb3b',
    'XL': '6aed96a9-3cba-487c-9e20-d438bb11bf36',
    '2XL': '51f0bdd7-09ee-4d3d-81f4-d03e7397b648',
    'XXL': '51f0bdd7-09ee-4d3d-81f4-d03e7397b648', // Same as 2XL
    '3XL': 'ec77b2cd-47f1-4396-aa64-331cc2b4ae8e',
    '4XL': '0db8a7d6-5a71-4e52-bf33-9942a0c58db5',
    '5XL': 'bf246379-3247-45e2-97f4-af05abb9593c'
  };

  const productUid = sizeToProductUid[size.toUpperCase()];

  if (!productUid) {
    throw new Error(`Unknown size: ${size}. Available sizes: ${Object.keys(sizeToProductUid).join(', ')}`);
  }

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
        quantity: 1,
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
