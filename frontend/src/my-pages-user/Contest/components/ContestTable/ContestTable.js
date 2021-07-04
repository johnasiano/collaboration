import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
  header: {
    style: {
      minHeight: '30px',
    },
  },
  headRow: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      minHeight: '30px',
      background: '#1D1C1E',
      // borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      color: '#c5c4c6',
      fontSize: '11px',
      fontWeight: '600',
      paddingLeft: '6px',
      paddingRight: '0px',  
    },
    activeSortStyle: {
      color: '#c5c4c6',
      '&:focus': {
        outline: 'none',
      },
      '&:hover:not(:focus)': {
        color: '#c5c4c6',
      },
    },
    inactiveSortStyle: {
      '&:focus': {
        outline: 'none',
        color: '#c5c4c6',
      },
      '&:hover': {
        color: '#c5c4c6',
      },
    },
  },
  rows: {
    style: {
      minHeight: '40px',
    }
  },
  cells: {
    style: {
      paddingLeft: '6px',
      paddingRight: '0px', 
    },
  },
};

const ContestTable = ({columns, data}) => {
  return (
    <div className='contest-content__table'>     
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        dense
      /> 
    </div>
  );
};

export default ContestTable;
