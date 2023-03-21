import { IconButton } from "@mui/material";

const ActionButton = props => {

    const sx = {
        ...props.sx,
        color: "white",
        borderRadius: "0.4rem",
        height: "1.5rem",
        width: "1.5rem",
        marginRight: "0.4rem"
    }
    return (
        <IconButton
            disableRipple
            sx={sx}
            onClick={props.onClick}
            onBlur={props.onBlur}
        >
            {props.children}
        </IconButton>
    )
}

export default ActionButton;