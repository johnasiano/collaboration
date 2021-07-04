import React, { useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import {
  Featured,
  NBA
} from './components';
import { useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const sportTypes = [
  'FEATURED',
  'NBA',
  'MLB',
  'GOLF',
  'NHL',
  'MMA',
  'NAS',
  'NFL',
  'LOL',
  'SOC',
  'TEN',
  'CS:GO',
  'DOTA2',
  'AUSFL',
  'CFB',
  'CBB',
  'VAL',
  'COD',
  'EL',
  'CFL',
]

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
  }
}));

const Contest = () => {
  
  const classes = useStyles();
  const search = useSelector(state => state.search);
  const users = useSelector(state => state.users);
  useEffect(() => {
   
  }, []);

  return (
    <Fragment>
      <Tabs selectedClassName='react-tabs__tab--selected'>
        <div className='contest-header'>
          <TabList className='custom-react-tabs__tab-list'>
            {
              sportTypes.map((item, index)=>(
                <Tab               
                  className='custom-react-tabs__tab'
                  key={index}
                >
                  {item}
                </Tab>
              ))
            }
          </TabList>
        </div>
        {/* <div className='contest-content'> */}
          <TabPanel>
            <div className='contest-content'>
              <Featured />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='contest-content'>
              <NBA />
            </div>
          </TabPanel>
        {/* </div> */}
      </Tabs>
    </Fragment>
  );
};

export default Contest;