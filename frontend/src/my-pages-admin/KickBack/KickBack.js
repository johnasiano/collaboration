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

const KickBack = () => {
  
  const classes = useStyles();
  const [kickState, setKickState] = useState(true);

  useEffect(()=>{
    AdminService.getOptions('kick_back').then((data) => {
      const { kick_state } = data;
      setKickState(kick_state);
    })
  }, [])

  const handleCheckState = (checked) => {
    
    setKickState(checked);

    let _data = {
      kick_state: checked
    }

    const sendData = {
      option_name: 'kick_back',
      option_value: _data
    }
    
    AdminService.setOptions(sendData)
      .then((data) => {
        cogoToast.success(data.message, { position: 'top-right'});
      })
      .catch((error) => {
        cogoToast.error('Failed to update kick back setup', { position: 'top-right'});
      });
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Kick Back Setup"
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
          lg={12}
          sm={12}
          xs={12}
        >
          <span>Show kickback function</span>
        </Grid>    
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
        >
          <Switch onChange={handleCheckState} checked={kickState} />
        </Grid>     
      </Grid>
      </Paper>
    </Fragment>
  );
};

export default KickBack;
