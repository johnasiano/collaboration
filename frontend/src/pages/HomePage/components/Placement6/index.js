import React from 'react';
import Slider from 'react-slick';
import { Grid, CardContent } from '@material-ui/core';

const postItems = [
    {
        imgSrc: "https://via.placeholder.com/370x370.png",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",        
    },
    {
        imgSrc: "https://via.placeholder.com/370x370.png",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",        
    },
    {
        imgSrc: "https://via.placeholder.com/370x370.png",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",        
    },
];

const Placement6 = () => {

    return (
        <section className="placement-6">
            <div className="container">
                <div className="title">
                    <span>on Twitter</span>
                </div>
                <div className="description">
                    <span>Used by the best sports bettors...</span>
                </div>
                <div className="post-group">
                    {
                        postItems.map(item=>(
                            <div className="post-item">
                                <div className="post-item__image">
                                    <img src={item.imgSrc} alt="post-item-image" />
                                </div>
                                <div className="post-item__title">
                                    <span>{item.title}</span>
                                </div>
                                <div className="post-item__button">
                                    <span>Learn More</span>
                                </div>                        
                            </div>
                        ))
                    }                    
                </div>
            </div>
        </section>
    )
}

export default Placement6