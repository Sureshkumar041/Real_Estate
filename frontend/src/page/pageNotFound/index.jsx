import "./style.css";
import PageNotFoundImg from "../../assets/image/error-404.webp"

const PageNotFound = () => {
    return (
        <div className="not-page-root">

            <div className="not-found-page-container">
                <img className="not-found-img" src={PageNotFoundImg} alt="gif" />
            </div>

        </div>
    )
}

export default PageNotFound;