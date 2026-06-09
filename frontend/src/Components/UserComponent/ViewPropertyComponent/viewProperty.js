import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from "../HeaderComponent/header";
import './viewProperty.css'


const ViewProperty = () => {
    const propertyId = useParams();
    const navigate = useNavigate();
    const API = 'http://localhost:3333/realestate';
    const [individualProperty, setIndividualProperty] = useState(''),
        [viewImage, setViewImage] = useState(''),
        [sendEnquirySeller, setSendEnquirySeller] = useState(false),
        [textArea, setTextArea] = useState(''),
        [open, setOpen] = useState(false),
        [userData, setUserData] = useState('');

    const nxtPage = path => {
        navigate(path)
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

    const warning = (msg) => {
        toast.warning(msg, {
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

    const handleClose = () => setOpen(false);

    const fullImage = () => {
        return (
            <div className="col-6 imgwid" >
                <img src={viewImage} className='imgdiv' alt="Something went wrong" />
            </div >
        )
    }

    const sendingEnquiry = async (e) => {
        e.preventDefault();
        console.log('userData.data: ', userData.data);
        let token = JSON.parse(localStorage.getItem('token'));
        if (textArea !== '') {
            if (userData.data) {
                console.log('Sent');
                const buyerEnquiry = {
                    address: userData.data.address,
                    city: userData.data.city,
                    message: textArea,
                    receiverId: individualProperty.sellerId,
                    receiverName: individualProperty.sellerName,
                    propertyId: individualProperty._id,
                    propsId: individualProperty.propsId,
                    propertyImage: individualProperty.image[0]
                }
                console.log("Buyer Enquiry: ", buyerEnquiry);
                await fetch(`${API}/enquirysend`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    },
                    body: JSON.stringify(buyerEnquiry)
                })
                    .then(async res => {
                        const fetchData = await res.json();
                        console.log("fetchData: ", fetchData);
                        if (res.status >= 199 && res.status < 300) {
                            success(fetchData.data)
                            setSendEnquirySeller(false)
                            setTimeout(() => {
                                nxtPage('/propertyenquiry')
                            }, 1000)
                        } else {
                            if (fetchData.data.data === 'jwt expired' || fetchData.data.data === 'jwt malfarmed') {
                                if (window.confirm('Login again')) {
                                    nxtPage('/login')
                                }
                            } else {
                                if (fetchData.data === 'Add your details') {
                                    if (window.confirm('Add your details ?')) {
                                        nxtPage('/user/editprofile')
                                    }
                                } else {
                                    error(fetchData.data)
                                }
                            }
                        }
                    })
            } else {
                if (window.confirm('Login again')) {
                    navigate('/login')
                }
            }
        } else {
            warning('Cannot be empty')
        }

    }

    const enquirySend = () => {
        console.log('propertyData: ', individualProperty);
        return (
            <>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className='style'>
                            <form className="bg-white p-3 shadow" onSubmit={e => sendingEnquiry(e)}>
                                <div className='my-2'>
                                    <Typography className='fw-bold' color='primary'>Contact Us</Typography>
                                </div>
                                <div className='row'>
                                    <div className='col-7'>
                                        <Typography >Property Id :
                                            <span>
                                                <Button size="small" className='fw-bolder shadow-lg' color="secondary">
                                                    {individualProperty.propsId}
                                                </Button>
                                            </span>
                                        </Typography>
                                        <Typography> Property owner name :
                                            <span>
                                                <Button size="small" className='fw-bolder shadow-lg' color="secondary">
                                                    {individualProperty.sellerName}
                                                </Button>
                                            </span>
                                        </Typography>
                                    </div>
                                    <div className='col'>
                                        <img src={individualProperty.image[0]} className='w-75' alt='Something went wrong' />
                                    </div>
                                </div>
                                <div className='row px-5 py-2'>
                                    <TextField
                                        className='w-75 col'
                                        label="Type your enquiry"
                                        onChange={e => setTextArea(e.target.value)}
                                        multiline
                                        maxRows={12}
                                    />
                                </div>
                                <div className='d-flex gap-2 justify-content-end px-5 py-3'>
                                    <Button variant='outlined' onClick={() => setSendEnquirySeller(false)}>Cancel</Button>
                                    <Button variant='contained' onClick={e => sendingEnquiry(e)}>Send</Button>
                                </div>
                            </form>
                        </Box>
                    </Modal>
                </div>
            </>
        )
    }


    const enquiry = () => {
        console.log("Enquiry");
        setSendEnquirySeller(true)
        setOpen(true)
    }

    const individualProps = () => {
        return (
            individualProperty &&
            (
                // individualProps css
                <div className="individualProperty row ">
                    <div className="my-5 row mx-1">
                        {individualProperty && fullImage(individualProperty.image[0])}
                        <div className="col-6">
                            <Button color="primary" className="fs-5 row">
                                <table className="border-0 col">
                                    <tbody>
                                        <tr>
                                            <td className="px-5 text-dark">Address</td>
                                            <td>{individualProperty.address} </td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 text-dark">City</td>
                                            <td>{individualProperty.city} </td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 text-dark">State</td>
                                            <td>{individualProperty.city} </td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 text-dark">Pincode</td>
                                            <td>{individualProperty.pincode} </td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 text-dark">Sqft</td>
                                            <td>{individualProperty.sqft} </td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 text-dark">Rate per sqft</td>
                                            <td>{individualProperty.rate} </td>
                                        </tr>
                                        <tr>
                                            <td className="px-5 text-dark">Contact details</td>
                                            <td> {individualProperty.sellerName} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Button>
                            <div className="row">
                                <div className="col d-flex">
                                    <Button size="small" className='w-50 mx-3 fw-bolder shadow-lg' color="success" >{individualProperty.propertyFor} </Button>
                                    <Button size="small" className='w-50 mx-3 fw-bolder shadow-lg' color="secondary">{individualProperty.type} </Button>
                                </div>
                                {/* <Button className="col-3 mx-3" variant='contained' color="success" >{individualProperty.propertyFor} </Button> */}
                                {/* <Button className="col-3 mx-3" variant='outlined' color="error">{individualProperty.type} </Button> */}
                                <Button className="col-3 mx-3 my-1"
                                    data-bs-toggle='tooltip' title="Click to enquiry"
                                    variant='contained' onClick={() => enquiry()} >Enquiry </Button>
                                <ToastContainer />
                            </div>
                        </div>
                    </div >
                    <div className="row">
                        <div className="col-6 multiimg mx-3">
                            <div className="row">
                                {
                                    individualProperty.image.map((item, index) => (
                                        <div key={index} className='col-3 multiDiv my-2 cp' onClick={() => setViewImage(item)} >
                                            <img src={item} className='multiPic' alt="Something went wrong" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-6 mx-3 border ">
                            <h5> Property Description :</h5>
                            <p> {individualProperty.info} </p>
                        </div>
                    </div>
                    {/* <Button variant='contained' className="w-25 my-5" onClick={() => navigate('/')} >Back</Button> */}
                    {sendEnquirySeller && enquirySend()}
                </div>
            )
        )
    }

    const getProperty = async () => {
        await fetch(`${API}/editproperty?propertyId=${propertyId.id}`)
            .then(res => res.json())
            .then(res => {
                setIndividualProperty(res.data.data)
                setViewImage(res.data.data.image[0])
            })
            .catch(err => console.log('View Property: ', err.message))
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
        getProperty()
        getUserData()
    }, [])

    return (
        <>
            {/* {
                userData.data && userData.data.role === 'Buyer' ?
                    <BuyerSideBar /> :
                    (
                        userData.data && userData.data.role === 'Seller' ?
                            <Seller /> :
                            <AdminDashboard />
                    )
            } */}
            <Header />
            {individualProps()}
        </>
    )
}

export default ViewProperty;