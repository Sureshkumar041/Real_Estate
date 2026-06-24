import { Link, useResolvedPath } from "react-router-dom";
import "./style.css";
import { useEffect, useRef, useState } from "react";

const menuItems = [
    {
        title: "Home",
        link: "/home",
    },
    {
        title: "Services",
        link: "/service",
        // children: [
        //     { title: "Web Design", link: "/web-design" },
        //     { title: "Development", link: "/development" },
        //     {
        //         title: "More Services",
        //         children: [
        //             { title: "SEO", link: "/seo" },
        //             { title: "Marketing", link: "/marketing" },
        //             { title: "Consulting", link: "/consulting" },
        //         ],
        //     },
        // ],
    },
    {
        title: "File Explorer",
        link: "/file-explorer",
    },
];


export default function Navbar({ data }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null), menuBtnRef = useRef(null),
        pathName = useResolvedPath();


    function MenuItem({ item }) {
        return (
            <li className={item.children ? "has-children" : ""}>
                <Link to={item.link || "#"}
                    className={pathName.pathname.includes(item.link) ? "active-link" : ""}
                    onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}>{item.title}</Link>

                {item.children && (
                    <ul className="submenu">
                        {item.children.map((child, index) => (
                            <MenuItem key={index} item={child} />
                        ))}
                    </ul>
                )}
            </li>
        );
    }

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

    return (
        <div className="navbar-container">
            <button
                ref={menuBtnRef}
                className="hammer-btn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>
            <nav ref={navRef} className={`navbar ${menuOpen ? "active" : ""}`}>
                <ul className="menu">
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} item={item} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}