import React from 'react';

const footerItems = [
  {
    title: 'Product',
    items: [
      'Product',
      'Product',
      'Product',
    ]
  },
  {
    title: 'Features',
    items: [
      'Features',
      'Features',
      'Features',
    ]
  },
  {
    title: 'Resources',
    items: [
      'Resources',
      'Resources',
      'Resources',
    ]
  },
  {
    title: 'Company',
    items: [
      'Company',
      'Company',
      'Company',
    ]
  }
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="left">
            <div className="left__top">
              <span>Ready to get started?</span>
            </div>
            <div className="left__bottom">
              <span>Sign up or contact us</span>
            </div>
          </div>
          <div className="right">
            <button type="button" className="trial-btn">Start free trial</button>
            <button type="button" className="contact-btn">Contact Us</button> 
          </div>
        </div>
        <div className="divider" />
        <div className="site-footer__bottom">
          <div className="site-footer__bottom-left">
            <div className="logo">
              <span>TRADE</span>
            </div>
            <div className="title">
              <span>© 2010 — 2020</span>
            </div>
            <div className="title">
              <span>Privacy — Terms</span>
            </div>
          </div>
          <div className="site-footer__bottom-right">
            {
              footerItems.map(item=>(
                <div className="item-group">
                  <div className="title">
                    <span>{item.title}</span>
                  </div>
                  {
                    item.items.map(link=>(
                      <div className="link">
                        <span>{link}</span>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer