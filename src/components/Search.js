import React from "react";

const Search = (props) => {
    const {search, onSearch} = props;
    return (
        <div className="m-3">
            <label htmlFor="search" className="mr-2">Search: </label>
            <input id="search" type="text" value={search} autoFocus onChange={onSearch}/>
        </div>

    );
};

export default Search;