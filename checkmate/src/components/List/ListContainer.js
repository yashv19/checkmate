import Card from "../Card";
import AddItem from "./AddItem";
import CompletedList from "./CompletedList";
import List from "./List";
import { Button, Divider, Typography } from "@mui/material";
import { ClearAllRounded } from "@mui/icons-material";
import classes from './ListContainer.module.css';

const ListContainer = props => {

    const clearCompletedHandler = () => {
        console.log('clear');
    }

    return (
        <Card className={classes.list}>
            <AddItem />
            <List />
            <Divider sx={{ m: '0.3rem' }} />
            <div className={classes.completedActions}>
                <Typography
                    variant="caption"
                    align="left"
                    sx={{ mx: 1, fontStyle: "italic" }}
                >
                    Completed
                </Typography>
                <Button onClick={clearCompletedHandler} startIcon={<ClearAllRounded />}>Clear</Button>
            </div>
            <CompletedList />
        </Card>
    )
}

export default ListContainer;