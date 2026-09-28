import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/user-management/authService";
import { getToken } from "../../services/user-management/tokenStorage";

function ProtectedRoute({ children }) {
    // "checking" -> "valid" | "invalid"
    const [status, setStatus] = useState(getToken() ? "checking" : "invalid");

    useEffect(() => {
        if (status !== "checking") return;

        getCurrentUser()
            .then(() => setStatus("valid"))
            .catch(() => setStatus("invalid"));
    }, [status]);

    if (status === "invalid") {
        return <Navigate to="/" replace />;
    }

    if (status === "checking") {
        return null;
    }

    return children;
}

export default ProtectedRoute;
