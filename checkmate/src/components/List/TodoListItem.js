import ItemContainer from "./ItemContainer";
import classes from './ItemContainer.module.css';
import { Typography, Checkbox, Input } from "@mui/material";
import { storeActions } from "../../store";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";

const TodoListItem = props => {
    const dispatch = useDispatch();

    const [editing, SetEditing] = useState(false);
    const editRef = useRef(props.item.todo);

    const checkHandler = () => {
        dispatch(
            storeActions.completeItem({
                ...props.item,
            })
        )
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
    }
    let editSx = {
        borderRadius: '0.5rem',
        boxShadow: "0 0 0.5rem 0.1rem rgba(96, 96, 96, 0.269)"
    }

    const listItem = <div className={classes.lileft}>
        <Checkbox disableRipple checked={false} onChange={checkHandler} />
        <Typography> {props.item.todo} </Typography>
    </div>;

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
        />
    </form>;

    return (
        <ItemContainer
            onEdit={editFocusHandler}
            onDelete={deleteHandler}
            id={props.item.id}
        >
            {!editing && listItem}
            {editing && editingItem}
        </ItemContainer>
    )
};

export default TodoListItem;