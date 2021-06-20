var router = require('express').Router();
var { celebrate } = require('celebrate');
const db = require('../models');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get("/setup", (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      monthlyPrice: process.env.PRICE_ID_MONTH,
      annualPrice: process.env.PRICE_ID_ANNUALLY,
    });
});

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
            cancel_url: `${domainURL}/user/membership`,
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

router.post('/success', async (req, res, next) => {
    try {
        const { userId, session } = req.body;
        
        const existTransaction = await db.transactions.findOne({
            where: {
              paymentId: session.id
            }
        })

        if (!existTransaction) {
            const userTransaction = await db.transactions.findOne({
                where: {
                    userId: userId
                }
            })
            if (userTransaction) {
                // const subscription = await stripe.subscriptions.retrieve(
                //     'sub_EumryG6ET09pUy'
                // );
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription
                );
                const price = subscription.items.data[0].plan.amount;
                
                // const date = new Date(subscription.created);
                const timestamp = subscription.created*1000;
                const date = new Date(timestamp);
        
                const transaction = await db.transactions.update({
                    type: subscription.object,
                    price: price,
                    content: subscription,
                    date: date,
                    email: session.customer_details.email,
                    paymentId: session.id
                  }, {
                    where: {
                        userId: userId
                    }
                })
                
                res.json({
                    success: true,
                    transaction_number: subscription.id,  
                });
            } else {
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription
                );
                const price = subscription.items.data[0].plan.amount;
                
                // const date = new Date(subscription.created);
                const timestamp = subscription.created*1000;
                const date = new Date(timestamp);

                const transaction = await db.transactions.create({
                    userId: userId,
                    type: subscription.object,
                    price: price,
                    content: subscription,
                    date: date,
                    email: session.customer_details.email,
                    paymentId: session.id
                });
                res.json({
                    success: true,
                    transaction_number: subscription.id
                });
            }            
        } else {
            res.json({
                success: false,
                message: 'Sorry, already exist payment',  
            });
        }
    } catch (error) {
        next(error);
    }
})

router.get("/transactions/find", async (req, res, next) => {
    const { userId } = req.query;
    const existTransaction = await db.transactions.findOne({
        where: {
            userId: userId
        }
    })

    if (existTransaction) {
        const sessionId = existTransaction.paymentId;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription
        );
        const price = subscription.items.data[0].plan.amount;
        
        // const date = new Date(1623429991);

        const timestamp = subscription.created*1000;
        const date = new Date(timestamp);

        const transaction = await db.transactions.update({
            type: subscription.object,
            price: price,
            content: subscription,
            date: date,
            email: session.customer_details.email,
            paymentId: session.id
          }, {
            where: {
                userId: userId
            }
        })

        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const day = date.getDate();
        
        res.json({
            success: true,
            date: `${month}/${day}/${year}`,
            price: price,
            paymentId: session.id,
            subscription: subscription
        });
    } else {
        res.json({
            success: false,
            message: 'Sorry, Can not find transaction.',  
        });
    }
});

router.post('/customer-portal', async (req, res) => {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { sessionId } = req.body;
    console.log('sessionID', sessionId);
    const checkoutsession = await stripe.checkout.sessions.retrieve(sessionId);
  
    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const domainURL = process.env.DOMAIN;
  
    const portalsession = await stripe.billingPortal.sessions.create({
      customer: checkoutsession.customer,
      return_url: `${domainURL}/user/membership/`
    });
  
    res.send({
      url: portalsession.url,
    });
});

module.exports = router;
