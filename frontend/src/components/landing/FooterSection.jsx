import { Box, Container, Typography } from "@mui/material";

function FooterSection() {
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                borderTop: 1,
                borderColor: "divider",
                backgroundColor: "background.default",
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    textAlign: { xs: "center", sm: "left" },
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    DataPilot
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    © {year} DataPilot. AI-powered data analysis through natural
                    language.
                </Typography>
            </Container>
        </Box>
    );
}

export default FooterSection;
