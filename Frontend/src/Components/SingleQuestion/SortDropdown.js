import React from 'react';

const SortDropdown = ({ onchange }) => {
    return (
        <p>Sort by: <select onChange={(e) => onchange(e)}>
            <option value="">Date - descending</option>
            <option value="created_asc">Date - ascending</option>
            <option value="vote_desc">Votes - descending</option>
            <option value="vote_asc">Votes - ascending</option>
        </select></p>
    );
}

export default SortDropdown;