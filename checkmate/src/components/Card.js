import classes from './Card.module.css';
import { Box } from '@mui/system';

const Card = props => {
    return <Box 
                disableGutters
                className={`${props.className} ${classes.card}`}
            >
        {props.children}
    </Box>
}

export default Card;