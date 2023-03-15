import CompletedListItem from './CompletedListItem';

const listItems = [
    {
        id: 1,
        todo: 'Eat'
    },
    {
        id: 2,
        todo: 'Sleep'
    },
    {
        id: 3,
        todo: 'Success'
    },
    {
        id: 4,
        todo: 'Repeat.'
    },
];

const CompletedList = props => {
    return (
        <>
            {listItems.map(item => <CompletedListItem todo={item.todo} key={item.id} />)}
        </>
    )
}

export default  CompletedList;