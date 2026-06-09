import { Link } from "react-router-dom";
import Header from "../../../UserComponent/HeaderComponent/header";
import './buyerSideBar.css'

const BuyerSideBar = () => {

    const buyerNavBar = () => {
        return (
            <>
                <Header />
                <div className="row">
                    <div className="col-2  text-center bgColor buyerNavBar menu">
                        <h3 className='my-4'> </h3>
                        <div className="text-center">
                            <Link to={'/'} className='row text-decoration-none text-center text-white'>
                                <p className='n'>Home</p>
                            </Link>
                            <Link to={'/propertyenquiry'} className='row text-decoration-none text-center text-white'>
                                <p className='n'>Enquiry</p>
                            </Link>
                            {/* <Link to={'/dashboard/notifications'} className='row text-decoration-none text-white'>
                                <p className='n' >Notifications</p>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {buyerNavBar()}
        </>
    )
}

export default BuyerSideBar;