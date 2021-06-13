import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  colors,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import cogoToast from 'cogo-toast';
import {GridLoader} from 'react-spinners';
import * as AdminService from 'services/admin.service';
import { PageTitle } from '../../layout-components-admin';
import OrderTable from './components/OrderTable';

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

let s;

const Orders = () => {
  
  const classes = useStyles();

  const [orderLists, setOrderLists] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [dialogState, setDialogState] = useState(false);

  useEffect(() => {
    AdminService.getOrderLists().then(orders => {
      getOrders(orders);
    });
  }, []);

  const getOrders = (orders) => {
    let _orders = orders.map(element=>{
      const __shipping_address = String(element.shipping_address).replace('phone:undefined','').replace('phone:null', '');
      const __billing_address = String(element.billing_address).replace('phone:undefined','').replace('phone:null', '');
      return({
        id: element.id,
        payerEmail: element.payer_email,
        name: element.recipient_name,
        date: moment(element.order_date).format('DD/MM/YYYY'),
        cardName: element.name,
        setName: element.set_name,
        setCode: element.set_code,
        rarity: element.set_rarity,
        edition: element.edition,
        shippingAddress: __shipping_address,
        billingAddress: __billing_address,
        price: element.price,
        quantity: element.quantity,
        totalPrice: element.total_price,
        status: element.order_status,
        transactionId: element.transactionId,
        transactionLink: element.transaction_link,
        trackingNumber: element.tracking_number
      })
    })
    
    let group_by_orders = [];
    _orders.forEach(function (hash) {
        return function (a) {
            if (!hash[a.transactionId]) {
                hash[a.transactionId] = { date: a.date, history: []};
                group_by_orders.push(hash[a.transactionId]);
            }
            hash[a.transactionId].history.push(a);
        };
    }(Object.create(null)));
    
    let my_group_by_orders = group_by_orders.map(element=>{
      let totalPrice=0;
      let status = '';
      let payerInfo = element.history.find((a,index)=>index==0);
      element.history.forEach(a=>{
        totalPrice += a.totalPrice;
      })
      let find_status = element.history.find(b=>b.status=='SHIPPED')
      if(find_status) {
        status='SHIPPED'
      } else {
        status='PREPARING'
      }
      return{
        id: payerInfo.id,
        payer: payerInfo.payerEmail,  
        name: payerInfo.name,          
        date: payerInfo.date,
        totalPrice: totalPrice.toFixed(2),
        shippingAddress: payerInfo.shippingAddress,
        billingAddress: payerInfo.billingAddress,
        transactionLink: payerInfo.transactionLink,            
        status,
        trackingNumber: payerInfo.trackingNumber,
        history: element.history
      }
    })
    // console.log('my_group_by', my_group_by_orders);
    setOrderLists(my_group_by_orders);
  }

  const handleSearch = (event) => {
    let search = event.target.value;
    AdminService.searchOrderLists(search).then((data) => {
      getOrders(data.result);
    })
  }

  const handleActionChange = (index, status, content, total) => {
    const data = {
      order_id: index,
      order_status: status==='PREPARING'?'PENDING':'SHIPPED',
      order_content: content,
      order_total:total,
      tracking_number: null
    }

    if (status == 'PREPARING') {
      // this.setState({
      //   orderData: data,
      //   dialogState: true
      // })
      const _data = {...data, tracking_number: null}
      AdminService.setOrderStatus(_data).then((data) => {
        let _orderLists = orderLists.map(item=>{
          let updateItem = item;
          if (updateItem.id == data.result.id) {
            updateItem.status = data.result.order_status==='SHIPPED'?'SHIPPED':'PREPARING';
            updateItem.trackingNumber = null;
          }
          return updateItem;
        });
        setOrderLists(_orderLists);
        cogoToast.success(data.message, { position: 'top-right'});
      })

    } else {
      AdminService.setOrderStatus(data).then((data) => {
        let _orderLists = orderLists.map(item=>{
          let updateItem = item;
          if (updateItem.id == data.result.id) {
            updateItem.status = data.result.order_status==='SHIPPED'?'SHIPPED':'PREPARING';
            updateItem.trackingNumber = null;
          }
          return updateItem;
        });
        setOrderLists(_orderLists);
        cogoToast.success(data.message, { position: 'top-right'});
      })
    } 
  }

  // const handlechangeTrackingNumber = (event) => {
  //   const { value } = event.target;
  //   setTrackingNumber(value);
  // }

  const handleCloseDialog = () => {
    setDialogState(false);
  }

  // const handleUpdateTrackingNumber = () => {
  //   if (trackingNumber === '' || trackingNumber===null) {
  //     cogoToast.error('Please enter tracking number!', { position: 'top-right'});
  //     return;
  //   }
  //   setDialogState(false);
  //   const _data = {...orderData, tracking_number: trackingNumber}
  //   AdminService.setOrderStatus(_data).then((data) => {
  //     let _orderLists = orderLists;
  //     for (var order of _orderLists) {
  //       if (order.id == data.result.id) {
  //         order.status = data.result.order_status==='SHIPPED'?'SHIPPED':'PREPARING';
  //         order.trackingNumber = data.result.tracking_number;
  //         break;
  //       }
  //     }
  //     setOrderLists(_orderLists);
  //     cogoToast.success(data.message, { position: 'top-right'});
  //   })
  // }
  // console.log('orderLists state', orderLists);
  return (
    <Fragment>
      <PageTitle
          titleHeading="Orders"
          titleDescription="Welcome"
      />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          lg={6}
          sm={6}
          xs={6}
        >
          <TextField
            margin="dense"
            variant="outlined"
            onChange={handleSearch}
            placeholder="Search order..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
        >
          {
            orderLists?
              <div className="table-responsive">
                <OrderTable orders={orderLists} mainOnChange={handleActionChange}/>
              </div>:
              <div>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: '80px' }}>
                  <GridLoader color={'var(--primary)'} loading={true} />
                </div>
                <p className="mb-0 pt-3 text-black-50 text-center">Loading...</p>
              </div>
          }
          
        </Grid>
      </Grid>
      {/* <Dialog
        open={dialogState}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-edit-user">
          Enter tracking number
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <div className='edit-user-content'>
            <div className='row'>
              <div className='col-sm-6'>
                <TextField
                  autoFocus
                  margin='dense'
                  type='text'
                  value={trackingNumber}
                  onChange={handlechangeTrackingNumber}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTrackingNumber} color="secondary">
            Update
          </Button>
        </DialogActions>
      </Dialog> */}
    </Fragment>
  );
};

export default Orders;
