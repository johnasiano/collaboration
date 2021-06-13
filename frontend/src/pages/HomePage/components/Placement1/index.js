import React from 'react';
import Slider from 'react-slick';
import { Grid, CardContent } from '@material-ui/core';

const Placement1 = () => {

    let settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
            breakpoint: 1100,
            settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
        ]
    };


    return (
        <section className="placement-1">
            <div className="container">
                <div className="title">
                    <span>The fastest way to bet like a pro</span>
                </div>
                <div className="web-name">
                    <span>WebsiteName</span>
                </div>
                <div>
                    <button type="button" className="trial-button">Start free trial</button>
                </div>
                <div className="slide">
                    <Slider {...settings} >
                        <div>
                            <CardContent>
                                <div className="slider-item">1</div>
                            </CardContent>
                        </div>
                        <div>
                            <CardContent >
                            <div className="slider-item">2</div>
                            </CardContent>
                        </div>
                        <div>
                            <CardContent >
                            <div className="slider-item">3</div>
                            </CardContent>
                        </div>
                        <div>
                            <CardContent >
                            <div className="slider-item">4</div>
                            </CardContent>
                        </div>
                        <div>
                            <CardContent >
                            <div className="slider-item">5</div>
                            </CardContent>
                        </div>
                        <div>
                            <CardContent >
                            <div className="slider-item">6</div>
                            </CardContent>
                        </div>
                        </Slider>
                </div>
            </div>
        </section>
    )
}

export default Placement1