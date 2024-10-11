import { Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { storeActions } from './store/listSlice';
import { useDispatch } from "react-redux";
import classes from './ItemContainer.module.css';

const CompletedListItem = props => {
    const dispatch = useDispatch();

    const uncheckHandler = (event) => {
        dispatch(
            storeActions.uncheckTodo({
                ...props.item,
            })
        )
    }

    let sx = {
        cursor: 'default',
        fontStyle: 'italic',
        color: 'gray',
        m: 0,
        borderRadius: '0.5rem',
        "&:hover": {
            backgroundColor: 'rgba(240, 240, 240);',
        }
    }

    return (
        <Box
            sx={sx}
            className={classes.liclass} 
        >
            <div className={classes.lileft}>
                <Checkbox disableRipple checked={true} onChange={uncheckHandler} />
                <Typography> {props.item.todo} </Typography>
            </div>
        </Box>
    )
}

export default CompletedListItem;