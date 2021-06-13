import React from 'react';
import Slider from 'react-slick';
import { Grid, CardContent } from '@material-ui/core';

const Placement4 = () => {

    return (
        <section className="placement-4">
            <div className="container">                
                <div className="right">
                    <div className="title">
                        <span>Betting Analysis</span>
                    </div>
                    <div className="description">
                        <span>Articles updated daily by our staff</span>
                    </div>
                    <div>
                        <button type="button" className="learn-button">Learn More</button>
                    </div>
                </div>
                <div className="left">
                    <div className="image">
                        <img src="https://via.placeholder.com/320x360.png" alt="post-image-1" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Placement4