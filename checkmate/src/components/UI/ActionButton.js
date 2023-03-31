import { forwardRef } from "react";
import { IconButton } from "@mui/material";

const ActionButton = forwardRef((props,ref) => {

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
            {...props}
            disableRipple
            ref={ref}
            sx={sx}
        >
            {props.children}
        </IconButton>
    )
});

export default ActionButton;