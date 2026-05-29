import '@mui/x-date-pickers-pro/themeAugmentation';
import { createTheme, type Theme } from '@mui/material/styles';
import { itIT as pickersIt } from '@mui/x-date-pickers/locales';

declare module '@mui/material/styles' {
  interface TypeBackground {
    layout: string;
  }
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#42bb1d",
    },
    secondary: {
      main: "#378f1c",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      layout: "#212127"
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
      disabled: "#787878"
    }
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: 16,
          minHeight: 48,
          lineHeight: "23px"
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary
        })
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          borderRadius: 16,
        })
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 32,
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        subheader: ({theme}) => ({
          color: theme.palette.text.primary
        })
      }
    },

    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      }
    },

    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 16,
          },
        },
      },
    },

    MuiDateRangeCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fafafa',
          borderRadius: 16,
          overflow: "hidden"
        },
      },
    },

    MuiPickerPopper: {
      styleOverrides: {
        paper: {
          borderRadius: 32
        }
      }
    },

    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          // come fallback: applica sui figli
          '& .MuiPickersCalendarHeader-dayLabel': {
            color: '#ff5722', // colore delle lettere dei giorni
          },
        },
        
      },
    },

    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      }
    },

    MuiPickersToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({   
          '& .MuiTypography-root.MuiPickersToolbar-title': {
            color: theme.palette.text.primary,
          },
          '& .MuiTypography-root.MuiPickersToolbarText-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiTypography-root.MuiPickersToolbarText-root[data-selected]': {
            color: theme.palette.secondary.contrastText,
          }
        }),
        content: {
          '& .MuiTypography-root.MuiTypography-h5': {
            display: "flex",
            alignItems: "center"
          }
        }
      }
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 0.2,
          fontSize: 11
        }
      }
    }

  },
}, pickersIt);

export default theme;