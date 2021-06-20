import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Grid,
  Container,
  Input,
  InputLabel,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Button,
  FormControl
} from '@material-ui/core';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { useGoogleLogin } from "react-google-login";

import svgImage9 from '../../../assets/images/illustrations/login.svg';

import { NavLink as RouterLink, Link } from 'react-router-dom';
import validate from 'validate.js';
import { useDispatch } from 'react-redux';
import cogoToast from 'cogo-toast';

import useRouter from 'utils/useRouter';
import { signinAccount, signinAccountGoogle } from 'services/auth.service';
import {login} from 'store/modules/auth/actions';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
  }
};

const clientId = "1028376226556-i5o1lsujlo30540dn95sn4l0pjq56olh.apps.googleusercontent.com";
const Login = () => {
  const [checked1, setChecked1] = React.useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const onSuccess = (res) => {
    const accountInfo = {
      email: res.profileObj.email,
      name: res.profileObj.name,
      role: 'user',
      content: res
    }

    signinAccountGoogle(accountInfo).then((result) => {
      if (result.success) {
        dispatch(login({
          user: result.user,
          accessToken: result.accessToken,
        }));
        cogoToast.success('Login successfully!', { position: 'top-right'});
        router.history.push('/user/dashboard');
      } else {
        cogoToast.error(result.message, { position: 'top-right'});
      }
    })
  };
  const onFailure = (res) => {
    cogoToast.error('Failed google login', { position: 'top-right'});
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });

  const handleChange1 = event => {
    setChecked1(event.target.checked);
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  
  const handleSubmit = async event => {
    event.preventDefault();
    
    const accountInfo = {
      email: formState.values.email,
      password: formState.values.password,
      role: "user"
    }

    signinAccount(accountInfo).then((result) => {
      console.log('result', result);
      if (result.success) {
        dispatch(login({
          user: result.user,
          accessToken: result.accessToken,
        }));
        cogoToast.success('Login successfully!', { position: 'top-right'});
        router.history.push('/user/dashboard');
      } else {
        cogoToast.error(result.message, { position: 'top-right'});
      }
    })
    
  };
  
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Fragment>
      <div className="app-wrapper min-vh-100">
        <div className="app-main flex-column">
          <Button
            size="large"
            variant="outlined"
            color="primary"
            component={RouterLink}
            className="btn-go-back"
            to="/home">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'arrow-left']} />
            </span>
            <span className="btn-wrapper--label">Back to Home</span>
          </Button>
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <Container maxWidth="lg">
                    <Grid container spacing={5}>
                      <Grid
                        item
                        xs={12}
                        lg={5}
                        className="d-none d-xl-flex align-items-center">
                        <img
                          alt="..."
                          className="w-100 mx-auto d-block img-fluid"
                          src={svgImage9}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={7}
                        className="d-flex flex-column align-items-center">
                        <span className="w-100 text-left text-md-center pb-4">
                          <h1 className="display-3 text-xl-left text-center mb-3 font-weight-bold">
                            Login to your account
                          </h1>
                          <p className="font-size-lg text-xl-left text-center mb-0 text-black-50">
                            We're glad you're working on your app. Login below
                            to continue.
                          </p>
                        </span>
                        <Card className="m-0 w-100 p-0 border-0">
                          <div className="card-header d-block p-3 mx-2 mb-0 mt-2 rounded border-0">
                            <div className="text-muted text-center mb-3">
                              <span>Sign in with</span>
                            </div>
                            <div className="text-center">
                              <Button
                                variant="outlined"
                                className="mr-2 text-google"
                                onClick={signIn}
                              >
                                <span className="btn-wrapper--icon">
                                  <FontAwesomeIcon icon={['fab', 'google']} />
                                </span>
                                <span className="btn-wrapper--label">
                                  Google
                                </span>
                              </Button>
                              {/* <Button
                                variant="outlined"
                                className="mr-2 text-facebook">
                                <span className="btn-wrapper--icon">
                                  <FontAwesomeIcon icon={['fab', 'facebook']} />
                                </span>
                                <span className="btn-wrapper--label">
                                  Facebook
                                </span>
                              </Button>
                              <Button
                                variant="outlined"
                                className="ml-2 text-twitter">
                                <span className="btn-wrapper--icon">
                                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                                </span>
                                <span className="btn-wrapper--label">
                                  Twitter
                                </span>
                              </Button> */}
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <div className="text-center text-black-50 mb-3">
                              <span>Or sign in with credentials</span>
                            </div>
                            <form className="px-5">
                              <div className="mb-3">
                                <FormControl className="w-100">
                                  <InputLabel htmlFor="input-with-icon-adornment">
                                    Email address
                                  </InputLabel>
                                  <Input
                                    fullWidth
                                    id="input-with-icon-adornment"
                                    name="email"
                                    error={hasError('email')}
                                    onChange={handleChange}
                                    value={formState.values.email || ''}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        <MailOutlineTwoToneIcon />
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              </div>
                              <div className="mb-3">
                                <FormControl className="w-100">
                                  <InputLabel htmlFor="standard-adornment-password">
                                    Password
                                  </InputLabel>
                                  <Input
                                    id="standard-adornment-password"
                                    fullWidth
                                    error={hasError('password')}
                                    name="password"
                                    onChange={handleChange}
                                    value={formState.values.password || ''}
                                    type="password"
                                    startAdornment={
                                      <InputAdornment position="start">
                                        <LockTwoToneIcon />
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              </div>
                              <div className="w-100">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={checked1}
                                      onChange={handleChange1}
                                      value="checked1"
                                      color="primary"
                                    />
                                  }
                                  label="Remember me"
                                />
                              </div>
                              <div className="w-100">
                                <Link to='/user/register'>
                                  Don't have account?
                                </Link>
                              </div>
                              <div className="text-center">
                                <Button
                                  color="primary"
                                  variant="contained"
                                  size="large"
                                  className="my-2"
                                  disabled={!formState.isValid}
                                  onClick={handleSubmit}
                                >
                                  Sign in
                                </Button>
                              </div>
                            </form>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
