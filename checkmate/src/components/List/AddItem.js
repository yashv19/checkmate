import { Checkbox, Input } from "@mui/material";
import { useRef } from "react";
import { storeActions } from "../../store";
import { useDispatch } from "react-redux";

const AddItem = props => {
    const todoRef = useRef();
    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(
            storeActions.addItem(
                {
                    id: Date.now(),
                    checked: false,
                    todo: todoRef.current.value,
                }
            )
        )
        todoRef.current.value = '';
    }
    return (
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
    )
}

export default AddItem;