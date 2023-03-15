import { FormControlLabel, Checkbox } from "@mui/material";

const ListItem = props => {
    return (
        <FormControlLabel
            label="item 1"
            control={<Checkbox />}
        />
    )
}

export default ListItem;