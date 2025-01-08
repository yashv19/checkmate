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
          components: {
            MuiButton: {
              styleOverrides: {
                root: {
                  color: "inherit",
                  fontWeight: "bold",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(179, 179, 179, 0.407)",
                  borderRadius: '8px',
                  width: "auto",
                  height: '3rem',
                  padding: "auto",
                  transition: "transform 0.1s ease, box-shadow 0.1s ease",
                  boxShadow: "inset 0px -2px rgb(186, 186, 186)",
                  "&:hover": {
                    filter: "brightness(0.95)",
                    transform: "translateY(-3px)"
                  },
                  "&:active": {
                    transform: "translateY(2px)",
                    boxShadow: "inset 0px -2px rgb(186, 186, 186)"
                  }
                }
              }
            },
            MuiButtonBase: {
              defaultProps: {
                disableRipple: true,
              },
            }
          }
    }
);

export default theme;