import ListItem from './ListItem';

const listItems = [
    {
        id: 1,
        todo: 'Update the mapping file with recent data'
    },
    {
        id: 2,
        todo: 'Figure out which database to use for this app'
    },
    {
        id: 3,
        todo: 'Make lunch'
    },
    {
        id: 4,
        todo: 'Wellness reimbursement'
    },
];

const List = props => {
    return (
        <>
            {listItems.map(item => <ListItem todo={item.todo} key={item.id} />)}
        </>
    )
}

export default  List;