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
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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

const AdminUsers = () => {
  
  const classes = useStyles();
  const [userLists, setUserLists] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editUser, setEditUser] = useState({});  
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [actionLabel, setActionLabel] = useState('');
  const [isAddAdmin, setIsAddAdmin] = useState(false);

  useEffect(() => {
    AdminService.getAllAdminUsers().then(data => {
      setUserLists(data);
    })
  }, []);

  useEffect(()=>{
    console.log('update user');
  }, [editUser])

  const handleChangePage = (evt, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowPerPage = (evt) => {
    const {value} = evt.target;
    setRowsPerPage(parseInt(value));
    setPage(0);
  }

  const handleAddAdmin = () => {
    setEditUser({});
    setIsOpenDialog(true);
    setIsAddAdmin(true);
    setActionLabel('Add Admin User');
  }

  const handleEditUser = (id) => {
    AdminService.getAdminUser(id).then((data) => {
      setIsOpenDialog(true);
      setActionLabel('Edit Admin User');
      setEditUser(data);
      setIsAddAdmin(false);
    })
  }

  const handleUpdateUser = () => {
    if(isAddAdmin) {
      AdminService.addAdminUser(editUser).then((data) => {
        cogoToast.success('Added Successfully', { position: 'top-right'});
        setIsOpenDialog(false);
        setUserLists(data);
      })
    } else {
      AdminService.updateAdminUser(editUser).then((data) => {
        cogoToast.success('Updated Successfully', { position: 'top-right'});
        setIsOpenDialog(false);
        setUserLists(data);
      })
    }
  }

  const handleDeleteUser = (id) => {
    AdminService.deleteAdminUser(id).then(data => {
      cogoToast.success('Deleted user successfully', { position: 'top-right'});
      setUserLists(data);
    })
  }

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  }

  const onChangeUser = (e) => {   
    const {value} = e.target;
    const tmp = { ...editUser, [e.target.id]:value};
    setEditUser(tmp);
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Management Admin Users"
          titleDescription="Welcome"
      />
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
          style={{display:'flex'}}
          direction="row"
          justify="flex-end"
        >
          <Button variant="contained" color="primary" className="m-2" onClick={handleAddAdmin} >
            <span className="btn-wrapper--icon">
              <PersonAddIcon />
            </span>
            <span className="btn-wrapper--label">New User</span>
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
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Password</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        userLists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>
                          <StyledTableRow key={row.id}>
                            <StyledTableCell>{row.id}</StyledTableCell>
                            <StyledTableCell>{row.email}</StyledTableCell>
                            <StyledTableCell>{row.username}</StyledTableCell>
                            <StyledTableCell>{row.password}</StyledTableCell>
                            <StyledTableCell>
                              <IconButton aria-label='edit admin' color='primary' onClick={() => handleEditUser(row.id)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label='delete admin' color='secondary' onClick={() => handleDeleteUser(row.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      }
                    </TableBody>
                    <TableFooter>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
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
                        onChangeRowsPerPage={handleChangeRowPerPage}
                      />
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
          open={isOpenDialog}
          keepMounted
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-edit-user">
            {actionLabel}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This information will be added to your bill as well, so be sure it's absolutely correct.
            </DialogContentText>
            <div className='edit-user-content'>
              <div className='row'>
                <div className='col-sm-12'>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='username'
                    label='Username'
                    type='text'
                    value={editUser.username || ''}
                    onChange={onChangeUser}
                    fullWidth
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='email'
                    label='Email'
                    type='email'
                    value={editUser.email || ''}
                    onChange={onChangeUser}
                    fullWidth
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='password'
                    label='password'
                    type='text'
                    value={editUser.password || ''}
                    onChange={onChangeUser}
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
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Fragment>
  );
};

export default AdminUsers;
