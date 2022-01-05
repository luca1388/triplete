import React from 'react';
import emptyImg from '../../../content/images/fans.svg';

const EmptyScorers: React.FC = _props => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '95%',
            margin: '20px 0',
            boxSizing: 'border-box'
        }}>
            <div style={{margin: '0 20px 0 0', width: '30%'}}>
            <h3 style={{ textAlign: 'center', margin: '40px 0 0' }}>Cercasi bomber!</h3>
            <div style={{ textAlign: 'center', padding: '10px 0 0 0' }}>
                La stagione non è ancora iniziata e non ci sono marcatori.
            </div>

            </div>
                <img src={emptyImg} style={{width: '65%', maxHeight: '550px', maxWidth: '500px'}} />
        </div>
    );
};

export default EmptyScorers;