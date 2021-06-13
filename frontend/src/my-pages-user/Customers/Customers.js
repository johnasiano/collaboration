import React, { useEffect, Fragment, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { 
  colors,
  Grid,
  TableContainer,
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  TablePagination,
  TableFooter,
  IconButton,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  Paper
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {GridLoader} from 'react-spinners';
import cogoToast from 'cogo-toast';
import { PageTitle } from '../../layout-components-admin';
import * as AdminService from 'services/admin.service';
import {baseURL} from 'utils/constants';

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
  },
  avatarCell: {
    display: 'flex',
    alignItems: 'center'
  }
}));


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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

let intervalID = false

const Customers = () => {
  
  const classes = useStyles();
  const [ userLists, setUserLists ] = useState(null);
  const [ creditLists, setCreditLists ] = useState([]);
  const [ editCredit, setEditCredit ] = useState({});
  const [ creditChangeValue, setcreditChangeValue ] = useState(0);
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(100);
  const [ isEditUser, setIsEditUser ] = useState(false);

  useEffect(() => {
    AdminService.getUserList().then(data => {
      setUserLists(data);
    })
    AdminService.getCreditList().then(data => {
      setCreditLists(data);
    })
  }, []);

  const handleChangePage = (evt, newPage) => {
    setPage(newPage);
  } 

  const handleChangeRowPerPage = (evt) => {
    setPage(0);
    setRowsPerPage(parseInt(evt.target.value));
  }

  const handleEditUser = (data) => {   
    setIsEditUser(true);
    setEditCredit(data);
    setcreditChangeValue(data.credit)
  }

  const handleUpdateUser = () => {    
    let userData={
      user_id:editCredit.user_id,
      credit:editCredit.credit
    }
    
    AdminService.updateCredit(userData).then(data => {
      if(data.message == "Update successfully!"){
        cogoToast.success(data.message, { position: 'top-right'});
        AdminService.getCreditList().then(data => {
          setCreditLists(data);
          setIsEditUser(false);
        })
      }
    });
  }

  const handleCloseDialog = () => {
    setIsEditUser(false);
  }

  const handleDownloadCSV = async () => {
    window.location.href = `${baseURL}/api/admin/downloadCSV`
  }

  const onChangeUser = (e) => {
    let tmp = editCredit;
    tmp.credit = Number(e.target.value);
    setcreditChangeValue(Number(e.target.value));
    setEditCredit(tmp);
  }

  const handleSearch = (e) => {
    let searchText = e.target.value;
    if (intervalID) clearTimeout(intervalID)
    intervalID = setTimeout(() => {
      AdminService.searchUserList(searchText).then((data) => {
        setUserLists(data);
      })
    }, 600);
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Customers"
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
            placeholder="Search user..."
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
          lg={6}
          sm={6}
          xs={6}
          style={{display:'flex'}}
          direction="row"
          justify="flex-end"
        >
          <Button variant="contained" color="primary" className="m-2" onClick={handleDownloadCSV} >
            <span className="btn-wrapper--icon">
              <GetAppIcon />
            </span>
            <span className="btn-wrapper--label">CSV</span>
          </Button>
        </Grid>
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
        >
          <div className="table-responsive">
            {
              userLists?
                <TableContainer component={Paper}>
                  <Table className='customers-table' aria-label='customers table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell width='5%'>No</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>Phone Number</StyledTableCell>
                        <StyledTableCell>Date of last login</StyledTableCell>
                        <StyledTableCell>PromoCode use</StyledTableCell>
                        <StyledTableCell>Credit Balance</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        userLists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>{
                          let promocode = creditLists.find((credit)=>credit.user_id == row.id);
                          if(promocode==null){
                            promocode={
                              coder5:0,
                              balance:0
                            }
                          }
                          let avatar = null;
                          if (row.picture) {
                            // avatar = row.picture
                            avatar = require('assets/images/avatars/empty_avatar.png')
                          } else {
                            avatar = require('assets/images/avatars/empty_avatar.png')
                          }
                          return(
                            <StyledTableRow  key={row.id} hover >
                              <StyledTableCell>{(page*100+(index+1))}</StyledTableCell>
                              <StyledTableCell>
                                <div className={classes.avatarCell}>
                                  <Avatar alt={row.first_name} src={avatar} />
                                  <h6 className="ml-2 pt-15">{row.first_name}</h6>
                                </div>    
                              </StyledTableCell>
                              <StyledTableCell>{row.email}</StyledTableCell>
                              <StyledTableCell>{row.country}&nbsp;{row.state}&nbsp;{row.full_address}</StyledTableCell>
                              <StyledTableCell>{row.phone_number}</StyledTableCell>
                              <StyledTableCell>{row.last_login}</StyledTableCell>
                              <StyledTableCell>{promocode.coder5==1?<span className="m-1 badge badge-success">Yes</span>:<span className="m-1 badge badge-warning">No</span>}</StyledTableCell>
                              <StyledTableCell>
                                <div style={{display:'flexbox'}}>
                                  <span style={{fontSize:15, color:'blur'}}>{promocode.balance!=0?promocode.balance:'0'}</span>
                                  <div>
                                    <IconButton aria-label='edit admin' color='primary' onClick={() => {
                                      let data={
                                        user_id:row.id,
                                        user_name:row.first_name,
                                        credit:promocode.balance!=0?promocode.balance:0
                                      }
                                      return handleEditUser(data)
                                    }}>
                                    <EditIcon />
                                    </IconButton>
                                  </div>
                                </div>
                              </StyledTableCell>
                            </StyledTableRow >
                          )
                        }
                          
                        )
                      }
                    </TableBody>
                    <TableFooter>
                      <TablePagination
                        rowsPerPageOptions={[10, 50, 100]}
                        count={userLists.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                          'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                          'aria-label': 'next page',
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowPerPage} />
                    </TableFooter>
                  </Table>
                </TableContainer>
                :
                <div>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: '80px' }}>
                    <GridLoader color={'var(--primary)'} loading={true} />
                  </div>
                  <p className="mb-0 pt-3 text-black-50 text-center">Loading...</p>
                </div>
            }
          </div>
        </Grid>
        <Dialog
          open={isEditUser}
          keepMounted
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-edit-user">
            Change credit
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              User name: {editCredit.user_name}
            </DialogContentText>
            <div className='edit-user-content'>
              <div className='row'>
                <div className='col-sm-6'>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='credit'
                    label='Credit'
                    type='text'
                    value={creditChangeValue}
                    onChange={(e)=>onChangeUser(e)}
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
            <Button onClick={handleUpdateUser} color="secondary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Fragment>
  );
};

export default Customers;
