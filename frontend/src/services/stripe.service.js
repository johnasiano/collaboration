import * as request from "./request.service"

export const stripeSetup = (sessionId) => {
    return request.get(`/api/stripe/setup`);
}

export const subscriptionCheckoutSession = (priceIdType) => {
    return request.post('/api/stripe/subscriptions/create-checkout-session',
        { priceIdType });
}

export const payCheck = (sessionId) => {
    return request.get(`/api/stripe/checkout-session?sessionId=${sessionId}`);
}

export const stripeSuccess = (stripe_parameter) => {
    return request.post(`/api/stripe/success`, stripe_parameter);
}

export const findTransaction = (userId) => {
    return request.get(`/api/stripe/transactions/find?userId=${userId}`);
}

export const customerPortal = (sessionId) => {
    return request.post(`/api/stripe/customer-portal`, sessionId);
}
// export const paypalSuccess = (paypal_parameter, user_check) => {
//     if (user_check=='login') {
//         return request.post(`/api/paypal/success`, paypal_parameter);
//     }

//     if (user_check=='guest') {
//         return request.guest_post(`/api/paypal/success`, paypal_parameter);
//     }    
// }

// export const paypalExpressSuccess = (detail, user_check) => {
//     if (user_check=='login') {
//         return request.post(`/api/paypal/express/success`, {detail});
//     }

//     if (user_check=='guest') {
//         return request.guest_post(`/api/paypal/express/success`, {detail});
//     }    
// }
