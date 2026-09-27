import { Box } from '@mui/material';
import HeroSection from '../components/landing/HeroSection';
import LoginCard from '../components/landing/LoginCard';

function LandingPage() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    md: 'row',
                },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 6,
                px: {
                    xs:3,
                    md:8,
                },
                py: 6,
            }}
        >
            <HeroSection />
            <LoginCard />
        </Box>
    );
}

export default LandingPage;