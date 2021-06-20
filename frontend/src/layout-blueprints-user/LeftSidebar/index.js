import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { connect } from 'react-redux';

import { Sidebar, Header, Footer, ThemeConfigurator } from '../../layout-components-user';
import * as CategoryService from 'services/category.service';
import * as UserService from 'services/user.service';
import * as ProductService from 'services/product.service';

import { storageUserKey } from "utils/constants";
import {login} from 'store/modules/auth/actions';
import { useDispatch } from 'react-redux';
import {setCategory, setProducts} from 'store/modules/search/actions';
import {setUsers} from 'store/modules/users/actions';
import useRouter from 'utils/useRouter';

const LeftSidebar = props => {
  const {
    children,
    sidebarToggle,
    sidebarFixed,
    footerFixed,
    contentBackground
  } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(()=>{
    const current_user = JSON.parse(localStorage.getItem(storageUserKey));
    if (current_user) {
      dispatch(login({
        user: current_user.user,
        accessToken: current_user.accessToken,
        isAdmin: false
      }));
    } else {
      router.history.push('/user/login');
    }
  }, [])

  return (
    <Fragment>
      <div className={clsx('app-wrapper', contentBackground)}>
        <Header />
        <div
          className={clsx('app-main', {
            'app-main-sidebar-static': !sidebarFixed
          })}>
          <Sidebar />
          <div
            className={clsx('app-content', {
              'app-content-sidebar-collapsed': sidebarToggle,
              'app-content-sidebar-fixed': sidebarFixed,
              'app-content-footer-fixed': footerFixed
            })}>
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
            <Footer />
          </div>
          <ThemeConfigurator />
        </div>
      </div>
    </Fragment>
  );
};

LeftSidebar.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarFixed: state.ThemeOptions.sidebarFixed,

  headerFixed: state.ThemeOptions.headerFixed,
  headerSearchHover: state.ThemeOptions.headerSearchHover,
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

  footerFixed: state.ThemeOptions.footerFixed,

  contentBackground: state.ThemeOptions.contentBackground
});

export default connect(mapStateToProps)(LeftSidebar);
