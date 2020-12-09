import React from 'react';

import './Title.css';

const Title = props => {
    return <span className="title">{props.children}</span>;
};

export default Title;