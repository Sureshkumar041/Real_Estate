import { Button, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FcAddImage } from 'react-icons/fc'
import { IoSend } from "react-icons/io5";
import { useNavigate, useParams } from "react-router"
import Seller from "../SellerDashComponent/seller";
import './propsEnquiries.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import profile from '../../../Image/Profile.jpg'
import { AiFillProfile } from 'react-icons/ai'

const PropsEnquires = () => {
    const param = useParams()
    const senderId = param && param.senderId;

    const API = 'http://localhost:3333/realestate',
        navigate = useNavigate(),
        token = JSON.parse(localStorage.getItem('token'));
    const [saveEnquiry, setSaveEnquiry] = useState([]),
        [role, setRole] = useState(''),
        [open, setOpen] = useState(true),
        [showInfo, setShowInfo] = useState(true),
        [message, setMessage] = useState(''),
        [document, setDocument] = useState([]),
        [openProfile, setOpenProfile] = useState(false),
        [userData, setUserData] = useState('');

    const handleClose = () => setOpenProfile(false);

    const imgStyle = {
        height: 150,
        width: 200
    }

    const success = (msg) => {
        toast.success(msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    const error = (msg) => {
        toast.error(msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const profileModel = () => {
        console.log('user popup: ', saveEnquiry);
        return (
            <div>
                <Modal
                    className='d-flex align-items-center'
                    open={openProfile}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="profileViews border-top">
                        {
                            userData.profileImage && userData ?
                                (
                                    <img className="rounded-circle" src={`http://localhost:3333/profileImages/${userData.profileImage}`} alt="John" style={{ height: 200 }} />
                                ) :
                                (
                                    <img className="rounded-circle" src={profile} alt="John" style={{ height: 200 }} />
                                )
                        }
                        <h1>{saveEnquiry.senderName}</h1>
                        <p className="title">{saveEnquiry.email}</p>
                        <p>{saveEnquiry.phoneNumber}</p>
                        <p>{saveEnquiry.address}</p>
                        <p>{saveEnquiry.city}</p>
                        {/* style="margin: 24px 0;" */}
                        <Button variant="contained" onClick={() => setOpenProfile(false)}>Close</Button>
                    </div>
                </Modal >
            </div >

        )
    }

    const receiverDetails = () => {
        return (
            <div>
                <Box className="">
                    <Typography>Receiver Details</Typography>
                    <Typography>Email Address: <span className="userDetails">{saveEnquiry.email}</span> </Typography>
                    <Typography>Phone Number <span className="userDetails">{saveEnquiry.phoneNumber}</span> </Typography>
                    <Typography>Address : <span className="userDetails">{saveEnquiry.address}</span> </Typography>
                    <Typography>City : <span className="userDetails">{saveEnquiry.city} </span></Typography>
                </Box>
            </div>
        )
    }

    const showPropsInfo = () => {
        return (
            <div>
                <Box>
                    <p>Property Information</p>
                    <Typography >Property Id :
                        <span>
                            <Button size="small" className='fw-bolder shadow-lg' color="secondary">
                                {saveEnquiry.propsId}
                            </Button>
                        </span>
                    </Typography>
                </Box>
            </div>
        )
    }

    const sendEnquiry = async (e, document) => {
        e.preventDefault();
        var enquirys = ''
        if (role === 'Buyer') {
            enquirys = {
                message: message,
                receiverId: saveEnquiry.receiverId,
                receiverName: saveEnquiry.receiverName,
                propertyId: saveEnquiry.propertyId
            }
        } else {
            if (document) {
                var formData = new FormData()
                formData.append('receiverId', saveEnquiry.senderId)
                formData.append('receiverName', saveEnquiry.senderName)
                formData.append('propertyId', saveEnquiry.propertyId)
                document.forEach(element => {
                    formData.append('document', element)
                })
                console.log('formData: ', [...formData]);
            } else {
                console.log('ELse msg');
                formData = new FormData()
                formData.append('message', message)
                formData.append('receiverId', saveEnquiry.senderId)
                formData.append('receiverName', saveEnquiry.senderName)
                formData.append('propertyId', saveEnquiry.propertyId)
            }
        }
        await fetch(`${API}/enquirysend`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                Authorization: token
            },
            body: formData
        })
            .then(async res => {
                const fetchData = await res.json();
                if (res.status >= 199 && res.status < 300) {
                    success(fetchData.data)
                    if (message) {
                        e.target.reset()
                        setMessage('')
                    }
                    takeEnquiry()
                } else {
                    if (fetchData.data.data === 'jwt expired' || fetchData.data.data === 'jwt malfarmed') {
                        if (window.confirm('Login again')) {
                            navigate('/realestate/login')
                        }
                    } else {
                        error(fetchData.data);
                    }
                }
            })
    }

    // const sendDoc = async document => {
    //     var enquirys = ''
    //     if (role === 'Buyer') {
    //         enquirys = {
    //             message: message,
    //             receiverId: saveEnquiry.receiverId,
    //             receiverName: saveEnquiry.receiverName,
    //             propertyId: saveEnquiry.propertyId
    //         }
    //     } else {
    //         if (document) {
    //             var formData = new FormData()
    //             formData.append('receiverId', saveEnquiry.senderId)
    //             formData.append('receiverName', saveEnquiry.senderName)
    //             formData.append('propertyId', saveEnquiry.propertyId)
    //             document.forEach(element => {
    //                 formData.append('document', element)
    //             })
    //         } else {
    //             console.log('ELse msg');
    //             enquirys = {
    //                 document: formData,
    //                 receiverId: saveEnquiry.senderId,
    //                 receiverName: saveEnquiry.senderName,
    //                 propertyId: saveEnquiry.propertyId
    //             }
    //             console.log('Enquiry: ', enquirys);
    //         }
    //     }
    //     await fetch(`${API}/enquirysend`, {
    //         method: 'post',
    //         headers: {
    //             Accept: 'application/json',
    //             Authorization: token
    //         },
    //         body: formData
    //     })
    //         .then(async res => {
    //             const fetchData = await res.json();
    //             if (res.status >= 199 && res.status < 300) {
    //                 success(fetchData.data)
    //                 takeEnquiry()
    //             } else {
    //                 if (fetchData.data.data === 'jwt expired' || fetchData.data.data === 'jwt malfarmed') {
    //                     if (window.confirm('Login again')) {
    //                         navigate('/realestate/login')
    //                     }
    //                 } else {
    //                     error(fetchData.data);
    //                 }
    //             }
    //         })
    // }

    const handleChange = async e => {
        e.preventDefault()
        console.log('Doc: ', e.target.files);
        const files = e.target.files
        var multipleFiles = [];
        [...files].forEach(element => {
            multipleFiles.push(element)
        })
        setDocument(multipleFiles)
        sendEnquiry(e, multipleFiles)
    }

    const Enquiries = () => {
        console.log('Render data: ', saveEnquiry && saveEnquiry);
        return (
            <div className="buyerEnquiries">
                <div className="my-3 mx-5">
                    <div className="individualChat row">
                        <div className="row  bg-info text-dark">
                            <div className="col-10 py-2 fs-5">
                                <FaUser className="chat text-white"></FaUser>
                                {
                                    role && role === 'Buyer' ?
                                        (
                                            <span className="my-2 mx-2">
                                                {saveEnquiry.receiverName}
                                            </span>
                                        ) :
                                        (
                                            <>
                                                <span className="my-2 mx-2 cp"
                                                    data-bs-tooltip='tooltip'
                                                    title="Click to view details"
                                                    onClick={() => setOpen(!open)}>
                                                    {saveEnquiry.senderName}
                                                </span>
                                            </>
                                        )
                                }
                            </div>
                            <div className="col float-end">
                                <div className="row float-end">
                                    <Tooltip title='Click to  view profile'>
                                        <IconButton onClick={() => setOpenProfile(true)}>
                                            <AiFillProfile className="fs-1 cp" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className="row msg individualChat bg-light my-2">
                            {open ? receiverDetails() : null}
                            {
                                role && role === 'Buyer' ?
                                    (<div className="d-flex justify-content-end py-2 gap-2">
                                        <span> {showInfo && showPropsInfo()} </span>
                                        <div className="cp" data-b-tooltip='tooltip' title="Click to view details" onClick={() => { setShowInfo(!showInfo) }}>
                                            <img src={saveEnquiry.propertyImage} alt='Something went wrong' />
                                        </div>
                                    </div>) :
                                    (<div className="d-flex justify-content-start py-2 gap-2">
                                        <div className="cp" data-b-tooltip='tooltip' title="Click to view details" onClick={() => { setShowInfo(!showInfo) }}>
                                            <img src={saveEnquiry.propertyImage} style={imgStyle} alt='Something went wrong' />
                                        </div>
                                        <span> {showInfo && showPropsInfo()} </span>
                                    </div>)
                            }
                            <div className="type">
                                {/* {
                                    saveEnquiry.message && saveEnquiry.message.map((item, index) => (
                                        role !== item.role ?
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
                                {
                                    saveEnquiry.messages && saveEnquiry.messages.map((items, index) => (
                                        <div key={index}>
                                            <p className="text-center text-muted">  -------- {items.chatDate} -------- </p>
                                            {
                                                items.message.map((item, index) => (
                                                    role !== item.role ?
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
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <form className="py-2 mx-3 msganupu" onSubmit={e => sendEnquiry(e)}>
                            <div className="row mx-2">
                                <input className="col-7 form-control w-75 my-3" name="message" required onChange={e => setMessage(e.target.value)} />
                                <div className="col-1 my-3">
                                    <Tooltip title="Click to upload document">
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <input hidden multiple type="file" name="document" onChange={e => handleChange(e)} />
                                            <FcAddImage className="fs-1" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <Button variant="contained"
                                    className="col h-25 btn btn-success mx-3 my-4"
                                    type="submit" endIcon={<IoSend />}>
                                    Send
                                </Button>
                                <ToastContainer />
                            </div>
                        </form>
                    </div>
                </div >
            </div>
        )
    }

    const takeEnquiry = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        await fetch(`${API}/receiveenquiry?senderId=${param.senderId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: token
            }
        })
            .then(async (res) => {
                const fetchData = await res.json();
                console.log('Get data: ', fetchData);
                setSaveEnquiry(fetchData.data[0])
                setRole(fetchData.role)
                setUserData(fetchData.userData)
            })
            .catch(err => console.log("Err receive enquiry: ", err.message))
    }

    useEffect(() => {
        takeEnquiry()
    }, [senderId])

    return (
        <>
            <Seller />
            {Enquiries()}
            {profileModel()}
        </>

    )
}

export default PropsEnquires;