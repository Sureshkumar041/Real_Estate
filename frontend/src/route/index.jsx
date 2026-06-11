import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "../Components/LoginComponent/loginscreen";

const AppRoutes = () => {

    return (
        <HashRouter>
            {/* <BrowserRouter> */}
            <Routes>
                <Route path="/" element={<LoginScreen />} />
            </Routes>
            {/* </BrowserRouter> */}
        </HashRouter>
    )
}

export default AppRoutes;