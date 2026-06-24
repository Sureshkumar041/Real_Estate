import "./style.css";
import HeroLight from "../../assets/video/hero-light.webm"
import HeroDark from "../../assets/video/hero-dark.webm"
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const HomePage = () => {
    const { isDark } = useContext(ThemeContext)

    return (
        <div className="home">
            <div className="home-container">
                <div className="text-content">
                    <h3>Hi I'm Suresh...</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea. Eius numquam quasi voluptas harum culpa magnam ipsum, ratione doloremque magni dignissimos inventore repellendus a voluptatibus obcaecati error commodi aperiam accusamus alias quaerat autem placeat illo dolor rerum mollitia.
                    </p>
                    <p>
                        Necessitatibus repellendus ipsam nihil assumenda atque, repellat ipsa fuga. Harum dolores repellendus, quis deserunt ullam neque quisquam aliquid quas, odio, est velit distinctio recusandae nesciunt a libero doloremque.
                    </p>
                    <p>
                        Illo fuga ducimus quaerat magnam laudantium amet, dolorem velit ipsa. Reiciendis hic dolores id cupiditate error nam cum possimus nulla inventore, eum molestiae repellendus deleniti earum perspiciatis ullam iure eligendi blanditiis! Accusamus maxime culpa ducimus minima hic suscipit quod obcaecati odit amet eos officiis repellendus voluptatem fugiat eligendi, nobis qui. Obcaecati, accusamus.
                    </p>
                    <p>
                        Cum adipisci deleniti consectetur dignissimos id. Labore, beatae officia? Deleniti dolorum nemo molestiae ipsum odio ipsa sint minus, autem incidunt expedita recusandae qui illum fugit aspernatur. Ratione ad veniam, expedita vero quibusdam, repellendus sint sed amet dignissimos eveniet qui ducimus perferendis neque repudiandae error dolores odio similique nisi velit optio blanditiis aspernatur. Aliquam, maxime facilis.
                    </p>
                    <p>Praesentium rerum commodi, nulla ipsum et corrupti harum incidunt asperiores consequatur debitis voluptates, ipsa voluptatibus culpa, aspernatur delectus odit quae nisi provident eum. Atque, deleniti sed...
                    </p>
                </div>
                <div className="hero-vid-container">
                    <video autoPlay loop className="hero-vid" src={isDark ? HeroDark : HeroLight}></video>
                </div>
            </div>
        </div>
    )
}

export default HomePage;