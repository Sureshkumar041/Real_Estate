import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminDashboard from "../AdminDashboard/admindashboard";
import './adminBuyerMgmt.css'

const AdminBuyerMgmt = () => {
    const API = 'http://localhost:3333/realestate',
        token = JSON.parse(localStorage.getItem('token')),
        navigate = useNavigate()
    const [buyerDetails, setBuyerDetails] = useState([]);

    const buyerEnquiry = async () => {
        console.log("token: ", token);
        await fetch(`${API}/admin/enquiry`, {
            headers: {
                Accept: 'application/json',
                Authorization: token
            }
        })
            .then(async res => {
                const fetchData = await res.json();
                if (res.status >= 199 && res.status < 300) {
                    if ((fetchData.data.data).length === 0) {
                        console.log("NO enquiry");
                    } else {
                        setBuyerDetails(fetchData.data.data)
                    }
                } else {
                    if (window.confirm('Login again')) {
                        console.log("Okay");
                        navigate('/realestate/login')
                    }
                }
            })
    }

    const buyermgmt = () => {
        return (
            <div className="buyermgmt">
                <table className="table table-hover sellerinfo my-3">
                    <thead className="bg-info">
                        <tr className="bg-info">
                            <th className="border-info bg-info">SI.No</th>
                            <th className="bg-info">Buyer Name</th>
                            <th className="bg-info">Property Id</th>
                            <th className="bg-info">Seller Id</th>
                            <th className="bg-info">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyerDetails.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1} </td>
                                    <td>{item.buyerName}</td>
                                    <td>{item.productId} </td>
                                    <td>{item.sellerId} </td>
                                    <td>{item.createdAt} </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    useEffect(() => {
        buyerEnquiry()
    }, [])


    return (
        <>
            <AdminDashboard />
            {buyermgmt()}
        </>
    )
}

export default AdminBuyerMgmt;