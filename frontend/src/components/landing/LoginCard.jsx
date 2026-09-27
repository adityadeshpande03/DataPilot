import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import FormInput from "../common/FormInput";
import dataPilotLogo from "../../assets/DataPilotLogo.png";

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event) {
        event.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password);
    }

    return (
        <Card
            sx={{
                width: '400px',
                maxwidth: 420,
            }}
        >
            <CardContent
                sx={{
                    p:4,
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
                    Login to continue.
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
                        fullWidth
                    >
                        Login
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default LoginCard;