import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Media, Badge } from 'reactstrap';
import Switch from "react-switch";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      padding: '10px',
      color: '#313779',
      fontSize: '15px',
    },    
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#3D4977',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


function Row(props) {
  const { row, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const tran_link = `https://paypal.com/activity/payment/${row.transactionLink}`;
  return (
    <React.Fragment>
      <TableRow hover className={classes.root} >
        <TableCell width='5%'>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" scope="row" width='15%'>{row.payer}</TableCell>
        <TableCell align="center" scope="row" width='5%'>{row.date}</TableCell>
        <TableCell align="center" scope="row" width='5%'>{row.totalPrice}</TableCell>
        <TableCell align="center" scope="row" width='10%'>{row.shippingAddress}</TableCell>
        <TableCell align="center" scope="row" width='10%'>{row.billingAddress}</TableCell>
        <TableCell align="center" scope="row" width='15%'><a href={tran_link} target="_blank" style={{textDecoration:'underline'}}>{row.transactionLink}</a></TableCell>
        <TableCell align="center" scope="row" width='10%'>{row.status!='PREPARING'?<span className="m-1 badge badge-success">SHIPPED</span>:<span className="m-1 badge badge-warning">PREPARING</span>}</TableCell>
        <TableCell align="center" width='10%'>
          {
            <Switch 
              onChange={() => {    
                let content = '';  
                row.history.forEach((historyRow)=>{
                    content += '- '+ historyRow.quantity+ ' X ' + historyRow.cardName+'-'+historyRow.setName+'-'+historyRow.edition+'-'+historyRow.rarity+'\n'+
                                `Condition: Near Mint | Language: English, $ ${ (historyRow.price * historyRow.quantity).toFixed(2) }`+'\n';
                });  
                onChange(row.id, row.status, content, row.totalPrice)
              }}
              checked={row.status == 'PREPARING' ? false : true} 
            />
          }
        </TableCell>
        <TableCell align="center" width='10%'>{row.trackingNumber}</TableCell>
      </TableRow>
      <TableRow hover className={classes.root}>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div" style={{color:'#515478'}}>
                {row.name}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Card Name</StyledTableCell>
                    <StyledTableCell align="center">Set Name</StyledTableCell>
                    <StyledTableCell align="center">Set Code</StyledTableCell>
                    <StyledTableCell align="center">Rarity</StyledTableCell>
                    <StyledTableCell align="center">Edition</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Total price</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell align="center">{historyRow.cardName}</TableCell>
                      <TableCell align="center">{historyRow.setName}</TableCell>
                      <TableCell align="center">{historyRow.setCode}</TableCell>
                      <TableCell align="center">{historyRow.rarity}</TableCell>
                      <TableCell align="center">{historyRow.edition}</TableCell>
                      <TableCell align="center">{historyRow.price===0?<Badge style={{fontSize:'15px', background:'#006400', color:'white'}}>Free</Badge>:historyRow.price}</TableCell>
                      <TableCell align="center">{historyRow.quantity}</TableCell>
                      <TableCell align="center">{historyRow.totalPrice===0?<Badge style={{fontSize:'15px', background:'#006400', color:'white'}}>Free</Badge>:historyRow.totalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const { className, orders, mainOnChange, ...rest } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell width='5%'>Show</StyledTableCell>
              <StyledTableCell align="center" width='15%'>Payer</StyledTableCell>
              <StyledTableCell align="center" width='10%'>Order Date</StyledTableCell>
              <StyledTableCell align="center" width='10%'>Total Price</StyledTableCell>
              <StyledTableCell align="center" width='10%'>Shipping address</StyledTableCell>
              <StyledTableCell align="center" width='10%'>Billing address</StyledTableCell>
              <StyledTableCell align="center" width='10%'>Transaction Link</StyledTableCell>
              <StyledTableCell align="center" width='5%'>Order Status</StyledTableCell>
              <StyledTableCell align="center" width='5%'>Action</StyledTableCell>
              <StyledTableCell align="center" width='5%'>Tracking Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>(
                <Row key={index} row={row} onChange={mainOnChange}/>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}