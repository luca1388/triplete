import React from 'react';
import { Link as GatsbyLink } from "gatsby";

import './Link.css';

const Link = props => {
    return <li className="Link">
        <GatsbyLink activeClassName="active" {...props} >
            {props.children}
        </GatsbyLink>
    </li>;
};

export default Link;