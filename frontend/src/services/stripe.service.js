import * as request from "./request.service"

export const subscriptionCheckoutSession = (priceIdType) => {
    return request.post('/api/stripe/subscriptions/create-checkout-session',
        { priceIdType });
}

export const payCheck = (sessionId) => {
    return request.get(`/api/stripe/checkout-session?sessionId=${sessionId}`);
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
