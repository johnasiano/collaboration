import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import * as StripeService from 'services/stripe.service';

const stripePromise = loadStripe('pk_test_51J1AKiBTewu70IwysHyusGzgrESeBujmCzNermAeJuUnZKfe1YiZm0WnZDHlKYwXTCTYwtPetxkfjKiqNgDzpFFl00VIdYZmYn');

const Header = ({ isErrorPage }) => {
  const arrayPaths = ['/'];  

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const closeSearch = () => {
    setSearchOpen(false);
  }

  const handleSubscribeClick = async (event) => {
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

  return(
    <header className={`container site-header`}>
      <div className="site-header__links">
        <div>
          <span className="link">Link1</span>  
        </div>
        <div>
          <span className="link">Link2</span>  
        </div>
        <div>
          <span className="link">Link3</span>  
        </div>
        <div>
          <span className="link">Link4</span>  
        </div>
      </div>
      <div className="site-header__logo">
        <span className="logo">Trade</span>
      </div>
      <div className="site-header__login">
        <button type='button' className="trial-button" onClick={handleSubscribeClick}>Free Trial</button>
      </div>
    </header>
  )
};


export default Header;
