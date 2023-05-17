import frontPage from '../../../Image/FrontPage.jpg'
import './frontPageImage.css'

const FrontPageImage = () => {

    const imgStyle = {
        height : 560,
        width : 650
    }

    const image = () => {
        return (
            <div className='frontPage'>
                <img src={frontPage} className='' style={imgStyle} alt='' />
            </div>
        )
    }
    return (
        <>
            {image()}
        </>
    )
}

export default FrontPageImage;