import React from 'react';

import Logo from "../../../content/images/nav-logo.png";
import NavigationEntries from './NavigationEntries';
import './Navigation.css';

interface NavigationProps {
    siteTitle: string;
}

const Navigation: React.FC<NavigationProps> = ({ siteTitle }) => {
    return <nav className="NavigationContainer">
        <div className="LeagueContainer">
            <img className="imageLogo" src={Logo} alt={siteTitle} width={64} height={64} />
            <div className="Links">
                <div className="leagueName">
                    <h3>Serie A</h3>
                </div>
                <ul className="NavigationList">
                    <NavigationEntries />
                </ul>
            </div>
        </div>
    </nav>;
};

export default Navigation;