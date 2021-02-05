import React from 'react';

const Groups = ({ pageContext }) => {
    console.log(pageContext.groups);
    return <div>
        {pageContext.groups.map(group => <div>{ group.group }</div>)}
    </div>;
};

export default Groups;