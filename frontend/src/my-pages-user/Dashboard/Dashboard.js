import React, { useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import {
  TotalUsers,
  TotalProducts,
  UserProduct
} from './components';
import { useSelector } from 'react-redux';
import { PageTitle } from '../../layout-components-admin';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  container: {
    marginTop: 30
  }
}));

const Dashboard = () => {
  
  const classes = useStyles();
  const search = useSelector(state => state.search);
  const users = useSelector(state => state.users);
  useEffect(() => {
   
  }, []);

  return (
    <Fragment>
      {/* <PageTitle
          titleHeading="Dashboard"
          titleDescription="Welcome"
      /> */}
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
        >
          {/* <UserProduct users= {users.users.length} products= {search.products.length}/> */}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;
