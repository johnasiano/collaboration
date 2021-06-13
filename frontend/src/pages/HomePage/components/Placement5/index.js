import React from 'react';
import Slider from 'react-slick';
import { Grid, CardContent } from '@material-ui/core';

const Placement5 = () => {
    return (
        <section className="placement-5">
            <div className="container">
                <div className="left">
                    <div className="image">
                        <img src="https://via.placeholder.com/320x360.png" alt="post-image-1" />
                    </div>
                </div>
                <div className="right">
                    <div className="title">
                        <span>How to bet</span>
                    </div>
                    <div className="description">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    </div>
                    <div>
                        <button type="button" className="learn-button">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Placement5