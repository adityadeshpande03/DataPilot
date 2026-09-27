import { Box, Typography } from "@mui/material";

function HeroSection() {
    return (
        <Box
            sx={{
                maxWidth: 700,
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    mb: 2,
                }}
            >
                Intelligent Data Analysis
            </Typography>

            <Typography
                component="h1"
                sx={{
                    fontSize: {
                        xs: "2.5rem",
                        md: "3.5rem",
                        lg: "4rem",
                    },
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: "-0.04em",
                    color: "text.primary",
                    mb: 3,
                }}
            >
                AI-powered data analysis{" "}
                <Box
                    component="span"
                    sx={{
                        background:
                            "linear-gradient(90deg, #006FE6, #00B8C8)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    through natural language.
                </Box>
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    maxWidth: 620,
                    color: "text.secondary",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                }}
            >
                Upload your spreadsheets and datasets, ask questions in
                natural language, and let DataPilot transform your data into
                meaningful insights.
            </Typography>
        </Box>
    );
}

export default HeroSection;