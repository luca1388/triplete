import React from 'react';

import NavigationEntries from '../NavigationEntries/NavigationEntries';
import './BottomNavigation.css';

const BottomNavigation = ({ competition }) => {
    return(
        <nav className="bottomNavigationContainer">
            <NavigationEntries mobile competition={competition} />
        </nav>
    );
};

export default BottomNavigation;