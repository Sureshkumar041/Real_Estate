import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

    const userData = localStorage.getItem("token")

    if (!userData) return <Navigate replace to="/" />

    return children;
}

export default ProtectedRoute;