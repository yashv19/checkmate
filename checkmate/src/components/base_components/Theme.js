import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#548687'
    },
    secondary: {
      main: '#473335'
    },
    error: {
      main: '#B0413E'
    },
    warning: {
      main: '#FCAA67'
    },
    info: {
      main: '#6290C3'
    },
    success: {
      main: '#2e7d32'
    }
  },
  typography: {
    fontFamily: 'Lato, sans-serif'
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: 'inherit',
          fontWeight: 'bold',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(179, 179, 179, 0.407)',
          borderRadius: '8px',
          width: 'auto',
          height: '3rem',
          padding: 'auto',
          transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          boxShadow: 'inset 0px -2px rgb(186, 186, 186)',
          '&:hover': {
            filter: 'brightness(0.95)',
            transform: 'translateY(-3px)'
          },
          '&:active': {
            filter: 'brightness(0.92)',
            transform: 'translateY(2px)',
            boxShadow: 'inset 0px -2px rgb(186, 186, 186)'
          }
        }
      }
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          color: '#656565',
          borderRadius: '0.4rem',
          height: '1.5rem',
          width: '1.5rem',
          margin: '0.2rem',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)'
          },
          '&:active': {
            filter: 'brightness(90%)'
          }
        }
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        disableInteractive: true,
        placement: 'left'
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: "#000",
          fontSize: "0.8rem"
        },
        arrow: {
          color: "#000"
        }
      }
    }
  }
})

export default theme
