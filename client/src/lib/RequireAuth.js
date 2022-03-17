import { useAuth } from "../hooks/authHook";
import { Navigate, useLocation } from "react-router";

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.accessToken || !sessionStorage.getItem('accessToken')) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;