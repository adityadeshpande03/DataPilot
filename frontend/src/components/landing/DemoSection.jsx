import { Box, Container, Typography } from "@mui/material";

function DemoSection() {
    return (
        <Box
            component="section"
            sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#F8FBFF" }}
        >
            <Container maxWidth="md" sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    See DataPilot in action
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", maxWidth: 560, mx: "auto", mb: 5 }}
                >
                    Explore how DataPilot turns your data into actionable
                    insights using natural language.
                </Typography>

                <Box
                    component="video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{
                        width: "100%",
                        maxWidth: 800,
                        display: "block",
                        mx: "auto",
                        borderRadius: 3,
                    }}
                >
                    <source src="/videos/LandingPageVideo.webm" type="video/webm" />
                </Box>
            </Container>
        </Box>
    );
}

export default DemoSection;
