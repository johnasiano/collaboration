import React, { useEffect, Fragment, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { 
  colors,
  Grid,
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  TablePagination,
  TableFooter,
  Button
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { PageTitle } from '../../../layout-components-admin';
import * as AdminService from 'services/admin.service';
import {GridLoader} from 'react-spinners';
import cogoToast from 'cogo-toast';

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

let intervalID = false

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

const PromoCodeDate = () => {
  
  const classes = useStyles();
  const [promoFile, setPromoFile] = useState(null);
  const [promoCodes, setPromoCodes] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    AdminService.getDatePromo().then((data) => {
      setPromoCodes(data);
    })
  }, []);

  const handleChangePage = (evt, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowPerPage = (evt) => {
    const {value} = evt.target;
    setRowsPerPage(parseInt(value));
    setPage(0);
  }

  const handChangePromo = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setPromoFile(file);
  }

  const handleUploadPromo = () => {
    const uploadData = new FormData();

    if (promoFile) {
      uploadData.append('file', promoFile);
      setPromoCodes(null);
      AdminService.uploadDatePromoCodes(uploadData).then(data => {
        setPromoCodes(data.promocodes);
        cogoToast.success(data.message, { position: 'top-right'});
      })
    } else {
      cogoToast.error('Please select file', { position: 'top-right'});
    }    
  }
  

  return (
    <Fragment>
      <PageTitle
          titleHeading="Promo with Date Setup"
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
          <input type='file' className='promo-upload' onChange={handChangePromo} />
          <Button variant="contained" color="primary" className="m-2" onClick={handleUploadPromo} >
            <span className="btn-wrapper--icon">
              <PublishIcon />
            </span>
            <span className="btn-wrapper--label">Upload CSV File</span>
          </Button>
        </Grid>
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
        >
          {
            promoCodes?
              <div className="table-responsive">
                <Table className='promo-table' aria-label='promocode table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell width='5%'>Id</StyledTableCell>
                      <StyledTableCell>PromoCode</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Value</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      promoCodes.length > 0 && promoCodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>{
                        const date = new String(row.date);
                        return(
                          <StyledTableRow key={row.id} hover>
                            <StyledTableCell>{row.id}</StyledTableCell>
                            <StyledTableCell>{row.code}</StyledTableCell>
                            <StyledTableCell>{date.substr(0,10)}</StyledTableCell>
                            <StyledTableCell>{row.value}</StyledTableCell>
                          </StyledTableRow>
                        )
                      }
                        
                      )
                    }
                  </TableBody>
                  <TableFooter>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      count={promoCodes.length}
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
    </Fragment>
  );
};

export default PromoCodeDate;
