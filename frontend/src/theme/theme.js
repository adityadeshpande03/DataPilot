import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#006FE6",
            dark: "#004FA8",
            light: "#3D9BFF",
            contrastText: "#FFFFFF",
        },

        secondary: {
            main: "#00B8C8",
            dark: "#008B99",
            light: "#3DDAE5",
            contrastText: "#FFFFFF",
        },

        background: {
            default: "#F0F8FF",
            paper: "#FFFFFF",
        },

        text: {
            primary: "#0B1930",
            secondary: "#5B6678",
        },

        divider: "#E2EAF2",

        success: {
            main: "#16A34A",
        },

        error: {
            main: "#DC2626",
        },
    },

    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

        h1: {
            fontSize: "3.5rem",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
        },

        h2: {
            fontSize: "2.75rem",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
        },

        h3: {
            fontSize: "2.25rem",
            fontWeight: 700,
            lineHeight: 1.2,
        },

        h4: {
            fontSize: "1.75rem",
            fontWeight: 600,
            lineHeight: 1.3,
        },

        h5: {
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.4,
        },

        h6: {
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.4,
        },

        body1: {
            fontSize: "1rem",
            lineHeight: 1.6,
        },

        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.5,
        },

        button: {
            fontSize: "0.95rem",
            fontWeight: 600,
            textTransform: "none",
        },
    },

    shape: {
        borderRadius: 12,
    },

    shadows: [
        "none",
        "0 1px 3px rgba(11, 25, 48, 0.06)",
        "0 4px 8px rgba(11, 25, 48, 0.08)",
        "0 8px 16px rgba(11, 25, 48, 0.08)",
        "0 12px 24px rgba(11, 25, 48, 0.10)",
        "0 16px 32px rgba(11, 25, 48, 0.10)",
        "0 20px 40px rgba(11, 25, 48, 0.12)",
        "0 24px 48px rgba(11, 25, 48, 0.12)",
        "0 30px 60px rgba(11, 25, 48, 0.14)",
        "0 36px 72px rgba(11, 25, 48, 0.14)",
        "0 40px 80px rgba(11, 25, 48, 0.16)",
        "0 48px 96px rgba(11, 25, 48, 0.16)",
        "0 56px 112px rgba(11, 25, 48, 0.18)",
        "0 64px 128px rgba(11, 25, 48, 0.18)",
        "0 72px 144px rgba(11, 25, 48, 0.20)",
        "0 80px 160px rgba(11, 25, 48, 0.20)",
        "0 88px 176px rgba(11, 25, 48, 0.20)",
        "0 96px 192px rgba(11, 25, 48, 0.20)",
        "0 104px 208px rgba(11, 25, 48, 0.20)",
        "0 112px 224px rgba(11, 25, 48, 0.20)",
        "0 120px 240px rgba(11, 25, 48, 0.20)",
        "0 128px 256px rgba(11, 25, 48, 0.20)",
        "0 136px 272px rgba(11, 25, 48, 0.20)",
        "0 144px 288px rgba(11, 25, 48, 0.20)",
    ],

    components: {
        MuiCard: {
            defaultProps: {
                elevation: 2,
            },

            styleOverrides: {
                root: {
                    border: "1px solid #E2EAF2",
                },
            },
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },

            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontWeight: 600,
                    textTransform: "none",

                    transition: "all 0.2s ease",

                    "&:hover": {
                        transform: "translateY(-1px)",
                    },
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },
    },
});

export default theme;