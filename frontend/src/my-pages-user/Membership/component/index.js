import React, { Fragment, useState, useEffect } from 'react';

import { Grid, Container, ButtonGroup, Card, Button } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import * as StripeService from 'services/stripe.service';
import { storageUserKey } from "utils/constants";
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment';

const stripePromise = loadStripe('pk_test_51J1AKiBTewu70IwysHyusGzgrESeBujmCzNermAeJuUnZKfe1YiZm0WnZDHlKYwXTCTYwtPetxkfjKiqNgDzpFFl00VIdYZmYn');

const Membership = () => {

  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(()=>{

    const current_user = JSON.parse(localStorage.getItem(storageUserKey));

    StripeService.findTransaction(current_user.user.id).then(result=>{      
      if (result.success) {
        setCurrentPlan({
          date: result.date,
          price: result.price,
          paymentId: result.paymentId
        })
      } 
    })
  }, [])

  const handleMonthSubscribeClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    // const response = await fetch('/create-checkout-session', { method: 'POST' });
    const priceIdType = "month";
    StripeService.subscriptionCheckoutSession(priceIdType).then(async data=>{
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      }).then(result=>{
        if (result.error) {
          console.log('subscription error', result.error.message);
        }
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    })
  };

  const handleAnnualSubscribeClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    // const response = await fetch('/create-checkout-session', { method: 'POST' });
    const priceIdType = "annual";
    StripeService.subscriptionCheckoutSession(priceIdType).then(async data=>{
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      }).then(result=>{
        if (result.error) {
          console.log('subscription error', result.error.message);
        }
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    })
  };

  const handleCustomerPortalClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const paramter = {
      sessionId: currentPlan.paymentId
    }
    console.log('sessionId', currentPlan.paymentId);
    // Call your backend to create the Checkout Session
    // const response = await fetch('/create-checkout-session', { method: 'POST' });
    StripeService.customerPortal(paramter).then(async data=>{
      // When the customer clicks on the button, redirect them to Checkout.
      window.location.href = data.url;
    })
  };

  return (
    <Fragment>
      <div className="bg-light py-3 py-xl-5">
        <Container className="py-3 py-xl-5">
          <div className="d-block d-xl-flex mb-4 justify-content-between">
            <div>
              <h1 className="display-3 text-dark mb-2 font-weight-bold">
                All Sports Access
              </h1>
              <p className="font-size-lg text-black">
                Includes up to date player prop lines, allowing you to look at the player's relavent data with respect to the line.
              </p>
            </div>
          </div>
          {
            currentPlan?
              currentPlan.price===1999?
                <Grid container spacing={4} className="d-flex align-items-center justify-content-center mt-5">
                  <Grid item xs={12} md={6} lg={4}>
                    <Card className="mb-4 card-box-hover-rise card-box-hover">
                      <div className="card-body px-4 pb-4 pt-3 text-center">
                        <h3 className="display-4 my-3 font-weight-bold text-dark">
                          Standard
                        </h3>
                        <span className="display-2 font-weight-bold">
                          <small className="font-size-lg">$</small>
                          19.99
                        </span>
                        <p className="text-black-50 mb-0">
                          Monthly Plan
                        </p>
                        <div className="d-flex flex-column text-black-50 mt-4">
                          <div className="d-flex flex-row justify-content-center align-items-center">
                            <CheckIcon style={{color:'green'}} />
                            <p className="mb-0" style={{color:'green', fontSize:'15px'}}>
                              Selected Plan
                            </p>
                          </div>
                          <p className="text-black-50 mb-0">
                              Starts on {currentPlan.date}
                          </p>
                        </div>
                        <Button
                          color="secondary"
                          size="large"
                          variant="outlined"
                          className="font-weight-bold text-uppercase my-4"
                          onClick={handleCustomerPortalClick}
                        >
                          Manage Plan
                        </Button>
                        <ul className="list-unstyled text-left mb-3 font-weight-bold font-size-sm">
                          <li className="px-4 py-2">
                            <span className="badge-circle-inner mr-2 badge badge-success">
                              Success
                            </span>
                            Unlimited Tasks
                          </li>
                          <li className="px-4 py-2">
                            <span className="badge-circle-inner mr-2 badge badge-success">
                              Success
                            </span>
                            Unlimited Teams
                          </li>
                          <li className="px-4 py-2">
                            <span className="badge-circle-inner mr-2 badge badge-success">
                              Success
                            </span>
                            All Integrations
                          </li>
                          <li className="px-4 py-2 text-black-50">
                            <span className="badge-circle-inner mr-2 badge badge-danger">
                              Danger
                            </span>
                            Premium support
                          </li>
                        </ul>
                      </div>
                    </Card>
                  </Grid> 
                </Grid>
              :
              <Grid container spacing={4} className="d-flex align-items-center justify-content-center mt-5">
                <Grid item xs={12} md={6} lg={4}>
                  <Card className="mb-4 card-box-hover-rise card-box-hover">
                    <div className="card-body px-4 pb-4 pt-3 text-center">
                      <h3 className="display-4 my-3 font-weight-bold text-dark">
                        Enterprise
                      </h3>
                      <span className="display-2 font-weight-bold">
                        <small className="font-size-lg">$</small>
                        199.99
                      </span>
                      <p className="text-black-50 mb-0">
                        Annual Plan
                      </p>
                      <div className="d-flex flex-column text-black-50 mt-4">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                          <CheckIcon style={{color:'green'}} />
                          <p className="mb-0" style={{color:'green', fontSize:'15px'}}>
                            Selected Plan
                          </p>
                        </div>
                        <p className="text-black-50 mb-0">
                            Starts on {currentPlan.date}
                        </p>
                      </div>
                      <Button
                        color="secondary"
                        size="large"
                        variant="outlined"
                        className="font-weight-bold text-uppercase my-4"
                        onClick={handleCustomerPortalClick}
                      >
                        Manage Plan
                      </Button>
                      <ul className="list-unstyled text-left mb-3 font-weight-bold font-size-sm">
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          Unlimited Tasks
                        </li>
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          Unlimited Teams
                        </li>
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          All Integrations
                        </li>
                        <li className="px-4 py-2 text-black-50">
                          <span className="badge-circle-inner mr-2 badge badge-danger">
                            Danger
                          </span>
                          Premium support
                        </li>
                      </ul>
                    </div>
                  </Card>
                </Grid>
              </Grid>
              :
              <Grid container spacing={4} className="d-flex align-items-center justify-content-center mt-5">
                <Grid item xs={12} md={6} lg={4}>
                  <Card className="mb-4 card-box-hover-rise card-box-hover">
                    <div className="card-body px-4 pb-4 pt-3 text-center">
                      <h3 className="display-4 my-3 font-weight-bold text-dark">
                        Standard
                      </h3>
                      <span className="display-2 font-weight-bold">
                        <small className="font-size-lg">$</small>
                        19.99
                      </span>
                      <p className="text-black-50 mb-0">
                        Monthly Plan
                      </p>
                      <Button
                        color="secondary"
                        size="large"
                        variant="outlined"
                        className="font-weight-bold text-uppercase my-4"
                        onClick={handleMonthSubscribeClick}
                      >
                        Get Monthly Access
                      </Button>
                      <ul className="list-unstyled text-left mb-3 font-weight-bold font-size-sm">
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          Unlimited Tasks
                        </li>
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          Unlimited Teams
                        </li>
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          All Integrations
                        </li>
                        <li className="px-4 py-2 text-black-50">
                          <span className="badge-circle-inner mr-2 badge badge-danger">
                            Danger
                          </span>
                          Premium support
                        </li>
                      </ul>
                    </div>
                  </Card>
                </Grid>            
                <Grid item xs={12} md={6} lg={4}>
                  <Card className="mb-4 card-box-hover-rise card-box-hover">
                    <div className="card-body px-4 pb-4 pt-3 text-center">
                      <h3 className="display-4 my-3 font-weight-bold text-dark">
                        Enterprise
                      </h3>
                      <span className="display-2 font-weight-bold">
                        <small className="font-size-lg">$</small>
                        199.99
                      </span>
                      <p className="text-black-50 mb-0">
                        Annual Plan
                      </p>
                      <Button
                        color="secondary"
                        size="large"
                        variant="outlined"
                        className="font-weight-bold text-uppercase my-4"
                        onClick={handleAnnualSubscribeClick}
                      >
                        Get Annual Access
                      </Button>
                      <ul className="list-unstyled text-left mb-3 font-weight-bold font-size-sm">
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          Unlimited Tasks
                        </li>
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          Unlimited Teams
                        </li>
                        <li className="px-4 py-2">
                          <span className="badge-circle-inner mr-2 badge badge-success">
                            Success
                          </span>
                          All Integrations
                        </li>
                        <li className="px-4 py-2 text-black-50">
                          <span className="badge-circle-inner mr-2 badge badge-danger">
                            Danger
                          </span>
                          Premium support
                        </li>
                      </ul>
                    </div>
                  </Card>
                </Grid>
              </Grid>
          }          
        </Container>
      </div>
    </Fragment>
  );
}

export default Membership;