import ItemContainer from "./ItemContainer";
import { Typography, Input } from "@mui/material";
import { storeActions } from './store/listSlice';
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import SelectableEmoji from "../base_components/SelectableEmoji";

const ListSectionHeader = props => {
    const dispatch = useDispatch();

    const [editing, SetEditing] = useState(false);
    const editRef = useRef(props.item.todo);

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
        p: "0.6rem",
        borderRadius: '0.5rem',
        boxShadow: "0 0 0.5rem 0.1rem rgba(96, 96, 96, 0.269)",
    }

    const sectionHeader = <div style={{paddingLeft: "0.2rem"}}>
        <Typography variant="h5" sx={{fontWeight: 'bold'}}> {props.item.todo} </Typography>
    </div>;

    const editingHeader = <form onSubmit={editSubmitHandler}>
        <Input
            type="text"
            fullWidth
            autoFocus
            disableUnderline
            sx={editSx}
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
            <SelectableEmoji emoji="🙌" />
            {!editing && sectionHeader}
            {editing && editingHeader}
        </ItemContainer>
    )
};

export default ListSectionHeader;