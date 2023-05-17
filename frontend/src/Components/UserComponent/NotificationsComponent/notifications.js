import { useEffect, useState } from "react";
import AdminDashboard from "../../AdminComponent/AdminDashboard/admindashboard";
import Seller from "../../SellerComponent/SellerDashComponent/seller";
import './notifications.css'
import enquiry from '../../../Image/Enquiry.jpg'
import seller from '../../../Image/Seller.jpg'
import buyer from '../../../Image/Buyer.jpg'
import property from '../../../Image/Property.jpg'
import { Badge, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const Notifications = () => {

    const API = 'http://localhost:3333/realestate'
    const navigate = useNavigate();
    const [notificationsCount, setNotificationsCount] = useState('')

    const nxtPage = (path) => {
        navigate(path)
    }

    const adminNotifications = () => {
        return (
            <div className="notify text-center">
                <Typography className="fs-2 mx-5 my-3">Notifications</Typography>
                {
                    notificationsCount.data && (
                        <div className="row d-flex  gap-4 ">
                            <div className="col-3">
                                <Badge className="px-2 cartImg " badgeContent={notificationsCount.data.data.propertyCount || '0'} max={10} color="primary">
                                    <img src={property} className='img' alt="Something went wrong" />
                                </Badge>
                                <Button className="my-3" variant="contained" onClick={() => nxtPage('/realestate/admin/sellermgmt')} >Properties</Button>
                            </div>
                            <div className="col-3">
                                <Badge className="px-2 cartImg" badgeContent={notificationsCount.data.data.sellerCount -1 || '0'} max={10} color="primary">
                                    <img src={seller} className='img' alt="Something went wrong" />
                                </Badge>
                                <Button className="my-3" variant="contained" onClick={() => nxtPage('/realestate/dashboard/usermgmt/Seller')}>Sellers</Button>
                            </div>
                            <div className="col-3">
                                <Badge className="px-2 cartImg insideOut" badgeContent={notificationsCount.data.data.buyerCount || '0'} max={10} color="primary">
                                    <img src={buyer} className='img' alt="Something went wrong" />
                                </Badge>
                                <Button className="my-3 px-4" variant="contained" onClick={() => nxtPage('/realestate/dashboard/usermgmt/Buyer')}> Buyers</Button>
                            </div>
                            <div className="col-3">
                                <Badge className="px-2 cartImg" badgeContent={notificationsCount.data.data.enquiryCount || '0'} max={10} color="primary">
                                    <img src={enquiry} className='img' alt="Something went wrong" />
                                </Badge>
                                <Button className="my-3" variant="contained" onClick={() => nxtPage('/realestate/admin/enquiry')}>Enquiries</Button>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

    const sellerNotifications = () => {
        return (
            <div className="notify text-center">
                <Typography className="fs-2 mx-5 my-3">Notifications</Typography>
                {
                    notificationsCount.data && (
                        <div className="row d-flex  gap-4 ">
                            <div className="col-3">
                                <Badge className="px-2 cartImg" badgeContent={notificationsCount.data.data.propertyCount || '0'} max={10} color="primary">
                                    <img src={property} className='img' alt="Something went wrong" />
                                </Badge>
                                <Button className="my-3" variant="contained" onClick={() => nxtPage('/realestate/manageproperty')} >Properties</Button>
                            </div>
                            <div className="col-3">
                                <Badge className="px-2 cartImg" badgeContent={notificationsCount.data.data.enquiryCount || '0'} max={10} color="primary">
                                    <img src={enquiry} className='img' alt="Something went wrong" />
                                </Badge>
                                <Button className="my-3" variant="contained" onClick={() => nxtPage('/realestate/propertyenquiry')} >Enquiries</Button>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

    const getCount = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        fetch(`${API}/mynotification`, {
            headers: {
                Authorization: token
            }
        })
            .then(async res => {
                setNotificationsCount(await res.json())
            })
            .catch(err => console.log("Get Count Err: ", err.message))
    }

    console.log("Count data: ", notificationsCount && notificationsCount.data.data);

    useEffect(() => {
        getCount()
    }, [])

    return (
        <>
            {notificationsCount && notificationsCount.data.data.role === 'Admin' ? <AdminDashboard /> : <Seller />}
            {notificationsCount && notificationsCount.data.data.role === 'Admin' ? adminNotifications() : sellerNotifications()}
        </>
    )
}

export default Notifications;