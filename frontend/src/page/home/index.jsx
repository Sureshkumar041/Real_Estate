import "./style.css";
import WowGif from "../../assets/gif/wow.gif"
import HeroLight from "../../assets/video/hero-light.webm"
import HeroDark from "../../assets/video/hero-dark.webm"
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const HomePage = () => {
    const { isDark } = useContext(ThemeContext)

    return (
        <div className="home">

            {/* <div className="wow-gif-container">
                <img className="wow-gif" src={WowGif} alt="gif" />
            </div> */}

            <div className="hero-vid-container">
                <video className="hero-vid" src={isDark ? HeroDark : HeroLight}></video>
            </div>

        </div>
    )
}

export default HomePage;