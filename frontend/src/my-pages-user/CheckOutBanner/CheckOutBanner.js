import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  colors,
  Grid,
  Paper,
  Button
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import TextField from '@material-ui/core/TextField';
import cogoToast from 'cogo-toast';
import * as AdminService from 'services/admin.service';
import { PageTitle } from '../../layout-components-admin';
import Dropzone from 'react-dropzone';
import imgIcon from 'assets/images/image-icon.svg';
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

const CheckOutBanner = () => {
  
  const classes = useStyles();
  const [banner1Image, setBanner1Image] = useState('');
  const [banner1ImageURL, setBanner1ImageURL] = useState('');
  const [banner1Link, setBanner1Link] = useState('');
  const [banner2Image, setBanner2Image] = useState('');
  const [banner2ImageURL, setBanner2ImageURL] = useState('');
  const [banner2Link, setBanner2Link] = useState('');
  
  const [banner1ImageData, setBanner1ImageData] = useState('');
  const [banner2ImageData, setBanner2ImageData] = useState('');

  useEffect(()=>{
    AdminService.getOptions('checkout_page_banner_image').then((data) => {
      const {
        banner1_image_url, 
        banner1_link,
        banner2_image_url,
        banner2_link
      } = data;
      
      setBanner1ImageURL(banner1_image_url);
      setBanner1Link(banner1_link);
      setBanner2ImageURL(banner2_image_url);
      setBanner2Link(banner2_link);
    })
  }, [])

  const onChange = (e) => {
    const {id, value} = e.target;
    console.log('id', id);
    if (id === 'banner1_link') {
      setBanner1Link(value);
    }
    if (id === 'banner2_link') {
      setBanner2Link(value);
    }
  }

  const handleBannerDesk = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setBanner1Image(file);
  }
  const handleBannerMobile = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setBanner2Image(file);
  }
  
  const handleUpdateBanner1 = () => {
    if ( banner1Link === '' ) {
      cogoToast.error('Please enter link.', { position: 'top-right'});
      return;
    }
    
    if ( banner1Image !== '' ) {
      const uploadData = new FormData();
      uploadData.append('image', banner1Image);
      AdminService.uploadImages('checkout_page_banner_desk', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(banner1Image);
        reader.onloadend = () => {
          setBanner1ImageData(reader.result);
        }
      })
    }

    let _data = {
      banner1_image_url: '/checkout_page_banner_desk.jpg',
      banner1_link: banner1Link
    }

    _data = { 
      ..._data, 
      banner2_image_url: banner2ImageURL,  
      banner2_link: banner2Link
    }

    const sendData = {
      option_name: 'checkout_page_banner_image',
      option_value: _data
    }

    AdminService.setOptions(sendData)
      .then((data) => {
        cogoToast.success(data.message, { position: 'top-right'});
      })
      .catch((error) => {
        cogoToast.error('Failed to update checkout page banner', { position: 'top-right'});
      });
  }

  const handleUpdateBanner2 = () => {
    if ( banner2Link === '' ) {
      cogoToast.error('Please enter link.', { position: 'top-right'});
      return;
    }

    if ( banner2Image !== '' ) {
      const uploadData = new FormData();
      uploadData.append('image', banner2Image);
      AdminService.uploadImages('checkout_page_banner_mobile', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(banner2Image);
        reader.onloadend = () => {
          setBanner2ImageData(reader.result);
        }
      })
    }
    
    let _data = {
      banner2_image_url: '/checkout_page_banner_mobile.jpg',
      banner2_link: banner2Link
    }

    _data = { 
      ..._data, 
      banner1_image_url: banner1ImageURL,  
      banner1_link: banner1Link
    }

    const sendData = {
      option_name: 'checkout_page_banner_image',
      option_value: _data
    }
    AdminService.setOptions(sendData)
      .then((data) => {
        cogoToast.success(data.message, { position: 'top-right'});
      })
      .catch((error) => {
        cogoToast.error('Failed to update checkout page banner', { position: 'top-right'});
      });
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Check Out Page Banner Setup"
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
              <Dropzone 
                onDrop={acceptedFiles => handleBannerDesk(acceptedFiles)}
                multiple={false}
                accept=".jpg"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      banner1Image === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Desktop (1440 X 200)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {banner1Image.name}
                            </div>
                          </div>
                        </div>
                    }                      
                  </div>
                )}
              </Dropzone>            
            </div>
          </Grid>
          <Grid
            item
            md={6}
            className="d-flex flex-column"
          >        
            <div >
              <img 
                src={banner1ImageData !== ''? banner1ImageData: (getImageBaseUrl()+banner1ImageURL)} 
                alt='banner1-image' 
                width="80%"
              />
            </div> 
            <div className="mt-4 d-flex align-items-center">
              <TextField id="banner1_link" label="Banner Link" autoComplete='off' onChange={onChange} value={banner1Link} fullWidth/>
            </div> 
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
            <Button variant="contained" color="primary" className="m-2" onClick={handleUpdateBanner1} >
              <span className="btn-wrapper--icon">
                <UpdateIcon />
              </span>
              <span className="btn-wrapper--label">Update</span>
            </Button>
          </Grid>     
        </Grid>
      </Paper>
      <br/>
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
              <Dropzone 
                onDrop={acceptedFiles => handleBannerMobile(acceptedFiles)}
                multiple={false}
                accept=".jpg"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      banner2Image === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Mobile (370 X 100)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {banner2Image.name}
                            </div>
                          </div>
                        </div>
                    }                      
                  </div>
                )}
              </Dropzone>            
            </div>
          </Grid>
          <Grid
            item
            md={6}
            className="d-flex flex-column"
          >       
              <div >
                <img 
                  src={banner2ImageData !== ''? banner2ImageData: (getImageBaseUrl()+banner2ImageURL)} 
                  alt='banner1-image' 
                  width="80%" 
                />
              </div> 
              <div className="mt-4 d-flex align-items-center">
                <TextField id="banner2_link" label="Banner Link" autoComplete='off' onChange={onChange} value={banner2Link} fullWidth/>
              </div> 
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
            <Button variant="contained" color="primary" className="m-2" onClick={handleUpdateBanner2} >
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

export default CheckOutBanner;
