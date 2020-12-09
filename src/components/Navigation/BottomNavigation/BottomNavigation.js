import React from 'react';

import NavigationEntries from '../NavigationEntries';
import style from './BottomNavigation.css';

const BottomNavigation = props => {
    return(
        <nav className={style.bottomNavigationContainer}>
            <NavigationEntries mobile />
        </nav>
    );
};

export default BottomNavigation;