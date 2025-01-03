import { createTheme } from "@mui/material";

const theme = createTheme(
    {
        palette: {
            mode: 'light',
            primary: {
              main: '#548687',
            },
            secondary: {
              main: '#473335',
            },
            error: {
              main: '#B0413E',
            },
            warning: {
              main: '#FCAA67',
            },
            info: {
              main: '#6290C3',
            },
            success: {
              main: '#2e7d32',
            },
          },
    }
);

export default theme;