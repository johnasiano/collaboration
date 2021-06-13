import React, { useEffect, Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  colors,
  Grid,
  Button,
  Paper
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cogoToast from 'cogo-toast';
import { PageTitle } from '../../layout-components-admin';
import * as AdminService from 'services/admin.service';

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


const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean'],
    [{ 'align': [] }],
    ['code-block']
  ],
};

const formats = [
  'header',
  'font',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'align',
  'code-block'
];

const RefundPolicy = () => {
  
  const classes = useStyles();
  const [text, setText] = useState('');

  useEffect(() => {
    AdminService.getOptions("refund_policy").then((data) => {
      setText(data.text);
    })
  }, []);

  const handleChange = (value) => {
    setText(value);
  }

  const handleUpdateRefundPolicy = () => {
    if (text === '') return;
    const data = {
      option_name: "refund_policy",
      option_value: {
        text: text
      }
    }
    AdminService.setOptions(data)
      .then((data) => {
        cogoToast.success(data.message, { position: 'top-right'});
      })
      .catch((error) => {
        cogoToast.success('Failed to update terms service', { position: 'top-right'});
      })
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Refund Policy"
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
          style={{display:'flex'}}
          direction="row"
          justify="flex-end"
        >
          <Button variant="contained" color="primary" className="m-2" onClick={handleUpdateRefundPolicy} >
            <span className="btn-wrapper--icon">
              <UpdateIcon />
            </span>
            <span className="btn-wrapper--label">Update</span>
          </Button>
        </Grid>
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
        >
          <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." onChange={handleChange} value={text} />
        </Grid>        
      </Grid>
      </Paper>
    </Fragment>
  );
};

export default RefundPolicy;
