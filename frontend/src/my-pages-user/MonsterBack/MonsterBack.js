import React, { Fragment, useState, useEffect, useCallback } from 'react';
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
import MuiAlert from '@material-ui/lab/Alert';
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

const MonsterBack = () => {
  
  const classes = useStyles();

  const [contactImage, setContactImage] = useState('');
  const [contactImageUrl, setContactImageUrl] = useState('');
  const [signinImage, setSigninImage] = useState('');
  const [signinImageUrl, setSigninImageUrl] = useState('');
  const [resaleImage, setResaleImage] = useState('');
  const [resaleImageUrl, setResaleImageUrl] = useState('');
  const [advancedImage, setAdvancedImage] = useState('');
  const [advancedImageUrl, setAdvancedImageUrl] = useState('');

  const [contactImageData, setContactImageData] = useState('');
  const [signinImageData, setSigninImageData] = useState('');
  const [resaleImageData, setResaleImageData] = useState('');
  const [advancedImageData, setAdvancedImageData] = useState('');

  useEffect(()=>{
    AdminService.getOptions('monster_background').then((data) => {
      const {
        advanced_image_url, 
        contact_image_url,
        resale_image_url,
        signin_image_url
      } = data;
      
      setAdvancedImageUrl(advanced_image_url);
      setContactImageUrl(contact_image_url);
      setResaleImageUrl(resale_image_url);
      setSigninImageUrl(signin_image_url);
    })
  }, [])

  const handleAdvancedImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setAdvancedImage(file);
  }
  const handleContactImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setContactImage(file);
  }
  const handleResaleImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setResaleImage(file);
  }
  const handleSigninImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSigninImage(file);
  }
  
  const handleImageSave = (type) => {

    if (type == 'contact') {
      const uploadData = new FormData();
      uploadData.append('image', contactImage);
      AdminService.uploadImages('contact_image', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(contactImage);
        reader.onloadend = () => {
          setContactImageData(reader.result);
        }
      })
      const sendData = {
        option_name: 'monster_background',
        option_value: {
          contact_image_url: '/contact_image.png',
          signin_image_url: signinImageUrl,
          resale_image_url: resaleImageUrl,
          advanced_image_url: advancedImageUrl,
        }
      }
      AdminService.setOptions(sendData)
        .then((data) => {
          cogoToast.success(data.message, { position: 'top-right'});
        })
        .catch((error) => {
          cogoToast.error('Failed to update homepage banner', { position: 'top-right'});
        });
    }

    if (type == 'sign') {
      const uploadData = new FormData();
      uploadData.append('image', signinImage);
      AdminService.uploadImages('signin_image', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(signinImage);
        reader.onloadend = () => {
          setSigninImageData(reader.result);
        }
      })
      
      const sendData = {
        option_name: 'monster_background',
        option_value: {
          contact_image_url: contactImageUrl,
          signin_image_url: '/signin_image.png',
          resale_image_url: resaleImageUrl,
          advanced_image_url: advancedImageUrl,
        }
      }
      AdminService.setOptions(sendData)
        .then((data) => {
          cogoToast.success(data.message, { position: 'top-right'});
        })
        .catch((error) => {
          cogoToast.error('Failed to update checkout page banner', { position: 'top-right'});
        });
    } 

    if (type == 'resale') {
      const uploadData = new FormData();
      uploadData.append('image', resaleImage);
      AdminService.uploadImages('resale_image', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(resaleImage);
        reader.onloadend = () => {
          setResaleImageData(reader.result)
        }
      })
      const sendData = {
        option_name: 'monster_background',
        option_value: {
          contact_image_url: contactImageUrl,
          signin_image_url: signinImageUrl,
          resale_image_url: '/resale_image.png',
          advanced_image_url: advancedImageUrl,
        }
      }
      AdminService.setOptions(sendData)
        .then((data) => {
          cogoToast.success(data.message, { position: 'top-right'});
        })
        .catch((error) => {
          cogoToast.error('Failed to update checkout page banner', { position: 'top-right'});
        });
    }

    if (type == 'advanced') {
      const uploadData = new FormData();
      uploadData.append('image', advancedImage);
      AdminService.uploadImages('advanced_image', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(advancedImage);
        reader.onloadend = () => {
          setAdvancedImageData(reader.result)
        }
      })
      const sendData = {
        option_name: 'monster_background',
        option_value: {
          contact_image_url: contactImageUrl,
          signin_image_url: signinImageUrl,
          resale_image_url: resaleImageUrl,
          advanced_image_url: '/advanced_image.png',
        }
      }
      AdminService.setOptions(sendData)
        .then((data) => {
          cogoToast.success(data.message, { position: 'top-right'});
        })
        .catch((error) => {
          cogoToast.error('Failed to update checkout page banner', { position: 'top-right'});
        });
    }
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Monster Background Setup"
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
                onDrop={acceptedFiles => handleAdvancedImage(acceptedFiles)}
                multiple={false}
                accept="image/png"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      advancedImage === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Monster of Advanced Search Page (570 X 540)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {advancedImage.name}
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
                src={advancedImageData !== ''? advancedImageData: (getImageBaseUrl()+advancedImageUrl)} 
                alt='advanced-image' 
                width='60%' 
              />
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
            <Button variant="contained" color="primary" className="m-2" onClick={()=>handleImageSave('advanced')} >
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
                onDrop={acceptedFiles => handleContactImage(acceptedFiles)}
                multiple={false}
                accept="image/png"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      contactImage === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Monster of Contact Page (550 X 550)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {contactImage.name}
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
                  src={contactImageData !== ''? contactImageData: (getImageBaseUrl()+contactImageUrl)} 
                  alt='contact-image' 
                  width='60%' 
                />
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
            <Button variant="contained" color="primary" className="m-2" onClick={()=>handleImageSave('contact')} >
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
                onDrop={acceptedFiles => handleResaleImage(acceptedFiles)}
                multiple={false}
                accept="image/png"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      resaleImage === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Monster of Resale Page (350 X 350)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {resaleImage.name}
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
                  src={resaleImageData !== ''? resaleImageData: (getImageBaseUrl()+resaleImageUrl)} 
                  alt='resale-image' 
                  width='60%' 
                />
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
            <Button variant="contained" color="primary" className="m-2" onClick={()=>handleImageSave('resale')} >
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
                onDrop={acceptedFiles => handleSigninImage(acceptedFiles)}
                multiple={false}
                accept="image/png"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      signinImage === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Monster of SignIn, SignUp Page (730 X 730)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {signinImage.name}
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
              <div>
                <img 
                  src={signinImageData !== ''? signinImageData: (getImageBaseUrl()+signinImageUrl)} 
                  alt='signin-image' 
                  width='60%' 
                />
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
            <Button variant="contained" color="primary" className="m-2" onClick={()=>handleImageSave('sign')} >
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

export default MonsterBack;
