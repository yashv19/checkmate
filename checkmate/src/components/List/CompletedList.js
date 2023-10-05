import CompletedListItem from './CompletedListItem';
import { useSelector } from 'react-redux';

let renderedCompletedList;

const CompletedList = props => {
    let completedList = useSelector(state => state.completed);
    renderedCompletedList = completedList.map(item => {
        return <CompletedListItem item={item} key={item.id} />
    });

    return (
        <>
            {renderedCompletedList}
        </>
    )
}

export default  CompletedList;