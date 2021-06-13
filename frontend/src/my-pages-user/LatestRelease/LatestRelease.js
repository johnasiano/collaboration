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

const LatestRelease = () => {
  
  const classes = useStyles();
  
  const [latestOneImage, setLatestOneImage] = useState('');
  const [latestOneImageUrl, setLatestOneImageUrl] = useState('');
  const [latestOneImageData, setLatestOneImageData] = useState('');
  const [latestTwoImage, setLatestTwoImage] = useState('');
  const [latestTwoImageUrl, setLatestTwoImageUrl] = useState('');
  const [latestTwoImageData, setLatestTwoImageData] = useState('');

  const [latestOneTitle, setLatestOneTitle] = useState('');
  const [latestOneLink, setLatestOneLink] = useState('');

  const [latestTwoTitle, setLatestTwoTitle] = useState('');
  const [latestTwoLink, setLatestTwoLink] = useState('');

  useEffect(()=>{
    AdminService.getOptions('latest_release').then((data) => {
      const {
        latest_one_image_url, 
        latest_two_image_url,
        latest_one_title,
        latest_one_link,
        latest_two_title,
        latest_two_link
      } = data;
      
      setLatestOneImageUrl(latest_one_image_url);
      setLatestTwoImageUrl(latest_two_image_url);
      setLatestOneTitle(latest_one_title);
      setLatestOneLink(latest_one_link);
      setLatestTwoTitle(latest_two_title);
      setLatestTwoLink(latest_two_link);
    })
  }, [])

  const handleImageChange = (acceptedFiles, name) => {
  
    const file = acceptedFiles[0];
    if (name==="one") {
      setLatestOneImage(file);
    }

    if (name==="two") {
      setLatestTwoImage(file);
    }
  }

  const handleTextChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "one_title") {
      setLatestOneTitle(value);
    }
    if (name === "two_title") {
      setLatestTwoTitle(value);
    }
    if (name === "one_link") {
      setLatestOneLink(value);
    }
    if (name === "two_link") {
      setLatestTwoLink(value);
    }
  }

  const handleSavelatestRelease = () => {

    if (latestOneImage !== '') {
      const uploadData = new FormData();
      uploadData.append('image', latestOneImage);
      AdminService.uploadImages('latest_one_image', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(latestOneImage);
        reader.onloadend = () => {
          setLatestOneImageData(reader.result);
        }
      });
    }

    if (latestTwoImage !== '') {
      const uploadData = new FormData();
      uploadData.append('image', latestTwoImage);
      AdminService.uploadImages('latest_two_image', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(latestTwoImage);
        reader.onloadend = () => {
          setLatestTwoImageData(reader.result);
        }
      });
    }

    const sendData = {
      option_name: 'latest_release',
      option_value: {
        latest_one_image_url: '/latest_one_image.jpg',
        latest_two_image_url: '/latest_two_image.jpg',
        latest_one_title: latestOneTitle,
        latest_one_link: latestOneLink,
        latest_two_title: latestTwoTitle,
        latest_two_link: latestTwoLink
      }      
    }

    AdminService.setOptions(sendData)
      .then((data) => {
        cogoToast.success(data.message, { position: 'top-right'});
      })
      .catch((error) => {
        cogoToast.error('Failed to update latest release banner', { position: 'top-right'});
      });
  } 

  return (
    <Fragment>
      <PageTitle
          titleHeading="Latest Release Setup"
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
                onDrop={acceptedFiles => handleImageChange(acceptedFiles, 'one')}
                multiple={false}
                accept=".jpg"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      latestOneImage === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Size (600 X 300)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {latestOneImage.name}
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
                src={latestOneImageData !== ''? latestOneImageData: (getImageBaseUrl()+latestOneImageUrl)} 
                alt='latest-one-image' 
                width="80%"
              />
            </div> 
            <div className="mt-4 d-flex align-items-center">
              <TextField name="one_title" label="Title" autoComplete='off' onChange={handleTextChange} value={latestOneTitle} fullWidth/>
            </div> 
            <div className="mt-4 d-flex align-items-center">
              <TextField name="one_link" label="Set Name" autoComplete='off' onChange={handleTextChange} value={latestOneLink} fullWidth/>
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
            <Button variant="contained" color="primary" className="m-2" onClick={handleSavelatestRelease} >
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
                onDrop={acceptedFiles => handleImageChange(acceptedFiles, 'two')}
                multiple={false}
                accept=".jpg"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      latestTwoImage === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Size (600 X 300)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {latestTwoImage.name}
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
                  src={latestTwoImageData !== ''? latestTwoImageData: (getImageBaseUrl()+latestTwoImageUrl)} 
                  alt='latest-two-image'
                  width="80%"
                />
              </div> 
              <div className="mt-4 d-flex align-items-center">
                <TextField name="two_title" label="Title" autoComplete='off' onChange={handleTextChange} value={latestTwoTitle} fullWidth/>
              </div> 
              <div className="mt-4 d-flex align-items-center">
                <TextField name="two_link" label="Set Name" autoComplete='off' onChange={handleTextChange} value={latestTwoLink} fullWidth/>
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
            <Button variant="contained" color="primary" className="m-2" onClick={handleSavelatestRelease} >
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

export default LatestRelease;
