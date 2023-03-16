// import { Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { useSelector } from 'react-redux';

let renderedList;

const List = props => {
    let todos = useSelector(state => state.todos);
    // const [emptyList, setEmptyList] = useState(true);
    if (todos.length > 0) {
        todos = todos.filter(todo => !todo.completed)
        renderedList = todos.map(item => {
            return <ListItem todo={item.todo} key={item.id} />
        });
        // setEmptyList(false);
    }

    return (
        <>
            {renderedList}
            {/* {emptyList && <Typography>Nothing todo</Typography>} */}
        </>
    )
}

export default List;