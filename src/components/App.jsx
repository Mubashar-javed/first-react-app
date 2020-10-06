import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Example from "./Example";
import List from './List'
import axios from "axios";
import SearchForm from "./SearchForm";
import styles from "./App.module.css";


const API_ENDPOINT = "http://hn.algolia.com/api/v1/search?query="

// we use `use` prefix to define custom hooks in react, its a coding convention.
const useSemiPersistentState = (key, initialValue = '') => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialValue
    );
    React.useEffect(() => {
            console.log("useEffect called from useSemiPersistentState")
            localStorage.setItem(key, value);
        }, [value, key] // only re-run if the value or key changed
    );
    // its a React convention to return an array for custom hooks
    return [value, setValue];
};

const storiesReducer = (state, action) => {
    switch (action.type) {
        case "REMOVE_STORIES":
            return {
                ...state,
                data: state.data.filter(story => action.payload.objectID !== story.objectID)
            };

        case "STORIES_FETCH_INIT":
            return {...state, isLoading: true, isError: false};

        case "STORIES_FETCH_SUCCESS":
            return {
                ...state, isLoading: false, isError: false, data: action.payload
            };

        case "STORIES_FETCH_FAILURE":
            return {...state, isError: true, isLoading: false,};

        default:
            throw  new Error();
    }
}

function App() {

    const [searchTerm, setSearchTerm] = useSemiPersistentState("search", 'react');

    const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

    const [stories, dispatchStories] = React.useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false}
    );

    const handleFetchStories = React.useCallback(async () => {
            if (!searchTerm) return;

            dispatchStories({type: "STORIES_FETCH_INIT"})
            try {
                const result = await axios.get(url);
                dispatchStories({
                    type: "STORIES_FETCH_SUCCESS",
                    payload: result.data.hits
                });

            } catch {
                dispatchStories({type: "STORIES_FETCH_FAILURE"})
            }
        }
        , [url, searchTerm]);

    React.useEffect(() => {
        handleFetchStories()
    }, [handleFetchStories])

    const handleRemoveStory = item => {
        dispatchStories({
            type: "REMOVE_STORIES",
            payload: item
        });
    };

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = event => {
        setUrl(`${API_ENDPOINT}${searchTerm}`);
        event.preventDefault();
    }
    const loadingSpinner =
        <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>;
    return (
        <>
            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />
            <h2 className={styles.headlinePrimary}>My List</h2>
            {stories.isError && <p>Something went wrong......</p>}
            {stories.isLoading ? loadingSpinner :
                <List list={stories.data} onRemoveItem={handleRemoveStory}/>
            }
            <hr/>
            <Example/>
        </>
    );
}


export default App;