import { Typography, Checkbox, Input } from "@mui/material";
import { storeActions } from "../../store";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import classes from './ListItem.module.css';
import { Box } from "@mui/system";
import ActionButton from "../UI/ActionButton";
import {
    ModeEditOutlineRounded,
    DeleteRounded,
    DragIndicatorRounded,
}
    from "@mui/icons-material";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ListItem = props => {
    const dispatch = useDispatch();
    const [showHover, setShowHover] = useState(false);
    const [editing, SetEditing] = useState(false);
    const editRef = useRef(props.item.todo);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef
    } = useSortable({ id: props.item.id });

    let sx = {
        cursor: 'default',
        m: 0,
        borderRadius: '0.5rem',
        transform: CSS.Transform.toString(transform),
        transition,
    }
    if (showHover) {
        sx = {
            ...sx,
            backgroundColor: 'rgba(240, 240, 240);',
        }
    }
    let editSx = {
        borderRadius: '0.5rem',
        boxShadow: "0 0 0.5rem 0.1rem rgba(96, 96, 96, 0.269)"
    }

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
    const deleteHandler = () => {
        dispatch(
            storeActions.deleteItem({
                id: props.item.id
            })
        )
    }
    const editFocusHandler = () => {
        SetEditing(true);
    }
    const editBlurHandler = () => {
        SetEditing(false);
        setShowHover(false);
    }
    const editSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(
            storeActions.updateItem({
                ...props.item,
                todo: editRef.current.value,
            })
        );
        SetEditing(false);
        setShowHover(false);
    }

    const listItem = <Box
        className={classes.liclass}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        sx={sx}
        ref={setNodeRef}
        {...attributes}
    >
        <div className={classes.lileft}>
            <Checkbox disableRipple checked={props.item.checked} onChange={checkHandler} />
            <Typography> {props.item.todo} </Typography>
        </div>
        {showHover && <div className={classes.liright}>
            <ActionButton
                sx={{ backgroundColor: "rgb(0, 128, 255)" }}
                onClick={editFocusHandler}
            >
                <ModeEditOutlineRounded sx={{ width: "1rem", height: "1rem" }} />
            </ActionButton>
            <ActionButton sx={{ backgroundColor: "rgb(255, 90, 90)" }} onClick={deleteHandler}>
                <DeleteRounded sx={{ width: "1rem", height: "1rem" }} />
            </ActionButton>
            <ActionButton ref={setActivatorNodeRef} {...listeners}>
                <DragIndicatorRounded sx={{ color: "gray" }} />
            </ActionButton>
        </div>}
    </Box>;

    const editingItem = <form onSubmit={editSubmitHandler}>
        <Input
            type="text"
            fullWidth
            autoFocus
            disableUnderline
            sx={editSx}
            startAdornment={<Checkbox disabled />}
            inputRef={editRef}
            defaultValue={props.item.todo}
            onBlur={editBlurHandler}
        // endAdornment={
        //     <InputAdornment position="end">
        //         <ActionButton
        //             sx={{ backgroundColor: "rgb(0, 128, 255)" }}

        //         >
        //             <CheckRounded sx={{ width: "1rem", height: "1rem" }} />
        //         </ActionButton>
        //     </InputAdornment>
        // }
        />
    </form>;

    return (
        <>
            {!editing && listItem}
            {editing && editingItem}
        </>
    );
}

export default ListItem;