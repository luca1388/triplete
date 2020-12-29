import React from 'react';

import './Title.css';


const Title: React.FC = ({ children }) => {
    return <span className="title">{children}</span>;
};

export default Title;