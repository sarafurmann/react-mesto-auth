import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwt')

    if (!token) {
        return <Navigate to="/sign-in" replace />
    }

    return children
}

