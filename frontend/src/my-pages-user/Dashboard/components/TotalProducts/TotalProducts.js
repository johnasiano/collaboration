import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, colors } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';

import gradients from 'utils/gradients';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundImage: gradients.green,
    height: 48,
    width: 48
  }
}));

const TotalProducts = props => {
  const { className, products, ...rest } = props;

  const classes = useStyles();

  const data = {
    value: '24,000',
    currency: '$',
    difference: '+4.5%'
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          Total Products
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">
            {products}
          </Typography>
          {/* <Label
            className={classes.label}
            color={colors.green[600]}
            variant="outlined"
          >
            {data.difference}
          </Label> */}
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <CardTravelIcon />
      </Avatar>
    </Card>
  );
};

TotalProducts.propTypes = {
  className: PropTypes.string
};

export default TotalProducts;
