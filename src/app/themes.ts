"use client";

import { Inter } from "next/font/google";
import {
    experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

export const theme = extendTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                lineHeight: 1
            }
        },
        MuiSwitch: {
            styleOverrides: {
                track: {
                    backgroundColor: "#9e9e9e"
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    transform: 'translate(14px, 8px) scale(1)',
                },
                shrink: {
                    transform: 'translate(14px, -9px) scale(0.75) !important',
                },
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    minHeight: "32px",
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                stickyHeader: true,
            }
        }
    },
    typography: {
        fontFamily: inter.style.fontFamily
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#157fcc",
                },
                background: {
                    paper: "#fff",
                },
                secondary: {
                    main: "#f50057",
                },
                common: {
                    onBackground: "0,0,0",
                    onBackgroundChannel: "0,0,0"
                },
            },
        },

        dark: {
            palette: {
                primary: {
                    main: "#f44336",
                },
                background: {
                    paper: "#000",
                },
                secondary: {
                    main: "#f50057",
                },
                common: {
                    onBackground: "255,255,255",
                    onBackgroundChannel: "255,255,255"
                }
            }
        }
    }
})

