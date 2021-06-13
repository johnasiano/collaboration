var router = require('express').Router();
var { celebrate } = require('celebrate');
const db = require('../models');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

router.post('/subscriptions/create-checkout-session', async (req, res, next) => {
    const { priceIdType } = req.body;

    const PRICE_ID_MONTH = process.env.PRICE_ID_MONTH;
    const PRICE_ID_ANNUALLY = process.env.PRICE_ID_ANNUALLY;
    const domainURL = process.env.DOMAIN;

    const priceId = priceIdType === 'month' ? PRICE_ID_MONTH: PRICE_ID_ANNUALLY;
    // See https://stripe.com/docs/api/checkout/sessions/create
    // for additional parameters to pass.
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    // For metered billing, do not pass quantity
                    quantity: 1,
                },
            ],
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: `${domainURL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL}/payment/canceled`,
        });

        res.send({
            sessionId: session.id,
        });
    } catch (e) {
        res.status(400);
        return res.send({
        error: {
            message: e.message,
        }
        });
    }
});

router.get("/checkout-session", async (req, res, next) => {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
});

router.post('/customers/create', async (req, res, next) => {
  try {
    console.log('stripe customers create');
    
    res.json({
        state: 'success',
        message: 'stripe customers create'
    })
  } catch (error) {
    next(error);
  }
})

router.post('/subscriptions/create', async (req, res, next) => {
    try {
      console.log('stripe subscriptions create');
      
      res.json({
          state: 'success',
          message: 'stripe subscription create'
      })
    } catch (error) {
      next(error);
    }
})

module.exports = router;
