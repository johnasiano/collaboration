import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  colors,
  Grid,
  Paper,
  Button,
  TextField
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import cogoToast from 'cogo-toast';
import * as AdminService from 'services/admin.service';
import { PageTitle } from '../../layout-components-admin';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

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

let intervalID = false;

const FreePack = () => {
  
  const classes = useStyles();
  const [searchList, setSearchList] = useState([]);
  const [freePackItem, setFreePackItem] = useState([]);

  useEffect(()=>{
    AdminService.getOptions('freepack_setting').then((data) => {
      setFreePackItem(data);
    })
  }, [])

  const onChange = (e) => {
    const { value } = e.target;
    if (intervalID) clearTimeout(intervalID)
    intervalID = setTimeout(() => {
      AdminService.searchSealedItems(value).then((data) => {
        setSearchList(data.result);
      })
    }, 600);
  }

  const handleAddItem = (item) => {
      let newFreePackItem = [];
      newFreePackItem.push(item);
      setFreePackItem(newFreePackItem);
  }

  const handleUpdate = () => {
    const sendData = {
      option_name: 'freepack_setting',
      option_value: freePackItem
    }
    AdminService.setOptions(sendData).then((data) => {
      cogoToast.success(data.message, { position: 'top-right'});
    })
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Free Pack Setup"
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
            <TextField type="search" label="Search" autoComplete='off' placeholder="Search sealed product..." onChange={onChange} fullWidth variant="outlined"/>
          </Grid> 
          <Grid
            item
            xs={12}
            sm={7}
          >
            <div className="search-result-container">
                <List>
                {
                  searchList.map((item, index)=>
                    <ListItem button onClick={()=>handleAddItem(item)}>
                      <ListItemAvatar>
                        <Avatar>
                          <ViewCarouselIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.name}`}
                        secondary={`${item.type_of_set} - ${item.edition}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="add">
                          <NoteAddIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                }
              </List>
            </div>
          </Grid>
          <Grid
            item
            md={5}
          >
            <div className="selected-list-container">
              <div className="selected-list-items">
                <div className="selected-item">
                  <span>Name</span>
                  <span>Type of set</span>
                  <span>Edition</span>
                </div>
                {
                  freePackItem.map((item, index) =>
                    <div className="selected-item-content" key={index} >
                      <span>{item.name}</span>
                      <span>{item.type_of_set}</span>
                      <span>{item.edition}</span>
                    </div>
                  )
                }
              </div>
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

export default FreePack;
