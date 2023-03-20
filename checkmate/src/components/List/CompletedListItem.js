import { Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { storeActions } from "../../store";
import { useDispatch } from "react-redux";
import classes from './ListItem.module.css';
import { useState } from "react";

const CompletedListItem = props => {
    const dispatch = useDispatch();
    const [showHover, setShowHover] = useState(false);

    const checkHandler = (event) => {
        dispatch(
            storeActions.updateItem({
                ...props.item,
                checked: event.target.checked,
            })
        )
    }
    const mouseEnterHandler = () => {
        setShowHover(true);
    }
    const mouseLeaveHandler = () => {
        setShowHover(false);
    }

    let sx = {
        cursor: 'default',
        fontStyle: 'italic',
        color: 'gray',
        m: 0,
        borderRadius: '0.5rem'
    }
    if (showHover) {
        sx = {
            ...sx,
            backgroundColor: 'rgba(240, 240, 240);',
        }
    }

    return (
        <Box
            sx={sx}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className={classes.liclass} 
        >
            <div className={classes.lileft}>
                <Checkbox disableRipple checked={props.item.checked} onChange={checkHandler} />
                <Typography> {props.item.todo} </Typography>
            </div>
        </Box>
    )
}

export default CompletedListItem;