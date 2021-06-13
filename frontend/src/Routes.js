import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import { ClimbingBoxLoader } from 'react-spinners';

import MuiTheme from './theme';

import { createBrowserHistory } from 'history';

// Layout Blueprints

import {
    LeftSidebar as AdminLeftSidebar,
    MinimalLayout as AdminMinimalLayout,
} from './layout-blueprints-admin';

import LadingMainLayout from 'pages/Layout/Main';

// Example Pages

import HomePage from 'pages/HomePage';
import { StripeSuccessPage } from 'pages/NoDom';
import PagesLogin from './example-pages/PagesLogin';
import PagesRegister from './example-pages/PagesRegister';
import PagesRecoverPassword from './example-pages/PagesRecoverPassword';
import PagesError404 from './example-pages/PagesError404';
import PagesError500 from './example-pages/PagesError500';
import PagesError505 from './example-pages/PagesError505';

const Cards1 = lazy(() => import('./example-pages/Cards1'));

// Admin Pages
const AdminPagesLogin = lazy(() => import('my-pages-admin/PagesLogin'));
const AdminDashboard = lazy(() => import('my-pages-admin/Dashboard'));
const Customers = lazy(() => import('my-pages-admin/Customers'));
const Orders = lazy(() => import('my-pages-admin/Orders'));
const PromoCodeValue = lazy(() => import('my-pages-admin/PromoCode/PromoCodeValue'));
const PromoCodeDate = lazy(() => import('my-pages-admin/PromoCode/PromoCodeDate'));
const PromoCodeShipping = lazy(() => import('my-pages-admin/PromoCode/PromoCodeShipping'));
const AdminUsers = lazy(() => import('my-pages-admin/AdminUsers'));
const RefundPolicy = lazy(() => import('my-pages-admin/RefundPolicy'));
const PrivacyPolicy = lazy(() => import('my-pages-admin/PrivacyPolicy'));
const TermsOfService = lazy(() => import('my-pages-admin/TermsOfService'));
const ContactUs = lazy(() => import('my-pages-admin/ContactUs'));
const BuyListPDF = lazy(() => import('my-pages-admin/BuyListPDF'));
const CheckOutBanner = lazy(() => import('my-pages-admin/CheckOutBanner'));
const MonsterBack = lazy(() => import('my-pages-admin/MonsterBack'));
const LatestRelease = lazy(() => import('my-pages-admin/LatestRelease'));
const SideBarBackground = lazy(() => import('my-pages-admin/SideBarBackground'));
const HomePageBanner = lazy(() => import('my-pages-admin/HomePageBanner'));
const KickBack = lazy(() => import('my-pages-admin/KickBack'));
const HomePopup = lazy(() => import('my-pages-admin/HomePopup'));
const FreePack = lazy(() => import('my-pages-admin/FreePack'));
const DealOfTheWeek = lazy(() => import('my-pages-admin/DealOfTheWeek'));

const history = createBrowserHistory();

const Routes = () => {
    const location = useLocation();
  
    const pageVariants = {
      initial: {
        opacity: 0,
        scale: 0.99
      },
      in: {
        opacity: 1,
        scale: 1
      },
      out: {
        opacity: 0,
        scale: 1.01
      }
    };
  
    const pageTransition = {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.4
    };
  
    const SuspenseLoading = () => {
      return (
        <Fragment>
          <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
            <div className="d-flex align-items-center flex-column px-4">
              <ClimbingBoxLoader color={'#5383ff'} loading={true} />
            </div>
            <div className="text-muted font-size-xl text-center pt-3">
              Please wait while load
              {/* <span className="font-size-lg d-block text-dark">
                This live preview instance can be slower than a real production
                build!
              </span> */}
            </div>
          </div>
        </Fragment>
      );
    };
    return (
        <ThemeProvider theme={MuiTheme}>
            <AnimatePresence>
                <Suspense fallback={<SuspenseLoading />}>
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route
                        path={[
                            '/home',
                            '/payment/success',
                            '/link1',
                            '/link2',
                            '/link3',
                            '/link4',
                        ]}>
                        <LadingMainLayout>
                            <Switch location={location} key={location.pathname}>
                                <motion.div
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}>
                                        <Route path="/home" component={HomePage} />
                                        <Route path="/payment/success" component={StripeSuccessPage} />
                                        {/* <Route path="/link1" component={PagesRegister} />
                                        <Route
                                            path="/link2"
                                            component={PagesRecoverPassword}
                                        />
                                        <Route path="/link3" component={PagesError404} />
                                        <Route path="/link4" component={PagesError500} /> */}
                                </motion.div>
                            </Switch>
                        </LadingMainLayout>
                        </Route>
                    <Route
                        path={[
                            '/admin/auth/login',
                            '/errors/error-401',
                            '/errors/error-404',
                            '/errors/error-500'
                        ]}>   
                        <AdminMinimalLayout>
                            <Switch location={location} key={location.pathname}>
                                <motion.div
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <Route path="/admin/auth/login" component={AdminPagesLogin} />
                                    <Route path="/errors/error-401" component={PagesError404} />
                                    <Route path="/errors/error-404" component={PagesError500} />
                                    <Route path="/errors/error-500" component={PagesError505} />
                                </motion.div>
                            </Switch>
                        </AdminMinimalLayout>                     
                    </Route>
                    <Route
                        path={[
                            '/admin/dashboard', 
                            '/admin/home/preorder',
                            '/admin/home/dealweek',
                            '/admin/home/freepack',
                            '/admin/home/popup',
                            '/admin/home/kickback',
                            '/admin/home/pagebanner',
                            '/admin/home/sidebacback',
                            '/admin/home/latest-release',
                            '/admin/home/monster-back',
                            '/admin/checkout',
                            '/admin/buy-list',
                            '/admin/contactus',
                            '/admin/terms-service',
                            '/admin/privacy-policy',
                            '/admin/refund-policy',
                            '/admin/orders',
                            '/admin/customers',
                            '/admin/promovalue',
                            '/admin/promoshipping',
                            '/admin/promodate',
                            '/admin/users'
                        ]}
                    >
                        <AdminLeftSidebar>
                            <Switch location={location} key={location.pathname}>
                                <motion.div
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}>
                                    <Route
                                        path="/admin/dashboard"
                                        component={AdminDashboard}
                                    /> 
                                    <Route
                                        path="/admin/home/preorder"
                                        component={AdminDashboard}
                                    /> 
                                    <Route
                                        path="/admin/home/dealweek"
                                        component={DealOfTheWeek}
                                    /> 
                                    <Route
                                        path="/admin/home/freepack"
                                        component={FreePack}
                                    /> 
                                    <Route
                                        path="/admin/home/popup"
                                        component={HomePopup}
                                    /> 
                                    <Route
                                        path="/admin/home/kickback"
                                        component={KickBack}
                                    /> 
                                    <Route
                                        path="/admin/home/pagebanner"
                                        component={HomePageBanner}
                                    /> 
                                    <Route
                                        path="/admin/home/sidebacback"
                                        component={SideBarBackground}
                                    /> 
                                    <Route
                                        path="/admin/home/latest-release"
                                        component={LatestRelease}
                                    /> 
                                    <Route
                                        path="/admin/home/monster-back"
                                        component={MonsterBack}
                                    /> 
                                    <Route
                                        path="/admin/checkout"
                                        component={CheckOutBanner}
                                    /> 
                                    <Route
                                        path="/admin/buy-list"
                                        component={BuyListPDF}
                                    />  
                                    <Route
                                        path="/admin/contactus"
                                        component={ContactUs}
                                    />  
                                    <Route
                                        path="/admin/terms-service"
                                        component={TermsOfService}
                                    />  
                                    <Route
                                        path="/admin/privacy-policy"
                                        component={PrivacyPolicy}
                                    />  
                                    <Route
                                        path="/admin/refund-policy"
                                        component={RefundPolicy}
                                    />                                                                       
                                    <Route
                                        path="/admin/orders"
                                        component={Orders}
                                    />  
                                    <Route
                                        path="/admin/customers"
                                        component={Customers}
                                    />  
                                    <Route
                                        path="/admin/promovalue"
                                        component={PromoCodeValue}
                                    />
                                    <Route
                                        path="/admin/promoshipping"
                                        component={PromoCodeShipping}
                                    />  
                                    <Route
                                        path="/admin/promodate"
                                        component={PromoCodeDate}
                                    />  
                                    <Route
                                        path="/admin/users"
                                        component={AdminUsers}
                                    />  
                                </motion.div>
                            </Switch>
                        </AdminLeftSidebar>
                    </Route>
                </Switch>
                </Suspense>
            </AnimatePresence>
        </ThemeProvider>
  );
};

export default Routes;
