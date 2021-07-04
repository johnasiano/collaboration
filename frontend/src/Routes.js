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

import {
    LeftSidebar as UserLeftSidebar,
    MinimalLayout as UserMinimalLayout,
} from './layout-blueprints-user';

import LadingMainLayout from 'pages/Layout/Main';

// Example Pages

import HomePage from 'pages/HomePage';
import { StripeSuccessPage } from 'pages/NoDom';
import UserPagesLogin from 'pages/PagesLogin/PagesLoginContent';
import UserPagesRegister from 'pages/PagesRegister/PagesRegisterContent';
import PagesRecoverPassword from './example-pages/PagesRecoverPassword';
import PagesError404 from './example-pages/PagesError404';
import PagesError500 from './example-pages/PagesError500';
import PagesError505 from './example-pages/PagesError505';
import Login from 'my-pages-admin/PagesLogin';

const Cards1 = lazy(() => import('./example-pages/Cards1'));

// User Pages
const UserDashboard = lazy(() => import('my-pages-user/Dashboard'));
const UserContest = lazy(() => import('my-pages-user/Contest'));
const Membership = lazy(() => import('my-pages-user/Membership'));
const MembershipSuccess = lazy(() => import('my-pages-user/MembershipSuccess'));

// Admin Pages
const AdminPagesLogin = lazy(() => import('my-pages-admin/PagesLogin'));
const AdminDashboard = lazy(() => import('my-pages-admin/Dashboard'));

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
                            '/user/login',
                            '/user/register',
                            '/errors/error-401',
                            '/errors/error-404',
                            '/errors/error-500'
                        ]}>   
                        <UserMinimalLayout>
                            <Switch location={location} key={location.pathname}>
                                <motion.div
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <Route path="/user/login" component={UserPagesLogin} />
                                    <Route path="/user/register" component={UserPagesRegister} />
                                    <Route path="/errors/error-401" component={PagesError404} />
                                    <Route path="/errors/error-404" component={PagesError500} />
                                    <Route path="/errors/error-500" component={PagesError505} />
                                </motion.div>
                            </Switch>
                        </UserMinimalLayout>                     
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
                            '/home',
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
                            '/admin/dashboard'
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
                                </motion.div>
                            </Switch>
                        </AdminLeftSidebar>
                    </Route>
                    <Route
                        path={[
                            '/user/dashboard',
                            '/user/contest',
                            '/user/membership',
                            '/payment/success',
                        ]}
                    >
                        <UserLeftSidebar>
                            <Switch location={location} key={location.pathname}>
                                <motion.div
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}>
                                    <Route
                                        path="/user/dashboard"
                                        component={UserDashboard}
                                    />
                                    <Route
                                        path="/user/contest"
                                        component={UserContest}
                                    />
                                    <Route
                                        path="/user/membership"
                                        component={Membership}
                                    />  
                                    <Route
                                        path="/payment/success"
                                        component={MembershipSuccess}
                                    />                                      
                                </motion.div>
                            </Switch>
                        </UserLeftSidebar>
                    </Route>
                </Switch>
                </Suspense>
            </AnimatePresence>
        </ThemeProvider>
  );
};

export default Routes;
