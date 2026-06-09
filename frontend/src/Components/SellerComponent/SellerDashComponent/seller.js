import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../UserComponent/HeaderComponent/header';
import './seller.css'

function Seller() {
    const API = 'http://localhost:3333/realestate',
        navigate = useNavigate();
    const [saveEnquiry, setSaveEnquiry] = useState([]);

    const nxtPage = (path) => {
        navigate(path)
    }

    const sellerNavBar = () => {
        return (
            <div>
                <div className="row sellerdash  dashSide">
                    <div className="col-2 bgColor text-center">
                        <h3 className='my-4'>Seller Dashboard </h3>
                        <div className="text-center">
                            <Link to={'/'} className='row text-decoration-none text-center text-white'>
                                <p className='n'>Home</p>
                            </Link>
                            <Link to={'/postproperty'} className='row text-decoration-none text-center text-white'>
                                <p className='n'>Post Property</p>
                            </Link>
                            <Link to={'/manageproperty'} className='row text-decoration-none text-center text-white'>
                                <p className='n'>Manage Property</p>
                            </Link>
                            <Link to={'/managebuyer'} className='row text-decoration-none text-center text-white'>
                                <p className='n'>Manage Buyer</p>
                            </Link>
                            {/* <Link to={'/propertyenquiry'} state={{ sellerId: sellerDetails.id }} className='row text-decoration-none text-center text-white'>
                            <p className='n'>Property Enquiry</p>
                        </Link> */}
                            <Dropdown drop='up' className='bgColor row w-100'>
                                <Dropdown.Toggle className='n mx-3 px-2 bgColor border-0 text-white' variant='outlined'>
                                    Enquiries
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        saveEnquiry.data && saveEnquiry.data.map((item, index) => (
                                            <Dropdown.Item key={index} onClick={() => nxtPage(`/seller/propsenquiries/${item.senderId}`)}>
                                                {item.senderName}
                                            </Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <Link to={'/dashboard/notifications'} className='row text-decoration-none text-white'>
                                <p className='n' >Notifications</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const takeEnquiry = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        await fetch(`${API}/receiveenquiry`, {
            headers: {
                Accept: 'application/json',
                Authorization: token
            }
        })
            .then(async (res) => {
                const fetchData = await res.json();
                setSaveEnquiry(fetchData)
            })
            .catch(err => console.log("Err receive enquiry: ", err.message))
    }

    useEffect(() => {
        takeEnquiry()
    }, [])

    return (
        <>
            <Header />
            {sellerNavBar()}
        </>
    )
}


export default Seller;