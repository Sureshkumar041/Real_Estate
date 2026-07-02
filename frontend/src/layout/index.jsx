import { Outlet, useNavigate } from "react-router-dom";
import "./style.css"
import { useContext, useId, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./sidebar";
import PaperPlane from "../assets/gif/Paperplane.gif"
import ThemeToggle from "../Components/ThemeToggle";
import { GoSignOut } from "react-icons/go";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Layout = () => {
    const id = useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [menuOpen, setMenuOpen] = useState(false),
        [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const { userDetail, setUserDetail } = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.clear();
        setUserDetail(null)
        navigate("/")
        toast.success("Logout Successfully.", {
            position: "top-right"
        })
    }

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


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
                    <Avatar sx={{ bgcolor: "#59a8d9" }}
                        id={buttonId}
                        aria-controls={open ? menuId : undefined}
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={handleAvatarClick} >{String(userDetail?.email)?.at(0)}</Avatar>
                    <Menu
                        className="avatar-menu"
                        id={menuId}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': buttonId,
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;