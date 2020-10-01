import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Example from "./Example";
import List from './List'


const API_ENDPOINT = "http://hn.algolia.com/api/v1/search?query="


// we use `use` prefix to define custom hooks in react, its a coding convention.
const useSemiPersistentState = (key, initialValue = '') => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialValue
    );
    React.useEffect(() => {
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

    const [searchTerm, setSearchTerm] = useSemiPersistentState("search");

    //it mean initial value of stories=[]
    // const [stories, setStories] = React.useState([]);
    const [stories, dispatchStories] = React.useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false}
    );

    React.useEffect(() => {
        dispatchStories({type: "STORIES_FETCH_INIT"})
        fetch(`${API_ENDPOINT}react`)
            .then(result => result.json())
            .then(result => {
                dispatchStories({
                    type: "STORIES_FETCH_SUCCESS",
                    payload: result.hits
                });
            }).catch(() => dispatchStories({type: "STORIES_FETCH_FAILURE"}))
    }, []);

    const handleRemoveStory = item => {
        // const newStories = stories.filter(story => item.objId !== story.objId);
        dispatchStories({
            type: "REMOVE_STORIES",
            payload: item
        });
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const searchedStories = stories.data.filter(story => {
        return story.title.includes(searchTerm.toLowerCase());
    });

    const loadingSpinner = <div className="text-center">
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    return (
        <>
            <InputWithLabel
                id="search"
                value={searchTerm}
                onInputChange={handleSearch}
                isFocused={true}
            >
                <strong className="m-2">Search:</strong>
            </InputWithLabel>

            <h2>My List</h2>
            {stories.isError && <p>Something went wrong......</p>}
            {stories.isLoading ? loadingSpinner :
                <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
            }
            <hr/>
            <Example/>
        </>
    );
}

// This component will just render an Input with a label
const InputWithLabel = ({id, children, onInputChange, value, type = 'text', isFocused = false}) => {


    const inputRef = React.useRef();


    React.useEffect(() => {
            if (isFocused && inputRef.current) {
                inputRef.current.focus();
            }
        }, [isFocused] // only run if isFocused value changed
    );
    return (
        <>
            <label className="text-success form-control-plaintext" htmlFor={id}>{children}</label>
            <input className="mt-2 form-control"
                   placeholder="Search something here."
                   ref={inputRef}
                   type={type}
                   id={id}
                   value={value}
                   onChange={onInputChange}
                   autoFocus={isFocused}/>
        </>
    );
};


export default App;