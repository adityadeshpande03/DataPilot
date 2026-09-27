import {
    Box,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                px: 3,
            }}
        >
            <CircularProgress
                size={70}
                thickness={3}
                sx={{
                    mb: 4,
                    color: "primary.main",
                }}
            />

            <Typography
                variant="h3"
                sx={{
                    fontWeight: 700,
                    mb: 2,
                }}
            >
                Welcome to DataPilot
            </Typography>

            <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                    maxWidth: 600,
                    fontWeight: 400,
                    mb: 1,
                }}
            >
                We are currently working on something great.
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    mb: 4,
                }}
            >
                The application is still under development.
                Please check again after some time.
            </Typography>

            <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Box>
    );
}

export default HomePage;