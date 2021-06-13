import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

export default ({ children, title = 'Sport Bet' }) => {
  return (
    <div className="app-main">
      <Header />      
      <main className="main-page">
        { children }
      </main>
      <Footer />
    </div>
  )
} 