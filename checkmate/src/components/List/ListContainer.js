import Card from "../Card";
import AddItem from "./AddItem";
import CompletedList from "./CompletedList";
import List from "./List";
import { Divider, Typography } from "@mui/material";
import classes from './ListContainer.module.css';

const ListContainer = props => {
    return (
        <Card className={classes.list}>
            <AddItem />
            <List />
            <Divider sx={{m: '0.3rem'}} />
            <Typography
                variant="caption"
                align="left"
                sx={{mx: 1, fontStyle: "italic"}}
            >
                Completed
            </Typography>
            <CompletedList />
        </Card>
    )
}

export default ListContainer;