import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "../page/login/loginscreen";
import HomePage from "../page/home";
import ProtectedRoute from "./protectedRoutes";
import DashboardPage from "../page/dashboard";
import Layout from "../layout";
import PageNotFound from "../page/pageNotFound";

// HashRouter
// Add HashRouter before going to deploy FE

const AppRoutes = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route element={<Layout />}>
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes;