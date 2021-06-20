import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Avatar,
  Box,
  Badge,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core';

import avatar4 from '../../assets/images/avatars/avatar4.jpg';
import avatarEmpty from '../../assets/images/avatars/empty_avatar.png';

import { withStyles } from '@material-ui/core/styles';
import { logout } from 'store/modules/auth/actions';
import useRouter from 'utils/useRouter';

const StyledBadge = withStyles({
  badge: {
    backgroundColor: 'var(--success)',
    color: 'var(--success)',
    boxShadow: '0 0 0 2px #fff',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
})(Badge);
export default function HeaderUserbox() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = useSelector(state => state.auth);
  const { history } = useRouter();
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        <Box>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            variant="dot">
            <Avatar sizes="44" alt="Dustin Watson" src={avatarEmpty} />
          </StyledBadge>
        </Box>
        <div className="d-none d-xl-block pl-3">
          <div className="font-weight-bold pt-2 line-height-1">
            {auth.user.username}
          </div>
          <span className="text-white-50">Administrator</span>
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className="ml-2">
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            <Box>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                variant="dot">
                <Avatar sizes="44" alt="Dustin Watson" src={avatarEmpty} />
              </StyledBadge>
            </Box>
            <div className="pl-3 ">
              <div className="font-weight-bold text-center pt-2 line-height-1">
                {auth.user.username}
              </div>
              <span className="text-black-50 text-center">
                Administrator
              </span>
            </div>
            <Divider className="w-100 mt-2" />
            {/* <ListItem button onClick={()=>{
              alert('My account click');
            }}>My Account</ListItem>
            <ListItem button onClick={()=>{
              alert('Profile settings click');
            }}>Profile settings</ListItem> */}
            <ListItem button onClick={()=>{
              history.push('/home');
              dispatch(logout());
            }}>Sign out</ListItem>
            <Divider className="w-100" />
            <ListItem className="p-0">
              <div className="grid-menu grid-menu-2col w-100">
                <div className="py-3">
                  <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'chart-bar']}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="pl-3 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ListItem>
            <Divider className="w-100" />
            <ListItem className="d-block rounded-bottom px-3 pt-3 pb-0 text-center">
              <Tooltip arrow title="Facebook">
                <Button color="default" className="text-facebook">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip arrow title="Dribbble">
                <Button color="default" className="text-dribbble mr-2 ml-2">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fab', 'dribbble']} />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip arrow title="Twitter">
                <Button color="default" className="text-twitter">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                  </span>
                </Button>
              </Tooltip>
            </ListItem>
          </List>
        </div>
      </Menu>
    </Fragment>
  );
}
