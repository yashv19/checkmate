import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = props => {
    const title = 'Check mate';

    return <AppBar position="static">
        <Toolbar>
            <Typography variant="h3">
                Check Mate
            </Typography>
        </Toolbar>
    </AppBar>
}

export default Header;