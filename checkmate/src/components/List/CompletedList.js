import CompletedListItem from './CompletedListItem';

const listItems = [
    {
        id: 1,
        todo: 'Get Brian up to date API vs Export mapping file'
    },
    {
        id: 2,
        todo: 'eDisco script to export a channel'
    },
    {
        id: 3,
        todo: 'Explore platform 2.0'
    },
    {
        id: 4,
        todo: 'Wellness reimbursement'
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