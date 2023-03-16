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
                    id: Math.random(),
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
                margin="none"
                startAdornment={<Checkbox sx={{ pl: 0 }} disabled />}
                inputRef={todoRef}
            />
        </form>
    )
}

export default AddItem;