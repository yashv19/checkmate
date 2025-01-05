import { Button } from "@mui/material"
import classes from './TextButton.module.css'

const TextButton = ({children, className, ...buttonProps}) => {
    return (
        <Button
            disableRipple
            className={`${classes.button} ${className}`}
            {...buttonProps}
        >
            {children}
        </Button>
    )
}

export default TextButton