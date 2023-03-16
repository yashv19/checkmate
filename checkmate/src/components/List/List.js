// import { Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { useSelector } from 'react-redux';

let renderedList;

const List = props => {
    let todos = useSelector(state => state.todos);
    // const [emptyList, setEmptyList] = useState(true);
    todos = todos.filter(todo => !todo.checked)
    renderedList = todos.slice(0).reverse().map(item => {
        return <ListItem item={item} key={item.id} />
    });


    return (
        <>
            {renderedList}
            {/* {emptyList && <Typography>Nothing todo</Typography>} */}
        </>
    )
}

export default List;