import { Breadcrumbs, Button, Link, Modal, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import HeaderSideBar from "../../../UserComponent/HeaderSideBarComponent/headerSideBar"
import './propertyEnquiry.css'
import { VscAccount } from 'react-icons/vsc'
import { SlUserFollowing } from 'react-icons/sl'
import { BiBuildingHouse } from 'react-icons/bi'


const PropertyEnquiries = () => {
    const API = 'http://localhost:3333/realestate',
        params = useParams(),
        navigate = useNavigate();
    const [viewPropsEnquiry, setViewPropsEnquiry] = useState([]),
        [role, setRole] = useState(''),
        [property, setProperty] = useState(''),
        [message, setMessage] = useState(''),
        [open, setOpen] = useState(false),
        [openProfile, setOpenProfile] = useState(false)

    const sendData = (data) => {
        setMessage(data)
        setOpen(true)
        setOpenProfile(true)
        handleClickOpen()
    }

    const handleClickOpen = () => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenProfile(false)
    };

    const nxtPage = path => {
        navigate(path)
    }


    const enquiriesPopup = () => {
        console.log('message: ', message);

        var obj = {
            name: 'Suresh',
            lastName: 'Kumar'
        }

        console.log('obj: ', obj);

        return (
            <>
                <div>
                    <Modal
                        className='d-flex justify-content-center align-items-center'
                        open={openProfile}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div style={{ width: '45%', minHeight: '410px', maxHeight: '410px' }} className="bg-white p-2 position-sticky border-0 rounded">
                            <div className="d-flex justify-content-between border shadow-lg p-1">
                                <Tooltip title='Click to view Profile'>
                                    <p className="m-1 cp" onClick={() => nxtPage(`/realestate/user/unknowprofile/${message.senderId}`)}>
                                        <VscAccount className="text-danger h3 fw-bolder mx-1" />
                                        {message.senderName}
                                    </p>
                                </Tooltip>
                                <Tooltip title='Click to view Profile'>
                                    <p className="m-1 cp" onClick={() => nxtPage(`/realestate/user/unknowprofile/${message.receiverId}`)}>
                                        {message.receiverName}
                                        <VscAccount className="text-danger h3 fw-bolder mx-1" />
                                    </p>
                                </Tooltip>
                            </div>
                            <div className="p-1 m-1 viewEnq">
                                {
                                    message.messages && message.messages.map((items, index) => (
                                        <div key={index}>
                                            <p className="text-center text-dark">  -------- {items.chatDate} -------- </p>
                                            {
                                                items.message.map((item, index) => (
                                                    message.senderId === item.senderId ?
                                                        (
                                                            <div key={index}>
                                                                {
                                                                    item.message ?
                                                                        (
                                                                            <p className="text-white bg-dark h6s" key={index} >
                                                                                <span className="mx-1">{item.message}</span>
                                                                                <span className="text-white small my-1"> {item.time} </span>
                                                                            </p>
                                                                        ) :
                                                                        (
                                                                            <div >
                                                                                <p className="text-white bg-dark h6s" key={index} >
                                                                                    <span className="mx-1">Click to download</span>
                                                                                    <span className="text-white small my-1"> {item.time} </span>
                                                                                </p>                                                                    {
                                                                                    item.document && item.document.map((doc, index) => (
                                                                                        <p key={index}>
                                                                                            <a
                                                                                                className=" m-1"
                                                                                                href={`http://localhost:3333/documents/${doc}`}
                                                                                                target='_blank'
                                                                                                rel="noreferrer"
                                                                                            >
                                                                                                {doc}
                                                                                            </a>
                                                                                        </p>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                        )
                                                                }
                                                            </div>
                                                        ) :
                                                        (
                                                            <div key={index}>
                                                                {
                                                                    item.message ?
                                                                        (
                                                                            <p className="d-flex justify-content-end" key={index} >
                                                                                <span className="mx-1">{item.message}</span>
                                                                                <span className="text-primary small my-1"> {item.time} </span>
                                                                            </p>
                                                                        ) :
                                                                        (
                                                                            <>
                                                                                <p className="d-flex justify-content-end" key={index} >
                                                                                    <span className="mx-1">Check the document</span>
                                                                                    <span className="text-primary small my-1"> {item.time} </span>
                                                                                </p>
                                                                                {item.document && item.document.map((doc, index) => (
                                                                                    <p key={index}>
                                                                                        <a
                                                                                            className="d-flex justify-content-end m-1"
                                                                                            href={`http://localhost:3333/documents/${doc}`}
                                                                                            target='_blank'
                                                                                            rel="noreferrer"
                                                                                        >
                                                                                            {doc}
                                                                                        </a>
                                                                                    </p>
                                                                                ))}
                                                                            </>
                                                                        )
                                                                }
                                                            </div>
                                                        )
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                                {/* {
                                    message && message.message.map((item, index) => (
                                        message.senderId === item.senderId ?
                                            (
                                                <div key={index}>
                                                    {
                                                        item.message ?
                                                            (
                                                                <p className="text-dark bg-info h6s" key={index} >
                                                                    <span className="mx-1">{item.message}</span>
                                                                    <span className="text-white small my-1"> {item.time} </span>
                                                                </p>
                                                            ) :
                                                            (
                                                                <div >
                                                                    <p className="text-dark bg-info h6s" key={index} >
                                                                        <span className="mx-1">Click to download</span>
                                                                        <span className="text-white small my-1"> {item.time} </span>
                                                                    </p>                                                                    {
                                                                        item.document && item.document.map((doc, index) => (
                                                                            <p key={index}>
                                                                                <a
                                                                                    className=" m-1"
                                                                                    href={`http://localhost:3333/documents/${doc}`}
                                                                                    target='_blank'
                                                                                    rel="noreferrer"
                                                                                >
                                                                                    {doc}
                                                                                </a>
                                                                            </p>
                                                                        ))
                                                                    }
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            ) :
                                            (
                                                <div key={index}>
                                                    {
                                                        item.message ?
                                                            (
                                                                <p className="d-flex justify-content-end" key={index} >
                                                                    <span className="mx-1">{item.message}</span>
                                                                    <span className="text-primary small my-1"> {item.time} </span>
                                                                </p>
                                                            ) :
                                                            (
                                                                <>
                                                                    <p className="d-flex justify-content-end" key={index} >
                                                                        <span className="mx-1">Check the document</span>
                                                                        <span className="text-primary small my-1"> {item.time} </span>
                                                                    </p>
                                                                    {item.document && item.document.map((doc, index) => (
                                                                        <p key={index}>
                                                                            <a
                                                                                className="d-flex justify-content-end m-1"
                                                                                href={`http://localhost:3333/documents/${doc}`}
                                                                                target='_blank'
                                                                                rel="noreferrer"
                                                                            >
                                                                                {doc}
                                                                            </a>
                                                                        </p>
                                                                    ))}
                                                                </>
                                                            )
                                                    }
                                                </div>
                                            )
                                    ))
                                } */}
                            </div>
                            <div className="float-end">
                                <Button variant="contained" onClick={handleClose}>Close</Button>
                            </div>
                        </div>
                    </Modal >
                </div >
            </>
        )
    }

    const routing = () => {
        return (
            <Breadcrumbs aria-label="breadcrumb">
                <Link href={'/realestate/dashboard/notifications'} underline="hover" >
                    Dashboard notifications
                </Link>
                <Link href={'/realestate/admin/sellermgmt'} underline="hover" >
                    Properties
                </Link>
                <Typography color="text.primary">Property Enquiries </Typography>
            </Breadcrumbs>
        )
    }

    const enquiries = () => {
        return (
            <>
                <div className="adminEnquiries">
                    <div>
                        {
                            viewPropsEnquiry && property &&
                            (
                                <div>
                                    <div className="row m-2">
                                        <div className="col-3 d-flex justify-content-center align-items-center">
                                            Property Id
                                            <Button size="small" className='fw-bolder fs-5 shadow-lg border mx-1' variant="contained" >{property.propsId} </Button>
                                        </div>
                                        <div className="col-3">
                                            <img src={property.image[0]} className='shadow-lg' style={{ width: 210, height: 180 }} alt='Something went wrong' />
                                        </div>
                                        <div className="col-2">
                                            {
                                                role === 'Admin' ?
                                                    (
                                                        <p> Seller Name </p>
                                                    ) :
                                                    (
                                                        <p className="my-2">Your Property </p>
                                                    )
                                            }
                                            <p> Address </p>
                                            <p> City</p>
                                            <p> State </p>
                                            <p>Type <span className="text-primary h5 mx-1">|</span>  Property for</p>
                                        </div>
                                        <div className="col-2">
                                            {
                                                role === 'Admin' ?
                                                    (
                                                        <p className="text-primary h4">
                                                            {property.sellerName}
                                                            < SlUserFollowing className="mx-2 text-danger" />
                                                        </p>
                                                    ) :
                                                    (
                                                        <BiBuildingHouse className="m-2 text-danger fs-3" />
                                                    )
                                            }
                                            <p> {property.address} </p>
                                            <p> {property.city}</p>
                                            <p> {property.state} </p>
                                            <p>{property.type} <span className="text-primary h5 mx-1">|</span> {property.propertyFor} </p>
                                        </div>
                                    </div>
                                    <div className="m-2 mx-4" >
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="border-0">Buyer Name</th>
                                                    <th>View Enquiry</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    viewPropsEnquiry.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.senderName} </td>
                                                            <td>
                                                                {
                                                                    role === 'Admin' ?
                                                                        (
                                                                            <button className="btn btn-outline-primary"
                                                                                onClick={() => sendData(item)}>View enquiry</button>
                                                                        ) :
                                                                        (
                                                                            <button className="btn btn-outline-primary"
                                                                                onClick={() => nxtPage(`/realestate/seller/propsenquiries/${item.senderId}`)}>
                                                                                Send Reply
                                                                            </button>
                                                                        )
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }
                        {
                            role === 'Admin' ?
                                (
                                    <Button className="fixed-bottom"
                                        onClick={() => nxtPage('/realestate/admin/enquiry')}
                                        variant="contained" color="warning"
                                    >
                                        Back
                                    </Button>
                                ) :
                                (
                                    <Button className="fixed-bottom"
                                        onClick={() => nxtPage('/realestate/manageproperty')}
                                        variant="contained" color="warning"
                                    >
                                        Back
                                    </Button>
                                )
                        }
                    </div>
                </div>
            </>
        )
    }

    const getPropsEnquiries = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        fetch(`${API}/admin/propsenquiries?propsId=${params.propsId}`, {
            headers: {
                Authorization: token
            }
        })
            .then(async res => {
                const fetchData = await res.json()
                console.log('FetchData: ', fetchData);
                setViewPropsEnquiry(fetchData.data)
                setRole(fetchData.role)
            })
            .catch(err => console.log('Err props enquiries: ', err.message))
    }

    const getProperty = () => {
        fetch(`${API}/editproperty?propertyId=${params.propsId}`)
            .then(async res => {
                const fetchData = await res.json()
                console.log('FetchData props: ', fetchData.data.data);
                setProperty(fetchData.data.data)
            })
            .catch(err => console.log('Err props enquiries: ', err.message))
    }

    useEffect(() => {
        getPropsEnquiries()
        getProperty()
    }, [])

    return (
        <>
            <HeaderSideBar />
            {enquiries()}
            {enquiriesPopup()}
        </>
    )
}

export default PropertyEnquiries;