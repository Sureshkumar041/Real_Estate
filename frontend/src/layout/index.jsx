import { Outlet, useNavigate } from "react-router-dom";
import "./style.css"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./sidebar";
import PaperPlane from "../assets/gif/Paperplane.gif"
import ThemeToggle from "../Components/ThemeToggle";
import { GoSignOut } from "react-icons/go";



const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()
    const { setUserDetail } = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.clear();
        setUserDetail(null)
        navigate("/")
        toast.success("Logout Successfully.", {
            position: "top-right"
        })
    }

    return (
        <div className="layout">
            <header className="header">
                <div className="logo">

                    <img src={PaperPlane} alt="gif" />
                    {/* Into New World
                    <span className="loading-dots"></span> */}
                </div>

                <Navbar data={{ menuOpen, setMenuOpen }} />

                <div className="header-theme-logout">
                    <ThemeToggle />
                    <button className="logout-btn" onClick={() => handleLogout()}>Logout</button>
                    <button className="logout-btn-container">
                        <GoSignOut className="logout-btn-icon" onClick={() => handleLogout()} />
                    </button>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;