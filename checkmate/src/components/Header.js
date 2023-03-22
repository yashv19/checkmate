import { Typography } from '@mui/material';
import Card from './Card';
import classes from './Header.module.css';


const Header = props => {
    return (
        <Card className={classes.title}>
            <Typography variant="h4" sx={{fontWeight: '600', fontStyle: "italic"}}>✔ Check Mate</Typography>
        </Card>
    )
}

export default Header;