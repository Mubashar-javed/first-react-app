import React, {useState} from 'react';


const Example = () => {
    const [count, changeCount] = useState(0);

    return (
        <>
            <button className="btn btn-primary m-2" onClick={() => changeCount(count + 1)}>Increase</button>
            <button className="btn btn-primary m-2" onClick={() => changeCount(count - 1)}>Decrease</button>
            <button className="btn btn-danger m-2" onClick={() => changeCount(0)}>Reset</button>
            {count !== 0 ?
                <p>You press this button <strong>{count}</strong> times.</p> : ''}
        </>
    );
}

export default Example;