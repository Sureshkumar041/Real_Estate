import "./style.css";
import WowGif from "../../assets/gif/wow.gif"

const HomePage = () => {
    return (
        <div className="home">

            <div className="wow-gif-container">
                <img className="wow-gif" src={WowGif} alt="gif" />
            </div>

        </div>
    )
}

export default HomePage;