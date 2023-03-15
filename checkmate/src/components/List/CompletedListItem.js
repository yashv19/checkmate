import { FormControlLabel, Checkbox } from "@mui/material";

const CompletedListItem = props => {
    return (
        <FormControlLabel
            sx={{
                cursor: 'default',
                fontStyle: 'italic',
                color: 'gray'
            }}
            label={props.todo}
            control={<Checkbox defaultChecked/>}
        />
    )
}

export default CompletedListItem;