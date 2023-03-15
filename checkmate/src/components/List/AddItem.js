import { Checkbox, Input } from "@mui/material";

const AddItem = props => {
    return (
        <Input
            fullWidth
            disableUnderline
            placeholder="Write something"
            margin="none"
            startAdornment={<Checkbox sx={{pl: 0}} disabled />}
        />
    )
}

export default AddItem;