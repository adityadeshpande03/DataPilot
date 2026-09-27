import { Box } from "@mui/material";
import HeroSection from "../components/landing/HeroSection";
import LoginCard from "../components/landing/LoginCard";
import DemoSection from "../components/landing/DemoSection";
import FooterSection from "../components/landing/FooterSection";

function LandingPage() {
    return (
        <Box>
            {/* First viewport */}
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: {
                        xs: 3,
                        md: 7,
                        lg: 10,
                    },
                    py: 6,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 1400,
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: {
                            xs: 6,
                            md: 10,
                        },
                    }}
                >
                    {/* Left */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <HeroSection />
                    </Box>

                    {/* Right */}
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 380,
                            flexShrink: 0,
                        }}
                    >
                        <LoginCard />
                    </Box>
                </Box>
            </Box>

            {/* Second section */}
            <DemoSection />

            <FooterSection />
        </Box>
    );
}

export default LandingPage;