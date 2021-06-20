import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import * as StripeService from 'services/stripe.service';
import useRouter from 'utils/useRouter';
import { storageUserKey } from "utils/constants";
import {login} from 'store/modules/auth/actions';
import { useDispatch } from 'react-redux';

const Header = ({ isErrorPage }) => {
  const arrayPaths = ['/'];  

  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleSubscribeClick = (event) => {
    console.log('storage user key')
    const current_user = JSON.parse(localStorage.getItem(storageUserKey));
    if (current_user) {
      dispatch(login({
        user: current_user.user,
        accessToken: '',
        isAdmin: false
      }));
      router.history.push('/user/dashboard');
    } else {
      router.history.push('/user/login');
    }
  }

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
