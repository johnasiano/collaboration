import React from 'react';
import Slider from 'react-slick';
import { Grid, CardContent } from '@material-ui/core';

const Placement2 = () => {

    return (
        <section className="placement-2">
            <div className="container">
                <div className="title">
                    <span>Daily Sportsbook Deals</span>
                </div>
                <div className="description">
                    <span>Get started with the best sportsbooks in your state...</span>
                </div>
                <div className="item-group">
                    <button type="button" className="demo-button" />
                    <button type="button" className="demo-button" />
                    <button type="button" className="demo-button" />
                    <button type="button" className="demo-button" />
                    <button type="button" className="demo-button" />
                </div>
            </div>
        </section>
    )
}

export default Placement2