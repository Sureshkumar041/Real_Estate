import { useEffect, useState } from "react"
import AdminDashboard from "../../AdminComponent/AdminDashboard/admindashboard";
import BuyerSideBar from "../../BuyerComponent/HomePage/BuyerSideBarComponent/buyerSideBar";
import Seller from "../../SellerComponent/SellerDashComponent/seller";

const HeaderSideBar = () => {

    const API = 'http://localhost:3333/realestate';
    const [userData, setUserData] = useState('');

    const headerSideBar = () => {
        return (
            <>
                {
                    userData.data && userData.data.role === 'Buyer' ?
                        <BuyerSideBar /> :
                        (
                            userData.data && userData.data.role === 'Seller' ?
                                <Seller /> :
                                <AdminDashboard />
                        )
                }
            </>
        )
    }

    const getUserData = () => {
        if (JSON.parse(localStorage.getItem('token'))) {
            fetch(`${API}/getuserdata`, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('token'))
                }
            })
                .then(async res => {
                    const fetchData = await res.json()
                    if (res.status >= 199 && res.status < 300) {
                        setUserData(fetchData)
                    }
                })
                .catch(err => console.log("User data err: ", err.message))
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {headerSideBar()}
        </>
    )
}

export default HeaderSideBar;