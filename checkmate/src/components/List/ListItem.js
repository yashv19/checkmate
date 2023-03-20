import { Typography, Checkbox } from "@mui/material";
import { storeActions } from "../../store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import classes from './ListItem.module.css';
import { Box } from "@mui/system";

const ListItem = props => {
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
        m: 0,
        borderRadius: '0.5rem',
    }
    if (showHover) {
        sx = {
            ...sx,
            backgroundColor: 'rgba(240, 240, 240);',
        }
    }

    return (
        <Box
            className={classes.liclass} 
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            sx={sx}
        >
            <div className={classes.lileft}>
                <Checkbox disableRipple checked={props.item.checked} onChange={checkHandler} />
                <Typography> {props.item.todo} </Typography>
            </div>
            {/* <div className={classes.liright}>
                <p>actions</p>
            </div> */}
        </Box>
    )
}

export default ListItem;