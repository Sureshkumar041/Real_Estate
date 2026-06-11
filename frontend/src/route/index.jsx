import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "../Components/LoginComponent/loginscreen";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;