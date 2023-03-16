import CompletedListItem from './CompletedListItem';
import { useSelector } from 'react-redux';

let renderedCompletedList;

const CompletedList = props => {
    let todos = useSelector(state => state.todos);

    if (todos.length > 0) {
        todos = todos.filter(todo => todo.checked)
        renderedCompletedList = todos.map(item => {
            return <CompletedListItem item={item} key={item.id} />
        });
    }

    return (
        <>
            {renderedCompletedList}
        </>
    )
}

export default  CompletedList;