import { FormControlLabel, Checkbox } from "@mui/material";

const ListItem = props => {
    return (
        <FormControlLabel
            sx={{
                cursor: 'default'
            }}
            label={props.todo}
            control={<Checkbox />}
        />
    )
}

export default ListItem;