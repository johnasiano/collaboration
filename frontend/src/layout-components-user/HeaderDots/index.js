import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    background: '#53d337',
    color: '#000000',
    fontWeight: 'bold',
    fontSize:'15px',
    '&:hover': {
      background: '#6ec36e',
      color: '#ffffff',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function HeaderDots() {

  const classes = useStyles();
  const router = useRouter();

  const handleMembership = event => {
    router.history.push('/user/membership');
  };

  return (
    <Fragment>
      <div className="d-flex align-items-center popover-header-wrapper">
        <Box component="span" pr="2">
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleMembership}
          >
            MEMBERSHIP
          </Button>
          
        </Box>
      </div>
    </Fragment>
  );
}
