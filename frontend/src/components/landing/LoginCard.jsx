import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import FormInput from "../common/FormInput";
import dataPilotLogo from "../../assets/DataPilotLogo.png";
import { authenticateUser } from "../../services/user-management/authService";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const result = await authenticateUser(email, password);

            enqueueSnackbar(result.message, { variant: 'success' });

            console.log("Authentication successful:", result);

            navigate('/home');

        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            console.error("Authentication failed:", error.message);
        }
    }

    return (
        <Card
            elevation={5}
            sx={{
                width: '100%',
                maxWidth: 380,

                transition: 'transform 0.25s ease, box-shadow 0.25s ease',

                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                },
            }}
        >
            <CardContent
                sx={{
                    p: 4,
                }}
            >
                <Box
                    component="img"
                    src={dataPilotLogo}
                    alt="DataPilot"
                    sx={{
                        width: 180,
                        height: 'auto',
                        display: 'block',
                        mx: 'auto',
                        mb: 3,
                    }}
                />

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 3,
                        textAlign: 'center',
                    }}
                >
                    Enter details to continue.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <FormInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <FormInput
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login / Sign Up
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default LoginCard;