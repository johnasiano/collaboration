import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
// import MUIDataTable from "mui-datatables";


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '50px',
    '@media (max-width: 863px)': {
      marginTop: '40px',
    }
  },
  stockTotalValue: {
    fontSize: '80px',
    '@media (max-width: 863px)': {
      fontSize: '40px',
    }
  },
  title: {
    marginTop: theme.spacing(10),
    fontSize: '40px',
    '@media (max-width: 863px)': {
      marginTop: theme.spacing(3),
      fontSize: '20px',
    }
  },
  table: {
    marginTop: theme.spacing(10)
  }
}));

const Products = props => {
  const { className, stockTotalValue, data, ...rest } = props;

  const classes = useStyles();
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const columns = ["Id", "Name", "Qty in stock",  "Supplier", "Supplier item code", "Cost"];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    fixedSelectColumn: false,
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography className={classes.stockTotalValue}>${stockTotalValue}</Typography>
      {/* <Typography className={classes.title} >TOP IS LOW STOCK</Typography> */}
      <div className={classes.table}>
        {/* <MUIDataTable
          title={"TOP IS LOW STOCK"}
          data={data}
          columns={columns}
          options={options}
        /> */}
      </div>      
    </div>
  );
};

Products.propTypes = {
  className: PropTypes.string,
  stockTotalValue: PropTypes.string,
  products: PropTypes.array
};

Products.defaultProps = {};

export default Products;
