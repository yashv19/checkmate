import { Typography } from '@mui/material';
import Card from './base_components/Card';
import classes from './Header.module.css';


const Header = props => {
    return (
        <Card className={classes.title}>
            <Typography variant="h4" sx={{fontWeight: '600', fontStyle: "italic"}}>✔ Check Mate</Typography>
        </Card>
    )
}

export default Header;