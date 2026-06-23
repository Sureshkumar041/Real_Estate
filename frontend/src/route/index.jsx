import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "../page/login/loginscreen";
import HomePage from "../page/home";
import ProtectedRoute from "./protectedRoutes";
import DashboardPage from "../page/dashboard";
import Layout from "../layout";
import PageNotFound from "../page/pageNotFound";
import FileExplorer from "../page/namaste/react/hard/fileExplorer/index"
// /home/suresh/Project/Real_Estate/frontend/src/page/namaste/react/hard/fileExplorer/index.jsx

// HashRouter
// Add HashRouter before going to deploy FE

const AppRoutes = () => {

    return (
        <BrowserRouter>
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
                    <Route path="/confluence" element={
                        <ProtectedRoute>
                            <FileExplorer />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;