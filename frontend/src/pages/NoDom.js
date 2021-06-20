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