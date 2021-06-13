import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  colors,
  Grid,
  Paper,
  Button
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import cogoToast from 'cogo-toast';
import * as AdminService from 'services/admin.service';
import { PageTitle } from '../../layout-components-admin';
import {useDropzone} from 'react-dropzone';
import MuiAlert from '@material-ui/lab/Alert';
import pdfIcon from 'assets/images/pdf_icon.png';
import { getImageBaseUrl } from 'utils/constants';

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
  },
  paper: {
    padding: '10px 30px'
  }
}));

const BuyListPDF = () => {
  
  const classes = useStyles();
  const [buyListPdf, setBuyListPdf] = useState('');
  const [buyListPdfUrl, setBuyListPdfUrl] = useState('/buylist_pdf.pdf');

  useEffect(()=>{
    AdminService.getOptions('buylist_pdf').then((data) => {
      const { buylist_pdf_url } = data;
      setBuyListPdfUrl(buylist_pdf_url);
    })
  }, [])

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setBuyListPdf(file);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false, accept: '.pdf'})
  
  const handleUpdatePDF = () => {
    
    if ( buyListPdf !== '' ) {
      const uploadData = new FormData();
      uploadData.append('pdf', buyListPdf);
      AdminService.uploadPDF('buylist_pdf', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(buyListPdf);
      })

      const _data = {
        buylist_pdf_url: '/buylist_pdf.pdf',
      }
  
      const sendData = {
        option_name: 'buylist_pdf',
        option_value: _data
      }
      AdminService.setOptions(sendData)
        .then((data) => {
          setBuyListPdf('');
          cogoToast.success(data.message, { position: 'top-right'});
        })
        .catch((error) => {
          cogoToast.error('Failed to update buylist pdf file', { position: 'top-right'});
        });
    } else {
      cogoToast.error('Please select pdf file.', { position: 'top-right'});
    }
  } 

  return (
    <Fragment>
      <PageTitle
          titleHeading="BuyList PDF"
          titleDescription="Welcome"
      />
      <Paper className={classes.paper} >
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <div className='dropzone'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                buyListPdf === '' ?
                  <div className="d-flex align-items-center">
                    <div className="dz-message ml-2 d-flex align-items-center">
                      <div className="dx-text">
                        Try dropping pdf file here, or click to select file to upload.
                      </div>
                    </div>
                  </div>:
                  <div className="d-flex align-items-center">                    
                    <div className="dz-message ml-2 d-flex align-items-center w-100 justify-content-center">
                      <div>
                        <img src={pdfIcon} alt='pdf-icon' width={40} />
                      </div> 
                      <div className="dx-text ml-2">
                        {buyListPdf.name}
                      </div>
                    </div>
                  </div>
              }                      
            </div>
          </div>
        </Grid>
        <Grid
          item
          md={6}
          className="d-flex justfiy-content-center align-items-center"
        >
          {
            buyListPdfUrl !== '' &&
              <div className="d-flex align-items-center">
                <div>
                  <img src={pdfIcon} alt='pdf-icon' width={40} />
                </div>     
                <a 
                  href={(getImageBaseUrl() + buyListPdfUrl)} 
                  target="_blank"
                >
                  <span className="font-weight-bold text-center ml-2">
                    buylist_pdf.pdf
                  </span>
                </a>
              </div>
          }
        </Grid>   
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
          style={{display:'flex'}}
          direction="row"
          justify="flex-end"
        >
          <Button variant="contained" color="primary" className="m-2" onClick={handleUpdatePDF} >
            <span className="btn-wrapper--icon">
              <UpdateIcon />
            </span>
            <span className="btn-wrapper--label">Update</span>
          </Button>
        </Grid>     
      </Grid>
      </Paper>
    </Fragment>
  );
};

export default BuyListPDF;
