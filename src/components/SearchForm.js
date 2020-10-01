import React from "react";
import InputWithLabel from "./InputWithLabel";

const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => {
    return (<form onSubmit={onSearchSubmit}>
        <InputWithLabel
            id="search"
            value={searchTerm}
            onInputChange={onSearchInput}
            isFocused={true}
        >
            <strong className="m-2">Search:</strong>
        </InputWithLabel>
        <button type="submit"
                className="btn btn-primary"
                disabled={!searchTerm}
        >
            Submit
        </button>
    </form>)
};

export default SearchForm;
