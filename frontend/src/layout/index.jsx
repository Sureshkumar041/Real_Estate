import { Outlet, useNavigate, useResolvedPath } from "react-router-dom";
import "./style.css"
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./sidebar";
import PaperPlane from "../assets/gif/Paperplane.gif"
import { CiLight } from "react-icons/ci";
import ThemeToggle from "../Components/ThemeToggle";




const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null), menuBtnRef = useRef(null);
    const pathName = useResolvedPath(), navigate = useNavigate()
    const { setUserDetail } = useContext(AuthContext)

    const menuOption = [{
        label: "Home",
        path: "home",
    }, {
        label: "Dashboard",
        path: "dashboard",
    }, {
        label: "Contact",
        path: "contact",
    },
    {
        label: "Logout",
        onClick: () => handleLogout(),
        icon: "fa-solid fa-arrow-right-from-bracket"
    }]


    useEffect(() => {
        function handleClickOutside(event) {
            if (
                navRef.current &&
                !navRef.current.contains(event.target) &&
                !menuBtnRef.current?.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


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

                {/* <div className="nav-container">
                    <button
                        ref={menuBtnRef}
                        className="menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>

                    <nav ref={navRef} className={`nav ${menuOpen ? "active" : ""}`}>
                        {
                            menuOption.map((mo, mi) => (
                                !mo?.icon ?
                                    <button key={mi} className={`nav-btn ${pathName?.pathname?.includes(mo?.path) ? "active" : ""}`}
                                        onClick={() => {
                                            navigate(mo?.path);
                                            setMenuOpen(false)
                                        }}>{mo?.label}</button>
                                    :
                                    <button key={mi} className={`nav-btn`} onClick={() => handleLogout()}>
                                        <i className="fa-solid fa-arrow-right-from-bracket logout-icon"></i>
                                        &ensp; Logout
                                    </button>
                            ))
                        }
                    </nav>
                </div> */}
                <Navbar />

                <div className="header-theme-logout">
                    <ThemeToggle />
                    <button className="logout-btn" onClick={() => handleLogout()}>Logout</button>
                    {/* <i className="fa-solid fa-arrow-right-from-bracket logout-icon" onClick={() => handleLogout()}></i> */}
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;