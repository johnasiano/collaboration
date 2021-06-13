import React from 'react';
import Slider from 'react-slick';
import { Grid, CardContent } from '@material-ui/core';

const Placement3 = () => {

    return (
        <section className="placement-3">
            <div className="container">
                <div className="left">
                    <div className="image">
                        <img src="https://via.placeholder.com/320x360.png" alt="post-image-1" />
                    </div>
                </div>
                <div className="right">
                    <div className="title">
                        <span>Betting Models</span>
                    </div>
                    <div className="description">
                        <span>Our betting models have won $100 bettors a total of xyz on a sample size of xyz bets...</span>
                    </div>
                    <div>
                        <button type="button" className="learn-button">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Placement3