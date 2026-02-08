# Gelato Print-on-Demand Setup Guide
## For Capsule 001 — "The Wildest Party"

---

## 📦 What You Need

### 1. Design Files (✅ Already Created)
- `export-design.html` - Tool to generate print-ready PNG
- `print-design.svg` - Vector source file
- Final export: `capsule-001-wildest-party-print-ready.png` (3600×2400px, 300 DPI)

### 2. Gelato Account
- Go to: https://www.gelato.com
- Sign up for a free account
- Choose "eCommerce Store" as your business type

---

## 🎨 Step 1: Export Your Design

1. **Open** `export-design.html` in your browser
2. **Click** "Generate Print-Ready PNG"
3. **Click** "Download PNG"
4. **Save** the file (it will be named `capsule-001-wildest-party-print-ready.png`)

---

## 🏭 Step 2: Create Product in Gelato

### A. Log into Gelato Dashboard
- Go to https://dashboard.gelato.com
- Navigate to **"Products"** → **"Create Product"**

### B. Choose Product Type
1. Select **"Apparel"**
2. Choose **"T-Shirt"**
3. Select your preferred brand:
   - **Gildan 5000** (Budget-friendly, heavyweight)
   - **Bella+Canvas 3001** (Premium, soft, retail quality) ← RECOMMENDED
   - **Stanley/Stella** (Eco-friendly, organic cotton)

### C. Configure T-Shirt
1. **Color:** White
2. **Sizes:** S, M, L, XL, XXL (enable all)
3. **Fit:** Unisex (standard) or choose specific

### D. Upload Design
1. Click **"Add Design"**
2. Upload your PNG file: `capsule-001-wildest-party-print-ready.png`
3. **Position the design:**
   - Placement: **Center Chest**
   - Width: **12 inches** (30.48 cm)
   - Height: **8 inches** (20.32 cm)
   - Distance from collar: **3-4 inches** (standard drop)

### E. Print Method
- Select **DTG (Direct to Garment)** printing
- This gives the best quality for detailed designs with fine text

### F. Review & Pricing
1. Check the mockup preview
2. Note the **base cost per unit** (typically £8-12 depending on brand)
3. Your selling price: **£29.99**
4. Your profit margin: **~£18-22 per shirt**

---

## 🔗 Step 3: Connect Gelato to Your Website

You have **2 options** for integration:

### Option A: Manual Order Processing (Simplest)
1. When someone buys via Stripe on your site
2. You receive payment
3. Log into Gelato and create order manually
4. Gelato prints & ships directly to customer
5. You keep the profit

**Pros:** Simple, no complex setup
**Cons:** Manual work for each order

### Option B: API Integration (Automated)
1. Use Gelato API to automatically create orders
2. When Stripe payment succeeds → trigger Gelato order
3. Requires webhook setup (I can help with this)

**Pros:** Fully automated
**Cons:** More technical setup required

---

## 📦 Step 4: Test Order

**IMPORTANT:** Order a sample first!

1. In Gelato, click **"Order Sample"**
2. Choose your address
3. Pay the base cost (£8-12)
4. Wait 3-7 days for delivery
5. **Check quality:**
   - Print clarity (especially the small text)
   - Color accuracy (black should be deep black)
   - T-shirt quality and fit
   - Wash test (wash it and check if print holds up)

---

## 💰 Step 5: Update Your Stripe Payment Link

Your current Stripe link: `https://buy.stripe.com/aFa3cncCbfO61Wg8AQ8EM00`

### If Using Manual Processing:
- Keep your current Stripe Payment Link
- No changes needed
- Just process Gelato orders manually when payments come in

### If Using API Integration:
- You'll need to switch to Stripe Checkout API
- Set up webhooks to trigger Gelato orders
- I can help you build this if needed

---

## 🚀 Step 6: Fulfillment Workflow

### When a Customer Orders:

1. **Customer clicks "Buy"** on your website
2. **Redirected to Stripe** checkout
3. **Customer enters details:**
   - Size selection
   - Shipping address
   - Payment info
4. **Stripe processes payment** → You receive £29.99
5. **You create Gelato order** (manual or auto)
6. **Gelato prints & ships** → Customer receives shirt in 3-10 days
7. **You keep profit** (£18-22)

---

## 📋 Important Settings in Gelato

### Shipping
- **Enable worldwide shipping** (Gelato handles this)
- Average delivery time: 3-10 business days
- Tracking provided automatically

### Branding (Optional)
- Add custom packing slip
- Include your brand name/logo
- Add thank you note

### Returns & Replacements
- Set up return policy in Gelato dashboard
- Gelato handles defective product replacement
- You handle customer service

---

## 🎯 Recommended Product Specs

Based on your design, here's what I recommend:

| Specification | Recommendation |
|---------------|----------------|
| **T-Shirt Brand** | Bella+Canvas 3001 (premium quality) |
| **Color** | White |
| **Print Method** | DTG (Direct to Garment) |
| **Design Size** | 12" × 8" (30.48 × 20.32 cm) |
| **Placement** | Center chest, 3.5" from collar |
| **Sizes** | S, M, L, XL, XXL |
| **Fit** | Unisex / Standard |

---

## ⚠️ Things to Watch Out For

1. **Text Legibility:**
   - Your design has small text (email details)
   - Make sure it's readable when printed
   - Order a sample to confirm!

2. **Color Matching:**
   - "Black" should be `#000000` or `#1a1a1a`
   - Test print to ensure it's dark enough

3. **Print Area Limits:**
   - Most DTG printers have a max print area
   - Your 12" × 8" design fits within standard limits

4. **Shipping Costs:**
   - You're offering "free shipping" at £29.99
   - Gelato shipping is included in base cost
   - Make sure your profit margin covers this

---

## 💡 Pro Tips

1. **Quality Check:** Always order samples before selling
2. **Sizing Guide:** Add a sizing chart to your website
3. **Mockups:** Use Gelato's mockup generator for marketing images
4. **Inventory:** No inventory needed - Gelato prints on demand
5. **Scaling:** Start with manual orders, automate later as volume grows

---

## 📞 Next Steps

1. ✅ **Export your design** using `export-design.html`
2. ✅ **Create Gelato account** at gelato.com
3. ✅ **Upload design** and configure product
4. ✅ **Order sample** for quality check
5. ✅ **Test the full workflow** (Stripe → Gelato)
6. ✅ **Launch your viral marketing** (once product is confirmed)

---

## 🆘 Need Help?

Let me know if you need assistance with:
- API integration for automated orders
- Webhook setup between Stripe and Gelato
- Custom fulfillment workflow
- Marketing strategy for launch

---

**Ready to print?** Let's get that sample ordered! 🚀
