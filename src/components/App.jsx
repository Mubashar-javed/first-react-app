import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Example from "./Example";
import List from './List'

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

function App() {
    const stories = [
        {
            title: "React is cool",
            url: "https://reactjs.org",
            released: 2013,
            objId: 0,
        },
        {
            title: "Django is just django",
            url: "https://djangoproject.com",
            released: 2005,
            objId: 1,
        },
        {
            title: "Google is best",
            url: "https://www.google.com",
            released: 1997,
            objId: 2,
        },
    ];

    const [searchTerm, setSearchTerm] = useSemiPersistentState("search");


    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const searchedStories = stories.filter(story => {
        const {title, released, url} = story;
        const term = searchTerm.toLowerCase();
        return title.includes(term) ||
            url.includes(term) ||
            released.toString().includes(term);
    });

    return (
        <>
            {/*Adding onSearch props here which will call handleSearch function every time.*/}
            <InputWithLabel
                id="search"
                value={searchTerm}
                onInputChange={handleSearch}
                isFocused={true}
            >
                <strong className="m-2">Search:</strong>
            </InputWithLabel>

            <h2>My List</h2>
            {/* we are passing our stories as a list in our List component */}
            <List list={searchedStories}/>
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