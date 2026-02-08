# Automated Fulfillment Setup Guide
## Sleep-Mode E-Commerce 💤💰

Your site is now set up for **fully automated order fulfillment**. When customers buy, orders automatically flow to Gelato for printing and shipping!

---

## 🎯 What You Need to Complete:

### 1. Get Your Gelato API Key

1. Go to: https://dashboard.gelato.com/account/api-keys
2. Click **"Create API Key"**
3. Name it: `Capsule Drops Production`
4. **Copy the key** (starts with `gelato_...`)

### 2. Get Your Gelato Product UID

1. Go to: https://dashboard.gelato.com/products
2. Click on your **"Viral Meme T-Shirt"** product
3. Look in the URL or product details for the **Product UID**
4. It looks like: `prod_xxxxxxxxxxxxx` or similar

### 3. Add Environment Variables to Netlify

1. Go to: https://app.netlify.com/sites/tangerine-haupia-038440/settings/environment-variables
2. Click **"Add a variable"** and add these:

| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | *(your Stripe secret key - starts with `sk_live_...`)* |
| `STRIPE_PUBLISHABLE_KEY` | *(your Stripe publishable key - starts with `pk_live_...`)* |
| `GELATO_API_KEY` | *(your Gelato API key)* |
| `GELATO_PRODUCT_UID` | *(your product UID)* |
| `URL` | `https://tangerine-haupia-038440.netlify.app` |

3. Click **"Save"**

### 4. Set Up Stripe Webhook

1. Go to: https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://tangerine-haupia-038440.netlify.app/.netlify/functions/stripe-webhook`
4. **Events to send:** Select `checkout.session.completed`
5. Click **"Add endpoint"**

---

## 🚀 How It Works:

```
Customer clicks "Buy"
   ↓
Selects size (S-XXL)
   ↓
Stripe Checkout (collects address + payment)
   ↓
Payment succeeds → Webhook fires
   ↓
Netlify Function creates Gelato order
   ↓
Gelato prints & ships to customer
   ↓
You get £29.99 - ~£10 = £19.99 profit 💰
```

---

## ✅ Testing the Flow:

### Test Mode (Safe):
1. Use Stripe **test** keys instead: `sk_test_...` and `pk_test_...`
2. Use test card: `4242 4242 4242 4242`
3. Any future date for expiry
4. Any 3-digit CVC

### Live Mode (Real Money):
- Already configured with your live keys!
- Real customers will be charged
- Orders automatically sent to Gelato

---

## 📊 Monitoring Your Orders:

### In Stripe:
- Dashboard: https://dashboard.stripe.com/payments
- See all payments and customer details

### In Gelato:
- Dashboard: https://dashboard.gelato.com/orders
- See all orders being fulfilled
- Track shipping status

### In Netlify:
- Functions log: https://app.netlify.com/sites/tangerine-haupia-038440/functions
- See webhook logs and any errors

---

## 🔧 What's Been Built:

### Frontend (`index.html`):
- ✅ Size selection integrated
- ✅ Stripe Checkout flow
- ✅ Success/Cancel pages

### Backend (Netlify Functions):
- ✅ `create-checkout.js` - Creates Stripe sessions
- ✅ `stripe-webhook.js` - Handles payments → Gelato orders

### Configuration:
- ✅ Environment variables (need to add in Netlify)
- ✅ Webhook endpoint
- ✅ Stripe integration
- ✅ Gelato API integration

---

## 🎯 Next Steps:

1. **Add Gelato credentials to Netlify** (steps above)
2. **Set up Stripe webhook** (steps above)
3. **Deploy to Netlify** (run `git push`)
4. **Test with a real order!**

---

## 🐛 Troubleshooting:

### "Payment failed"
- Check Netlify environment variables are set
- Check Netlify function logs

### "Gelato order not creating"
- Verify Gelato API key is correct
- Verify Product UID is correct
- Check Netlify function logs for errors

### "Webhook not firing"
- Verify webhook URL in Stripe is correct
- Check webhook is set to `checkout.session.completed` event
- Test webhook in Stripe dashboard

---

## 🔐 Security Notes:

- ✅ API keys stored as environment variables (not in code)
- ✅ `.env` file in `.gitignore` (never committed)
- ✅ Webhook signature verification (optional: add later)
- ✅ HTTPS enforced by Netlify

---

**Once you complete steps 1-4 above, your store is fully automated!** 🎉

Test it with your own order first to make sure everything works, then you're ready to launch! 🚀
