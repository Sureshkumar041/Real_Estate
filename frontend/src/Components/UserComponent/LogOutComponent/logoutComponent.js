import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";

const LogOutComponent = () => {
    const nxtPage = () => {
        console.log("Clear Done...");
        localStorage.clear()
    }

    const logOut = () => {
        return (
            <Link to='/realestate/login' >
                <p>
                    <button className="btn btn-outline-info border-0 w-75" onClick={() => nxtPage()} >
                        <SlLogout className="text-white mx-3" />
                        Logout
                    </button>
                </p>
            </Link>
        )
    }

    return (
        <>
            {logOut()}
        </>
    )
}

export default LogOutComponent;