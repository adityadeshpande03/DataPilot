import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getCurrentUser } from "../../services/user-management/authService";
import { getToken } from "../../services/user-management/tokenStorage";

function ProtectedRoute({ children }) {
    // "checking" -> "valid" | "invalid"
    const [status, setStatus] = useState(getToken() ? "checking" : "invalid");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (status !== "checking") return;

        getCurrentUser()
            .then(() => setStatus("valid"))
            .catch((error) => {
                // Token still present = server/network error, not a 401
                if (getToken()) {
                    enqueueSnackbar(error.message, { variant: "error" });
                    setStatus("valid");
                } else {
                    setStatus("invalid");
                }
            });
    }, [status, enqueueSnackbar]);

    if (status === "invalid") {
        return <Navigate to="/" replace />;
    }

    if (status === "checking") {
        return null;
    }

    return children;
}

export default ProtectedRoute;
