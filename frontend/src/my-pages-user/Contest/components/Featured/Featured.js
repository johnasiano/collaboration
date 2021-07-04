import React, {useState, useEffect} from 'react';
import AddIcon from '@material-ui/icons/Add';
import ContestTable from 'my-pages-user/Contest/components/ContestTable';
import demoOne from 'assets/images/bet-images/contest-images/demo-1.jpg';
import demoTwo from 'assets/images/bet-images/contest-images/demo-2.jpg';
import demoThree from 'assets/images/bet-images/contest-images/demo-3.jpg';
import {
  Grid,
  Dialog,
  Button,

} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import avatar3 from 'assets/images/avatars/avatar3.jpg';
import people2 from 'assets/images/stock-photos/people-2.jpg';

function createFakeRow(index) {
  return {
    id: index,
    sport: index,
    contest: 'NXS $80K PISTON [$20K TO 1ST] (XFIN)',
    style: 'Classic',
    entryFee: '$10',
    totalPrizes: '$6000',
    entries: '4452/9411',
    live: '',
    action: '',
  };
}

function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}



const Featured = props => {

  const columns = [
    {
      name: 'Sport',
      selector: 'sport',
      sortable: true,
      minWidth: '60px',
      maxWidth: '60px',
    },
    {
      name: 'Contest',
      selector: 'contest',
      sortable: true,
      minWidth: '360px',
      maxWidth: '360px',
    },
    {
      name: 'Style',
      selector: 'style',
      sortable: true,
    },
    {
      name: 'Entry Fee',
      selector: 'entryFee',
      sortable: true,
    },
    {
      name: 'Total Prizes',
      selector: 'totalPrizes',
      sortable: true,
    },
    {
      name: 'Entries',
      selector: 'entries',
      sortable: true,
    },
    {
      name: 'Live',
      selector: 'live',
      sortable: true,
    },
    {
      name: '',
      selector: 'action',
      button: true,
      cell: (row) => <button type='button' onClick={()=>handleOpenModal(row)}>Enter</button>,
    },
  ];

  const modalValue = {
    id: 0,
    title: 'NXS $80K PISTON [$20K TO 1ST] (XFIN)',
    entry: 10,
    entries: 4725/9411,
    prizes: 80000,
    crowns: 10,
    myEntries: 0,
    multiEntry: 150,
    liveIn: '07/03 2:27 PM EST',
    prizePayouts: [
        {
            number: '1st',
            prize: 200000,
        },
        {
            number: '2nd',
            prize: 7500,
        },
        {
            number: '3rd',
            prize: 3000,
        }
    ]
  }

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (row) => {
    setShowModal(true);
    console.log('row click', row.id)
  }

  const closeModal = () => setShowModal(!showModal);

  return (
    <div className='contest-content--featured'>
      <div className='contest-content__post'>
        <div className='image-content'>
          <img
            className="post-img"
            alt="Demo Post"
            src={demoOne}
          />
          <img
            className="post-img"
            alt="Demo Post"
            src={demoTwo}
          />
          <img
            className="post-img"
            alt="Demo Post"
            src={demoThree}
          />
        </div>
      </div>
      <div className='contest-content__control'>
        <div className='contest-content__control--right'>
          <div className='control-item'>
            <AddIcon className='plus-icon' />
            <span>Create a Contest</span>
          </div>
          <div className='control-item'>
            <AddIcon className='plus-icon' />
            <span>Create a Lineup</span>
          </div>
          <div className='control-item'>
            <span>Pre-Draft Rankings</span>
          </div>
          <div className='control-item'>
            <span>Research</span>
          </div>
          <div className='control-item'>
            <span>Refer a Friend</span>
          </div>
        </div>
        <div className='contest-content__control--left'>
          <span>NEXT START</span>
        </div>
      </div>
      <ContestTable 
        columns={columns}
        data={createRowData(50)}
      />
      <Dialog scroll="body" maxWidth="md" open={showModal} onClose={closeModal}>
        <div className="contest-content__modal">
          <div className="close">
            <CloseIcon style={{fontSize:'20px'}}/>
          </div>
          <div className="header">
            <div className="header--right">
              <div>
                <MonetizationOnIcon style={{fontSize:'60px', color:'green'}}/>
              </div>
              <div className='header--right__info'>
                <span className='title'>{modalValue.title}</span>
                <div className='entry-info'>
                  <div className='entry-info--item'>
                    <div>
                      Entry $15
                    </div>
                    <div>
                      Entries 3817/27.4k
                    </div>
                  </div>
                  <div className='entry-info--item'>
                    <div>
                      Prizes $350000
                    </div>
                    <div>
                      Crown 15
                    </div>
                  </div>
                  <div className='entry-info--item'>
                    <div>
                      My Entries 0
                    </div>
                    <div>
                      Multi-Entry 150
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header--left">
              <div className='live-title'>LIVE IN:</div>
              <div className='down-time'>16:00:07</div>
              <div className='start-time'>07/04 2:38 PM EST</div>
            </div>
          </div>
          <div className="content">

          </div>
          <div className="footer">
            <div className='footer--info'>
              <span>Experience Badge</span>
              <span>Average Results</span>
            </div>
            <div>
              <button type='button' className='draft-team-btn'>DRAFT TEAM</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Featured;
