import { AuthProvider } from "../contexts/AuthContext"

const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default AppProvider;