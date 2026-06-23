import { Link } from "react-router-dom";
import "./style.css";

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
        title: "Content",
        link: "/confluence",
    },
];

function MenuItem({ item }) {
    return (
        <li className={item.children ? "has-children" : ""}>
            <Link to={item.link || "#"}>{item.title}</Link>

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

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul className="menu">
                {menuItems.map((item, index) => (
                    <MenuItem key={index} item={item} />
                ))}
            </ul>
        </nav>
    );
}