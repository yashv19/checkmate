import { FormControlLabel, Checkbox } from "@mui/material";
import { storeActions } from "../../store";
import { useDispatch } from "react-redux";

const CompletedListItem = props => {
    const dispatch = useDispatch();

    const checkHandler = (event) => {
        dispatch(
            storeActions.updateItem({
                ...props.item,
                checked: event.target.checked,
            })
        )
    }

    return (
        <FormControlLabel
            sx={{
                cursor: 'default',
                fontStyle: 'italic',
                color: 'gray'
            }}
            label={props.item.todo}
            control={<Checkbox checked={props.item.checked} onChange={checkHandler} />}
        />
    )
}

export default CompletedListItem;