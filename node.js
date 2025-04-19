const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const app = express();
const cors = require('cors');

// Allow CORS for local development
app.use(cors());

// Endpoint to create Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd', // Your currency
                        product_data: {
                            name: 'Product Name',  // Replace with cart details
                        },
                        unit_amount: 1000, // Amount in cents (e.g., 1000 = $10.00)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/success.html`,
            cancel_url: `${req.headers.origin}/cancel.html`,
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
