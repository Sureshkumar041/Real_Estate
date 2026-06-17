import "./style.css";
import PageNotFoundImg from "../../assets/image/error-404.webp"

const PageNotFound = () => {
    return (
        <div className="home">

            <div className="wow-gif-container">
                <img className="wow-gif" src={PageNotFoundImg} alt="gif" />
            </div>

        </div>
    )
}

export default PageNotFound;