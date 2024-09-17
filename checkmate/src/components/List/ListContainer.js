import AddItem from "./AddItem";
import CompletedList from "./CompletedList";
import List from "./List";
import { Button, Divider, Typography, Box } from "@mui/material";
import { ClearAllRounded } from "@mui/icons-material";
import classes from './ListContainer.module.css';
import { useDispatch } from "react-redux";
import { storeActions } from './store/listSlice';

const ListContainer = props => {
    const dispatch = useDispatch();

    const clearCompletedHandler = () => {
        dispatch(storeActions.clearCompleted());
    }

    return (
        <Box className={classes.list}>
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
        </Box>
    )
}

export default ListContainer;