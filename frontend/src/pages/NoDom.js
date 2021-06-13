import React, { useState } from 'react';
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import * as StripeService from 'services/stripe.service';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
export const StripeSuccessPage = () => {
  
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [ session, setSession ] = useState('null');
    let query = useQuery();
    const session_id = query.get('session_id');

    StripeService.payCheck(session_id).then(data=>{
        // When the customer clicks on the button, redirect them to Checkout.
        // const result = data.session;
        var sessionJSON = JSON.stringify(data);
        setSession(sessionJSON);
        setSuccess(true);
        console.log('session', data);
    });
    // const dispatch = useDispatch();
  
    // let queryString = props.location.search || props.location.hash;
    // if (queryString[0] === '#' || queryString[0] === '?') queryString = queryString.substring(1);
    
    // const parsed = queryString.parse(location.search);
    // const parsed = queryStringLib.parse(props.location.search);
  
    // // dispatch(setLoadingStatus(true));
  
    // if (!processing) {
    //   console.log("login-user: queryString", queryString);
    //   setProcessing(true);
  
    //   PaypalService.payCheck(queryString, 'login').then(payCheckRes => {
    //     if (payCheckRes.state) {
    //       const checkOutResult = JSON.parse(localStorage.getItem(storageCheckOutKey));
  
    //       const paypalParameter = {
    //         payment: payCheckRes.payment,
    //         paymentId: payCheckRes.paymentId,
    //         contactEmail: checkOutResult.contactEmail,
    //         billAddress: checkOutResult.billAddress
    //       }
  
    //       PaypalService.paypalSuccess(paypalParameter, 'login').then(res => {      
    //         if (res.success) {
    //           const content = {
    //             transaction_number: res.transaction_number
    //           }
    //           ReportService.sendEmailPay(content).then((result)=>{
    //             console.log('Email sent!');          
    //           })
              
    //           if (props.user.userid != "#") { // recognize facebook connect
    //             // ManychatService.addTagByName('order_complete');
      
    //             const sendCredit = JSON.parse(localStorage.getItem('credit_data'));
    //             const kickbackUsed = sendCredit.kickbackPressed;
    //             if (kickbackUsed) {
    //                 // ManychatService.addTagByName('5%paid');
    //                 // ManychatService.addTagByName('5%kickbackused');
    //                 props.setKickbackEnabled(false);
    //             }
    //             const coder5Used = sendCredit.coder5Used;
    //             if (coder5Used) {
    //               props.setCoder5Enabled(false);
    //             }
    //             console.log('sendCredit', sendCredit)
    //             const transaction_number = localStorage.setItem('transaction_number', res.transaction_number);
    //             CreditService.setCredit(sendCredit).then((result) => {
    //               if (result.success) {
    //                 props.emptyCart();
    //                 // localStorage.removeItem('credit_data');
    //                 setTimeout(() => {
    //                   setSuccess(true);
    //                   console.log("PaypalSuccessPage success");
    //                   dispatch(setLoadingStatus(false));
    //                 }, 100);
    //               }
    //             })
    //           } else { // if user is regular account
    //             const sendCredit = JSON.parse(localStorage.getItem('credit_data'));
    //             const coder5Used = sendCredit.coder5Used;
    //             if (coder5Used) {
    //               props.setCoder5Enabled(false);
    //             }
    //             localStorage.setItem('transaction_number', res.transaction_number);      
    //             CreditService.setCredit(sendCredit).then((result) => {
    //               if (result.success) {
    //                 props.emptyCart();
    //                 // localStorage.removeItem('credit_data');
    //                 setTimeout(() => {
    //                   setSuccess(true);
    //                   console.log("PaypalSuccessPage success");
    //                   dispatch(setLoadingStatus(false));
    //                 }, 100);
    //               }
    //             })              
    //           }
    //         }
    //       })
    //     }
    //   })    
    // }
    // return success ? <Redirect to="/payment/success" /> : <div>Stripe page</div>
    return success ? 
        <div className="container" style={{padding:'100px', textAlign:'center', fontSize:'15px'}}>
            <p style={{width:'100%', overflow:'scroll'}}>
                {session}
            </p>
        </div>:
        <div className="container" style={{padding:'100px', textAlign:'center', fontSize:'50px'}}>
            <span style={{width:'100%', overflow:'scroll'}}>
                Loading...
            </span>
        </div>
}