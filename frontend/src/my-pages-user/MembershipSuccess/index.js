import React, { Fragment, useEffect, useState } from 'react';

import { Grid, Container, Button } from '@material-ui/core';
import { useLocation, BrowserRouter as Router } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import * as StripeService from 'services/stripe.service';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { storageUserKey } from "utils/constants";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MembershipSuccess = () => {

  const [processing, setProcessing] = useState(false);
  const [ session, setSession ] = useState(null);
  const [ success, setSuccess] = useState(true);
  let query = useQuery();
  const session_id = query.get('session_id');

  if (!processing) {
    setProcessing(true);

    StripeService.payCheck(session_id).then(data=>{
        // When the customer clicks on the button, redirect them to Checkout.
        console.log('session', data);

        const current_user = JSON.parse(localStorage.getItem(storageUserKey));

        const paramter = {
          userId: current_user.user.id,
          session: data
        }
        
        StripeService.stripeSuccess(paramter).then(result=>{
          if (result.success) {
            setSession(result.transaction_number);
            setSuccess(true);
          } else {
            setSession(result.message)
            setSuccess(false);
          }
        })
    });
  }
  
  return (
    <Fragment>
      <div className="bg-light py-3 py-xl-5">
        <Container className="py-3 py-xl-5">
          {
            session?
              <div className="d-flex flex-column mb-4 justify-content-center">
                {
                  success&&
                    <div className="d-flex justify-content-center">
                      <CheckCircleIcon style={{fontSize:'140px', color:'green'}} />
                    </div>
                }
                <div>
                  <p className="font-size-lg text-black" style={{textAlign:'center'}}>
                    {session}
                  </p>
                </div>
                {
                  success&&
                    <div>
                      <div>
                        <h1 className="display-3 text-black mb-2 font-weight-bold mt-5" style={{textAlign:'center'}}>
                          Thank you!
                        </h1>
                      </div>
                      <div>
                        <p className="font-size-lg text-black" style={{textAlign:'center'}}>
                          Thanks for being awesome, we hope you enjoy your purchase!
                        </p>
                      </div> 
                    </div> 
                }        
              </div>:
              <div className="d-flex flex-column mb-4 justify-content-center">
                <div>
                  <p className="font-size-lg text-black" style={{textAlign:'center'}}>
                    Loading...
                  </p>
                </div>  
              </div>
          }
        </Container>
      </div>
    </Fragment>
  );
}

export default MembershipSuccess;