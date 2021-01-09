import React from 'react';
import emptyImg from '../../../content/images/fans.svg';

const EmptyScorers = props => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            width: '95%',
            margin: '20px 0',
            boxSizing: 'border-box'
        }}>
            <img src={emptyImg} style={{width: '65%', maxHeight: '550px'}} />
            <h3 style={{ textAlign: 'center', margin: '40px 0 0' }}>Cercasi bomber!</h3>
            <p style={{ textAlign: 'center' }}>
                La stagione non è ancora iniziata e non ci sono marcatori.
            </p>
        </div>
    );
};

export default EmptyScorers;