import React, { Fragment, useState, useEffect } from 'react';
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

const SideBarBackground = () => {
  
  const classes = useStyles();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [backgroundImageData, setBackgroundImageData] = useState('');

  useEffect(()=>{
    AdminService.getOptions('side_bar_background').then((data) => {
      const { background_image_url } = data;
      setBackgroundImageUrl(background_image_url);
    })
  }, []);

  const handleImageChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setBackgroundImage(file);
  }
  
  const handleUpdateBackground = () => {
    
    if ( backgroundImage !== '' ) {
      const uploadData = new FormData();
      uploadData.append('image', backgroundImage);
      AdminService.uploadImages('side_bar_background', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(backgroundImage);
        reader.onloadend = () => {
          setBackgroundImageData(reader.result);
        }
      })
    }

    let _data = {
      background_image_url: '/side_bar_background.jpg',
    }

    const sendData = {
      option_name: 'side_bar_background',
      option_value: _data
    }
    AdminService.setOptions(sendData)
      .then((data) => {
        cogoToast.success(data.message, { position: 'top-right'});
      })
      .catch((error) => {
        cogoToast.error('Failed to update side bar background', { position: 'top-right'});
      });
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Side Bar Background Setup"
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
                onDrop={acceptedFiles => handleImageChange(acceptedFiles)}
                multiple={false}
                accept=".jpg"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      backgroundImage === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Desktop (1920 X 1080)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {backgroundImage.name}
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
          className="d-flex justfiy-content-center align-items-center"
        >
          <div >
            <img 
              src={backgroundImageData !== ''? backgroundImageData: (getImageBaseUrl() + backgroundImageUrl)} 
              alt='sidebar-background-image' 
              width="80%"
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
          <Button variant="contained" color="primary" className="m-2" onClick={handleUpdateBackground} >
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

export default SideBarBackground;
