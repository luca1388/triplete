import React from 'react';

import Logo from "../../../content/images/nav-logo.png";
import NavigationEntries from './NavigationEntries/NavigationEntries';
import './Navigation.css';
import { Competition } from '../../types';

interface NavigationProps {
    siteTitle: string;
    competition?: Competition;
}

const Navigation: React.FC<NavigationProps> = ({ siteTitle, competition }) => {
    return <nav className="NavigationContainer">
        <div className="LeagueContainer">
            <img className="imageLogo" src={Logo} alt={siteTitle} width={64} height={64} />
            <div className="Links">
                <ul className="NavigationList">
                    <NavigationEntries competition={competition} />
                </ul>
            </div>
        </div>
    </nav>;
};

export default Navigation;