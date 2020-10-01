import React from 'react';


const List = ({list, onRemoveItem}) => {
    return list.map(item => {
            return <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>;
        }
    );
};

const Item = ({item, onRemoveItem}) => {
    return (
        <div>
          <span>
              <a href={item.url}>{item.title}</a>
          </span>
            <p>{item.url}</p>
            <button className="btn btn-danger btn-sm"
                    onClick={() => onRemoveItem(item)}>
                Dismiss!
            </button>
            <hr/>
        </div>
    );
};
export default List;
