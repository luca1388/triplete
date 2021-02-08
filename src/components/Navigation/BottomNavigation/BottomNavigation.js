import React from 'react';

import NavigationEntries from '../NavigationEntries/NavigationEntries';
import './BottomNavigation.css';

const BottomNavigation = props => {
    return(
        <nav className="bottomNavigationContainer">
            <NavigationEntries mobile />
        </nav>
    );
};

export default BottomNavigation;