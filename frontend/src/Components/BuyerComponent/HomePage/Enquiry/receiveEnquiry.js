import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EnquiryNotification from "./EnquiryNotificatiionComponent/enquiryNotification";
import './receiveEnquiry.css'
import { FaUser } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import Header from "../../../UserComponent/HeaderComponent/header";
import { FcAddImage } from "react-icons/fc";
import { AiFillProfile } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ReceiveEnquiry = () => {

    const API = 'http://localhost:3333/realestate',
        token = JSON.parse(localStorage.getItem('token')),
        navigate = useNavigate()
    const [saveEnquiry, setSaveEnquiry] = useState([]),
        [chatData, setChatData] = useState(''),
        [message, setMessage] = useState(''),
        [visible, setVisible] = useState(true),
        [open, setOpen] = useState(false),
        [showInfo, setShowInfo] = useState(false),
        [document, setDocument] = useState('');

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

    const nxtPage = path => {
        console.log('Path: ', path);
        alert('S')
        navigate(path)
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
                setSaveEnquiry(await res.json())
            })
            .catch(err => console.log("Err receive enquiry: ", err.message))
    }

    useEffect(() => {
        takeEnquiry()
    }, [])

    const msgChat = (item) => {
        setChatData(item)
        setVisible(false)
        setOpen(false)
        setShowInfo(false)
    }

    const sendEnquiry = async (e, document) => {
        e.preventDefault();
        console.log("Message: ", message);
        console.log('Chat data: ', chatData)
        var enquirys = ''
        if (saveEnquiry.role === 'Buyer') {
            if (document) {
                var formData = new FormData()
                formData.append('receiverId', chatData.receiverId)
                formData.append('receiverName', chatData.receiverName)
                formData.append('propertyId', chatData.propertyId)
                document.forEach(element => {
                    formData.append('document', element)
                })
                console.log('formData: ', [...formData]);
            } else {
                console.log('ELse msg');
                formData = new FormData()
                formData.append('message', message)
                formData.append('receiverId', chatData.receiverId)
                formData.append('receiverName', chatData.receiverName)
                formData.append('propertyId', chatData.propertyId)
            }
            enquirys = {
                message: message,
                receiverId: chatData.receiverId,
                receiverName: chatData.receiverName,
                propertyId: chatData.propertyId
            }
        } else {
            enquirys = {
                message: message,
                receiverId: chatData.senderId,
                receiverName: chatData.senderName,
                propertyId: chatData.propertyId
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
                    e.target.reset()
                    takeEnquiry()
                    msgChat(chatData)
                    chatBox()
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

    const back = () => {
        if (saveEnquiry.role === 'Buyer') navigate('/realestate')
        else navigate('/realestate/dashboard/notifications')
    }

    const receiverDetails = () => {
        return (
            <div>
                <Box className="">
                    <Typography>Receiver Details</Typography>
                    <Typography>Email Address: <span className="userDetails">{chatData.email}</span> </Typography>
                    <Typography>Phone Number <span className="userDetails">{chatData.phoneNumber}</span> </Typography>
                    <Typography>Address : <span className="userDetails">{chatData.address}</span> </Typography>
                    <Typography>City : <span className="userDetails">{chatData.city} </span></Typography>
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
                                {chatData.propsId}
                            </Button>
                        </span>
                    </Typography>
                </Box>
            </div>
        )
    }

    const chatBox = () => {
        console.log('chatData: ', chatData);
        return (
            <div className="my-3 mx-5">
                <div className="individualChat row">
                    {/* <div className="row h-25 bg-info text-dark py-3">
                        <div className="col-10 fs-5">
                            <FaUser className="chat text-white"></FaUser>
                            {
                                saveEnquiry.role === 'Buyer' ?
                                    (
                                        <span className="my-2 mx-2">
                                            {chatData.receiverName}
                                        </span>
                                    ) :
                                    (
                                        <>
                                            <span className="my-2 mx-2 cp"
                                                data-bs-tooltip='tooltip'
                                                title="Click to view details"
                                                onClick={() => setOpen(!open)}>
                                                {chatData.senderName}
                                            </span>
                                        </>
                                    )
                            }
                        </div>
                        <div className="col d-flex justify-content-center ">
                            <button className="btn btn-outline-light px-3" onClick={e => back()}>Back</button>
                        </div>
                    </div> */}
                    <div className="row  bg-info text-dark">
                        <div className="col-10 py-2 fs-5">
                            <FaUser className="chat text-white"></FaUser>
                            {
                                saveEnquiry.role && saveEnquiry.role === 'Buyer' ?
                                    (
                                        <span className="my-2 mx-2">
                                            {chatData.receiverName}
                                        </span>
                                    ) :
                                    (
                                        <>
                                            <span className="my-2 mx-2 cp"
                                                data-bs-tooltip='tooltip'
                                                title="Click to view details"
                                                onClick={() => setOpen(!open)}>
                                                {chatData.senderName}
                                            </span>
                                        </>
                                    )
                            }
                        </div>
                        <div className="col float-end">
                            {/* <div className="row float-end">
                                <AiFillProfile className="fs-1 cp" />
                            </div> */}
                            <div className="col float-end">
                                <button className="btn btn-outline-light px-3 my-1" onClick={e => back()}>Back</button>
                            </div>
                        </div>
                    </div>
                    <div className="row msg bg-light my-2">
                        {open ? receiverDetails() : null}
                        {
                            saveEnquiry.role === 'Buyer' ?
                                (<div className="d-flex justify-content-end py-2 gap-2">
                                    <span> {showInfo && showPropsInfo()} </span>
                                    <div className="cp" data-b-tooltip='tooltip' title="Click to view details" onClick={() => { setShowInfo(!showInfo) }}>
                                        <img style={{ width: 300, height: 200 }} src={chatData.propertyImage} className='' alt='Something went wrong' />
                                    </div>
                                </div>) :
                                (<div className="d-flex justify-content-start py-2 gap-2">
                                    <div className="cp" data-b-tooltip='tooltip' title="Click to view details" onClick={() => { setShowInfo(!showInfo) }}>
                                        <img src={chatData.propertyImage} className='' alt='Something went wrong' />
                                    </div>
                                    <span> {showInfo && showPropsInfo()} </span>
                                </div>)
                        }
                        <div className="type ">
                            {
                                chatData.messages.map((item, index) => (
                                    <div key={index}>
                                        <p className="text-center text-muted">  -------- {item.chatDate} -------- </p>
                                        {
                                            item.message.map((item, index) => (
                                                saveEnquiry.role !== item.role ?
                                                    (
                                                        <div key={index}>
                                                            {

                                                                item.message ?
                                                                    (
                                                                        <p className="d-flex justify-content-start text-dark bg-info h6s" key={index} >
                                                                            <span className="mx-1">{item.message}</span>
                                                                            <span className="text-white small my-1"> {item.time} </span>
                                                                        </p>
                                                                    ) :
                                                                    (
                                                                        <>
                                                                            <p className="d-flex justify-content-start text-dark bg-info h6s" key={index} >
                                                                                <span className="mx-1">Click to download</span>
                                                                                <span className="text-white small my-1"> {item.time} </span>
                                                                            </p>
                                                                            {
                                                                                item.document && item.document.map((doc, index) => (
                                                                                    <a
                                                                                        className="d-flex justify-content-end border my-1 h6s"
                                                                                        href={`http://localhost:3333/documents/${doc}`}
                                                                                        target='_blank'
                                                                                        rel="noreferrer"
                                                                                        key={index}
                                                                                    >
                                                                                        {doc}
                                                                                    </a>

                                                                                ))
                                                                            }
                                                                        </>
                                                                    )
                                                            }
                                                        </div>
                                                    ) :
                                                    (
                                                        <div>
                                                            {
                                                                item.message ?
                                                                    (
                                                                        <p className="d-flex justify-content-end" key={index} >
                                                                            <span>{item.message}</span>
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
                                chatData.message.map((item, index) => (
                                    saveEnquiry.role !== item.role ?
                                        (
                                            <div key={index}>
                                                {

                                                    item.message ?
                                                        (
                                                            <p className="d-flex justify-content-start text-dark bg-info h6s" key={index} >
                                                                <span className="mx-1">{item.message}</span>
                                                                <span className="text-white small my-1"> {item.time} </span>
                                                            </p>
                                                        ) :
                                                        (
                                                            <>
                                                                <p className="d-flex justify-content-start text-dark bg-info h6s" key={index} >
                                                                    <span className="mx-1">Click to download</span>
                                                                    <span className="text-white small my-1"> {item.time} </span>
                                                                </p>
                                                                {
                                                                    item.document && item.document.map((doc, index) => (
                                                                        <a
                                                                            className="d-flex justify-content-end border my-1 h6s"
                                                                            href={`http://localhost:3333/documents/${doc}`}
                                                                            target='_blank'
                                                                            rel="noreferrer"
                                                                            key={index}
                                                                        >
                                                                            {doc}
                                                                        </a>

                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                }
                                            </div>
                                        ) :
                                        (
                                            <div>
                                                {
                                                    item.message ?
                                                        (
                                                            <p className="d-flex justify-content-end" key={index} >
                                                                <span>{item.message}</span>
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
                    </div>
                    <form className="py-2 mx-3 msganupu" onSubmit={e => sendEnquiry(e)}>
                        <div className="row mx-2">
                            <input className="col-7 form-control w-75 my-3" name="message" required onChange={e => setMessage(e.target.value)} />
                            <div className="col-1 my-3">
                                <Tooltip title="Click to upload document">
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input hidden multiple type="file" name="document" onChange={(e) => handleChange(e)} />
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
        )
    }

    const receiveEnquiry = () => {
        return (
            <div className="row bgColor mx-1 my-2" id="userNames">
                <div className="col-2 d-flex justify-content-center" >
                    <div>
                        <nav className="navbar w-75 text-center mx-5">
                            <div className="text-center mx-3">
                                {
                                    saveEnquiry.role === 'Buyer' ?
                                        (<h5 className="">Seller Name</h5>) :
                                        saveEnquiry.role === 'Seller' ?
                                            (<h5 className="">Buyer Name</h5>) :
                                            (
                                                <div>
                                                    <h5 >User Name</h5>
                                                    <p className="text-light fw-bold"><em>No report still now</em> </p>
                                                </div>
                                            )
                                }
                            </div>
                            {
                                saveEnquiry.data && saveEnquiry.data.map((item, index) => (
                                    <div className="row container-fluid text-center py-2 shadow bg-light" key={index}>
                                        {
                                            saveEnquiry.role === 'Buyer' ?
                                                // to={`/realestate/seller/propsenquiries/${item.receiverId}`}
                                                (<Link onClick={() => msgChat(item)} className="navbar-brand text-center l">
                                                    {item.receiverName}
                                                </Link>) :
                                                (<Link className="navbar-brand text-center l" onClick={() => msgChat(item)} >{item.senderName} </Link>)
                                        }
                                    </div>
                                ))
                            }
                        </nav>
                    </div>
                </div>
                <div className="col-10 bg-light">
                    {visible ? <EnquiryNotification /> : chatBox()}
                </div>
            </div>
        )
    }

    return (
        <>
            <Header />
            {receiveEnquiry()}
        </>
    )
}

export default ReceiveEnquiry;