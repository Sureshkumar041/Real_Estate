import { AuthProvider } from "../contexts/AuthContext"
import { ThemeProvider } from "../contexts/ThemeContext";

const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AuthProvider>
    )
}

export default AppProvider;