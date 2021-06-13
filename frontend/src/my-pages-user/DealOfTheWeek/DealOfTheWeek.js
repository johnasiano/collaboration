import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  colors,
  Grid,
  Paper,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import cogoToast from 'cogo-toast';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import * as AdminService from 'services/admin.service';
import { PageTitle } from '../../layout-components-admin';
import { getCardPrice } from 'services/cardprice.service';
import { conditionMap } from 'utils/constants';

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

const DealOfTheWeek = () => {
  
  const classes = useStyles();
  const [searchList, setSearchList] = useState([]);
  const [dealItems, setDealItems] = useState([]);
  const [specialPrice, setSpecialPrice] = useState([]);
  const [title, setTitle] = useState({});

  useEffect(()=>{
    const titleData='homepage_title';
    AdminService.getOptions(titleData).then((data) => {
      setTitle(data);
    })

    const sendData='deal_week_products'
    AdminService.getOptions(sendData).then((data) => {
      data = data.card_groups.map(item=>{
        return item.main
      })
      setDealItems(data);
    })
  }, [])

  const onChange = (e) => {
    const { value } = e.target;
    if (intervalID) clearTimeout(intervalID)
    intervalID = setTimeout(() => {
      AdminService.searchDealItems(value).then((data) => {
        setSearchList(data.cards);
      })
    }, 600);
  }

  const handleAddItem = (item) => {
    if (dealItems.length > 1) {
      cogoToast.error('Only 2 items can be added.', { position: 'top-right'});
    } else {
      const items = [ ...dealItems, item ];
      setDealItems(items);
    }
  }

  const handleRemoveItem = (item) => {
    const items = dealItems.filter(object=>object.id != item.id);
    setDealItems(items);
  }

  const handleUpdate = () => {
    const sendData = {
      option_name: 'deal_week_products',
      option_value: dealItems
    }
    AdminService.setOptions(sendData).then((data) => {
      cogoToast.success(data.message, { position: 'top-right'});
    })
  }

  const handleChangePrice = (evt) => {
    const { id, value } = evt.target;
    const tmp = dealItems;
    tmp[id].special_price = value;
    setDealItems(tmp);
  }

  const handleTitleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const titleOne = value;
    const updateTitle = {...title, titleOne};
    setTitle(updateTitle);
  }

  const handleTitleSave = () => {
    const sendData = {
      option_name: 'homepage_title',
      option_value: title
    }
    AdminService.setOptions(sendData).then((data) => {
      cogoToast.success(data.message, { position: 'top-right'});
    })
  }

  return (
    <Fragment>
      <PageTitle
          titleHeading="Deal Of The Week Setup"
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
            <TextField type="search" label="Search" autoComplete='off' placeholder="Search card..." onChange={onChange} fullWidth variant="outlined"/>
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
                        primary={`${item.set_code} - ${item.set_rarity} - ${getCardPrice(item, 'USD')}`}
                        secondary={`${item.edition} - ${conditionMap[item.condition]}`}
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
                  <span style={{width:'25%'}}>SET CODE</span>
                  <span style={{width:'25%'}}>PRICE</span>
                  <span style={{width:'25%'}}>SPECIAL PRICE</span>
                  <span style={{width:'25%', textAlign:'center'}}>REMOVE</span>
                </div>
                {
                  dealItems.map((item, index) =>
                    <div className="selected-item-content" key={index} >
                      <span style={{width:'25%'}}>{item.set_code}</span>
                      <span style={{width:'25%'}}>{getCardPrice(item, 'USD')}</span>
                      <span style={{width:'25%'}}>
                        <input type="number" value={item.special_price ? item.special_price : 0}
                                    id={index} min="0" max="100" step="0.1" onChange={handleChangePrice} />
                      </span>
                      <CancelIcon onClick={() => handleRemoveItem(item)} style={{width:'25%', cursor:'pointer'}}/>
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
      <br/>
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
            <Typography variant="button">Change Title</Typography>
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
          >
            <TextField type="text" autoComplete='off' onChange={handleTitleChange} fullWidth variant="outlined" value={title.titleOne} />
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
            <Button variant="contained" color="primary" className="m-2" onClick={handleTitleSave} >
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

export default DealOfTheWeek;
