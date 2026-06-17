import "./style.css";
import AhaanGif from "../../assets/gif/Ahaan.gif"

const DashboardPage = () => {
    return (
        <div className="home">

            <div className="wow-gif-container">
                <img className="wow-gif" src={AhaanGif} alt="gif" />
            </div>

        </div>
    )
}

export default DashboardPage;