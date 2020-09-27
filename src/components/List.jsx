import React from 'react';


const List = ({list}) => {
    return (
        <>
            {list.map((item) => (
                <div key={item.objId}>
                    <a href={item.url}>{item.title}</a>
                    <p>{item.url}</p>
                    <p>{item.released}</p>
                    <hr/>
                </div>
            ))}
        </>
    );
};

export default List;