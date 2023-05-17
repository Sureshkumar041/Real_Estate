import { useEffect, useState } from "react";
import { IoSend } from 'react-icons/io5'
import Seller from "../SellerDashComponent/seller";
import './propertyEnquiry.css'

const PropertyEnquiry = () => {

    const API = 'http://localhost:3333/realestate'
    // token = JSON.parse(localStorage.getItem('token')),
    // sellerId = useLocation().state.sellerId,
    // navigate = useNavigate()
    const [receiveEnquiry, setReceiveEnquiry] = useState([]),
        [giveMessage, setGiveMessage] = useState([]),
        [saveEnquiry, setSaveEnquiry] = useState([]),
        [cancelMessage, setCancelMessage] = useState(false),
        [assignBuyer, setAssignBuyer] = useState(''),
        [enquiryEmpty, setEnquiryEmpty] = useState(false);



    const sendReply = () => {
        console.log("Send reply...!");
        alert('Message sent')
        setCancelMessage(!cancelMessage)
    }

    const viewMessage = () => {
        console.log("View message");
        return (
            <>
                <div className="viewMessage">
                    {/* <p>View Message</p> */}
                    <p className=""> Buyer Name : <span className="text-primary fw-bold fs-4">{giveMessage.buyerName}</span> </p>
                    <p>{giveMessage.message} </p>
                    <form className="form">
                        <div className="input-group w-50">
                            <input className="form-control w-50" ></input>
                            <span className="mx-3 fs-3"><IoSend className="cursor-pointer text-success cp" onClick={e => sendReply()}></IoSend></span>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    // const visible = (e, item, index) => {
    //     e.preventDefault();
    //     setCancelMessage(!cancelMessage);
    //     setGiveMessage(item);
    //     setAssignBuyer(index);
    //     console.log("setAssignBuyer: ", index);
    // }

    // const viewEnquiry = () => {
    //     console.log('receiveEnquiry: ', receiveEnquiry);
    //     return (
    //         <div className="viewEnquiry">
    //             {/* <p className="">Property Enquiry</p> */}
    //             <div className="row text-center my-3 text-primary fs-4">
    //                 <div className="col-2">
    //                     <p>Buyer Name</p>
    //                 </div>
    //                 <div className="col-2">
    //                     <p>Property Id</p>
    //                 </div>
    //                 <div className="col-4">
    //                     <p>Message</p>
    //                 </div>
    //             </div>
    //             {
    //                 receiveEnquiry.map((item, index) => (
    //                     <div key={index}>
    //                         <div className="my-2 bg-secondary box bg-opacity-50 w-75" onClick={e => visible(e, item, index)} key={index}>
    //                             <p className="table table-hover cp">
    //                                 <FaUser className="text-primary mx-2 fs-3 sellericon" ></FaUser>
    //                                 <span className="sellerName mx-3">{item.buyerName} </span>
    //                                 <span className="mx-3">{item.productId} </span>
    //                                 <span className="mx-3 msg">{item.message} </span>
    //                             </p>
    //                         </div>
    //                         {assignBuyer === index && cancelMessage ? viewMessage() : null}
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //     )
    // }

    const takeEnquiry = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        await fetch(`${API}/receiveenquiry`, {
            headers: {
                Accept: 'application/json',
                Authorization: token
            }
        })
            .then(async (res) => {
                setSaveEnquiry(await res.json())
            })
            .catch(err => console.log("Err receive enquiry: ", err.message))
    }

    useEffect(() => {
        takeEnquiry()
    }, [])

    // const RunTime = () => {
    //     useEffect(() => {
    //         const receiveBuyerEnquiry = () => {
    //             return fetch(`${API}/receive/buyerenquiry/${sellerId}`, {
    //                 headers: {
    //                     Accept: 'application/json',
    //                     Authorization: token
    //                 }
    //             })
    //                 .then(async res => {
    //                     const fetchData = await res.json();
    //                     if (res.status >= 199 && res.status < 300) {
    //                         console.log('if part...!');
    //                         console.log("Length: ", (fetchData.data.data).length);
    //                         if ((fetchData.data.data).length === 0) {
    //                             setEnquiryEmpty(true);
    //                             console.log("NO enquiry");
    //                         } else {
    //                             setReceiveEnquiry(fetchData.data.data)
    //                         }
    //                     } else {
    //                         if (window.confirm('Login again')) {
    //                             console.log("Okay");
    //                             navigate('/realestate/login')
    //                         }
    //                     }
    //                 })
    //         }

    //         receiveBuyerEnquiry();
    //         // viewEnquiry()
    //     }, [])
    // }


    return (

        <>
            {/* {RunTime()} */}
            <Seller />
        </>
    )
}

export default PropertyEnquiry;