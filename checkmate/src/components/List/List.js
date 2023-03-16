// import { Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { useSelector } from 'react-redux';

let renderedList;

const List = props => {
    const todos = useSelector(state => state.todos);
    // const [emptyList, setEmptyList] = useState(true);
    if (todos.length > 0) {
        renderedList = todos.map(item => {
            if (!item.completed) {
                return <ListItem todo={item.todo} key={item.id} />
            }
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

export default  List;