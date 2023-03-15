import Card from '../Card'
import ListItem from './ListItem';
import classes from './List.module.css';

const List = props => {
    return (
        <Card className={classes.list}>
            <ListItem />
            <ListItem />
        </Card>
    )
}

export default  List;