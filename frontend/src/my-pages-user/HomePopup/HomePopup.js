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
import Switch from "react-switch";

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

const HomePopuup = () => {
  
  const classes = useStyles();
  const [popupImage, setPopupImage] = useState('');
  const [popupImageUrl, setPopupImageUrl] = useState('');  
  const [popupImageData, setPopupImageData] = useState('');
  const [popupState, setPopupState] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupText, setPopupText] = useState('');

  useEffect(()=>{
    AdminService.getOptions('home_page_popup_image').then((data) => {
      const {
        popup_image_url, 
        popup_state,
        popup_text,
        popup_title
      } = data;
      
      setPopupImageUrl(popup_image_url);
      setPopupState(popup_state);
      setPopupText(popup_text);
      setPopupTitle(popup_title);
    })
  }, [])

  const onChange = (e) => {
    const {id, value} = e.target;
    if (id === 'popup_title') {
      setPopupTitle(value);
    }
    if (id === 'popup_text') {
      setPopupText(value);
    }
  }

  const handleCheckState = (checked) => {
    setPopupState(checked);

    let _data = {
      popup_image_url: popupImageUrl,
      popup_state: checked,
      popup_title: popupTitle,
      popup_text: popupText
    }

    const sendData = {
      option_name: 'home_page_popup_image',
      option_value: _data
    }
    AdminService.setOptions(sendData)
      .then((data) => {
        cogoToast.success(data.message, { position: 'top-right'});
      })
      .catch((error) => {
        cogoToast.error('Failed to update homepage popup', { position: 'top-right'});
      });
  }

  const handlePopupImageChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPopupImage(file);
  }

  const handleUpdate = () => {
    
    if ( popupImage !== '' ) {
      const uploadData = new FormData();
      uploadData.append('image', popupImage);
      AdminService.uploadImages('home_page_popup', uploadData).then((data)=>{
        let reader = new FileReader();
        reader.readAsDataURL(popupImage);
        reader.onloadend = () => {
          setPopupImageData(reader.result);
        }
      })
    }

    let _data = {
      popup_image_url: '/home_page_popup.png',
      popup_state: popupState,
      popup_title: popupTitle,
      popup_text: popupText
    }

    const sendData = {
      option_name: 'home_page_popup_image',
      option_value: _data
    }
    AdminService.setOptions(sendData)
      .then((data) => {
        cogoToast.success(data.message, { position: 'top-right'});
      })
      .catch((error) => {
        cogoToast.error('Failed to update homepage popup', { position: 'top-right'});
      });
  }
  

  return (
    <Fragment>
      <PageTitle
          titleHeading="Home Page Popup Setup"
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
                onDrop={acceptedFiles => handlePopupImageChange(acceptedFiles)}
                multiple={false}
                accept="image/png"
              >
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      popupImage === '' ?
                        <div className="d-flex align-items-center">
                          <div className="dz-message w-100 d-flex align-items-center flex-column">
                            <div className="dx-text">
                              Drag or upload image file
                            </div>
                            <div className="dx-text">
                              Desktop (300 X 300)
                            </div>
                          </div>
                        </div>:
                        <div className="d-flex align-items-center">                    
                          <div className="dz-message w-100 d-flex align-items-center w-100 justify-content-center">
                            <div>
                              <img src={imgIcon} alt='pdf-icon' width={40} />
                            </div> 
                            <div className="dx-text ml-2">
                              {popupImage.name}
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
                src={popupImageData !== ''? popupImageData: (getImageBaseUrl()+popupImageUrl)} 
                alt='popup-image' 
                width="60%"
              />
            </div> 
            <div className="mt-4 d-flex align-items-center">
              <TextField id="popup_title" label="Popup Title" autoComplete='off' onChange={onChange} value={popupTitle} fullWidth/>
            </div> 
            <div className="mt-4 d-flex align-items-center">
              <TextField id="popup_text" label="Popup Text" autoComplete='off' onChange={onChange} value={popupText} fullWidth multiline rows={5}/>
            </div> 
            <div className="mt-4 d-flex align-items-center">
              <span style={{marginRight:'10px'}}>Show popup</span>
            </div>
            <div className="mt-4 d-flex align-items-center">
              <Switch onChange={handleCheckState} checked={popupState} />
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
            <Button variant="contained" color="primary" className="m-2" onClick={handleUpdate} >
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

export default HomePopuup;
