import { Checkbox, Divider, Input } from "@mui/material";
import { useRef } from "react";
import { storeActions } from './store/listSlice';
import { useDispatch } from "react-redux";
import {Button } from "@mui/material";

const AddItem = props => {
    const todoRef = useRef();
    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(
            storeActions.addItem(
                {
                    id: Date.now(),
                    type: 'todo_list_item',
                    todo: todoRef.current.value,
                }
            )
        )
        todoRef.current.value = '';
    }
    const newSectionHandler = (event) => {
        event.preventDefault();
        dispatch(
            storeActions.addItem(
                {
                    id: Date.now(),
                    type: 'section_header',
                    todo: 'New Section',
                    emojiId: "card_index_dividers"
                }
            )
        )
    }
    return (
        <>
            <Button 
                // startIcon={< AddRounded/>}
                sx={{
                    alignSelf: 'end',
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    height: "auto",
                    fontWeight: "normal",
                    "&:hover": {
                        boxShadow: "none"
                    }
                }}
                onClick={newSectionHandler}
                disableRipple
            >
                ➕ New Section
            </Button>
            <Divider />
            <form onSubmit={submitHandler}>
                <Input
                    fullWidth
                    autoFocus
                    disableUnderline
                    placeholder="Write something"
                    startAdornment={<Checkbox disabled />}
                    inputRef={todoRef}
                />
            </form>
        </>
    )
}

export default AddItem;