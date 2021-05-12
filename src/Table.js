import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';


// function searcher(search) {
//     return function (item) {
//         return !search || item.title.toLowerCase().includes(search.toLowerCase())
//     }
// }

const Table = ({ list, remove }) => 
            <div className="table">
                {list.map(item =>
                    <div key={item.objectID} className="table-row">
                        <span style={{ width: '40%' }}>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span style={{ width: '15%' }}>{item.created_at}</span>
                        <span style={{ width: '65%' }}>{item.author}</span>
                        <span style={{ width: '25%' }}>
                            <Button
                                className="button-inline"
                                onClick={() => remove(item.objectID)}
                                type="button"
                            >
                                Remove
                            </Button>
                        </span>
                    </div>
                )}
            </div>

// const Table = (props) => {
//     const { list, pattern, remove } = props
//     return (
//         <div>
//             {list.filter(searcher(remove)).map(item =>
//                 <div key={item.id} className="App-list">
//                     <ul>
//                         <li>
//                             {item.name}
//                             {item.email}
//                             <button
//                                 className="App-list_remove"
//                                 pattern={pattern}
//                                 remove={() => remove(item.id)}
//                             >
//                                 Remove
//                     </button>
//                         </li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     )
// }

Table.propTypes = {
    list: PropTypes.array.isRequired,
    remove: PropTypes.func
}

export default Table;