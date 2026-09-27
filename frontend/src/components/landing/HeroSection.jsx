import { Box, Typography } from "@mui/material";

function HeroSection() {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 600,
            }}
        >
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    fontWeight: 700,
                    mb: 2,
                }}
            >
                DataPilot
            </Typography>

            <Typography
                variant="h5"
                sx={{
                    mb: 2,
                }}
            >
                AI-powered data analysis through natural language.
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
            >
                Upload your dataset, ask questions in plain language,
                and let DataPilot analyze your data and generate insights.
            </Typography>
        </Box>
    );
}

export default HeroSection;