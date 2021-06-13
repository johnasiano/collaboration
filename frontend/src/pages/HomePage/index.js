import React from 'react';
import Layout from '../Layout/Main';
import Placement1 from './components/Placement1';
import Placement2 from './components/Placement2';
import Placement3 from './components/Placement3';
import Placement4 from './components/Placement4';
import Placement5 from './components/Placement5';
import Placement6 from './components/Placement6';
import Placement7 from './components/Placement7';

const HomePage = () => {
  return (
    // <Layout>
      <div className="home-page">
        <Placement1 />
        <Placement2 />
        <Placement3 />
        <Placement4 />
        <Placement5 />
        <Placement6 />
        <Placement7 />
      </div>      
    // </Layout>
  )
}

export default HomePage
