import React, { useEffect, useState } from "react";
import './propertyCartApi.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/material/ListItemSecondaryAction'
import { useNavigate } from "react-router";

const PropertyCart = (props) => {

    console.log('gatherDetails child: ', props.gatherDetails && props.gatherDetails ? props.gatherDetails.propertyFor : null);
    const [propertyFor, setPropertyFor] = useState(props.gatherDetails && props.gatherDetails.propertyFor)
    const API = 'http://localhost:3333/realestate';
    const token = JSON.parse(localStorage.getItem('token'));
    const [showCart, setShowCart] = useState([]),
        [textArea, setTextArea] = useState(''),
        [propertyData, setPropertyData] = useState(''),
        [filterProps, setfilterProps] = useState([]),
        [propertyIndex, setPropertyIndex] = useState(''),
        [sendEnquirySeller, setSendEnquirySeller] = useState(false);
    const navigate = useNavigate();

    const cartImage = (API) => {
        fetch('http://localhost:3333/realestate/cartimage')
            .then(async (res) => {
                const cart = await res.json();
                return cart;
            })
            .then((cart) => {
                console.log("Image data : ", cart.data);
                setShowCart(cart.data);
            })
            .catch((err) => {
                console.log("Cart image: ", err.message);
            })
    }

    // Image show
    const imageMap = (item, index) => {
        return (
            <>
                <div key={index}>
                    <CardMedia
                        component="img"
                        alt="Something went wrong"
                        height="140"
                        image={item}
                    />
                </div>
            </>
        )
    }

    // const sendEnquiry = async (e) => {
    //     if (window.confirm('You want send enquiry')) {
    //         console.log('Sent');
    //         const buyerDetails = JSON.parse(localStorage.getItem('userdetails'))
    //         const buyerEnquiry = {
    //             buyerId: buyerDetails.id,
    //             buyerName: buyerDetails.userName,
    //             message: 'Kindly Send the property details',
    //             sellerId: e.sellerId,
    //             productId: e._id
    //         }
    //         console.log("Buyer Enquiry: ", buyerEnquiry);
    //         await fetch(`${API}/buyerenquiry`, {
    //             method: 'post',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: token
    //             },
    //             body: JSON.stringify(buyerEnquiry)
    //         })
    //             .then(async res => {
    //                 const fetchData = await res.json();
    //                 console.log("fetchData: ", fetchData);
    //                 if (res.status >= 199 && res.status < 300) {
    //                     alert(fetchData.data.data)
    //                 } else {
    //                     if (fetchData.data.data === 'jwt expired' || fetchData.data.data === 'jwt malfarmed') {
    //                         if (window.confirm('Login again')) {
    //                             navigate('/realestate/login')
    //                         }
    //                     } else {
    //                         alert(fetchData.data.data);
    //                     }
    //                 }
    //             })
    //     }
    // }

    const enquiry = (e, index) => {
        console.log("Enquiry: ", e);
        setPropertyIndex(index)
        setPropertyData(e)
        const token = JSON.parse(localStorage.getItem('token'))
        console.log("Token: ", token);
        if (token) {
            setSendEnquirySeller(true)
            // sendEnquiry(e)
        } else {
            // alert('Login');
            if (window.confirm('Login your account')) {
                navigate('/realestate/login')
            } else {
                console.log("Not come..!");
            }
        }
    }

    const DynamicCart = () => {
        console.log("propertyFor child : ", propertyFor && propertyFor);
        return (
            <div className="cartD row">
                {
                    showCart.map((item, index) => (
                        <div key={index} className='col-4'>
                            <Card sx={{ maxWidth: 345 }}>
                                {
                                    item.image.map((item, index) => (
                                        <div key={index}>
                                            {index === 0 ? imageMap(item, index) : null}
                                        </div>
                                    ))
                                }
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.city}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.info}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="success" >{item.propertyFor} </Button>
                                    <Button size="small" variant="outlined" color="primary">{item.type} </Button>
                                    <Button size="small" variant="contained" endIcon={<SendIcon />} onClick={e => enquiry(item, index)}>
                                        Enquiry
                                    </Button>
                                </CardActions>
                                {propertyIndex === index && sendEnquirySeller && enquirySend()}
                            </Card>

                        </div>
                    ))
                }
            </div >
        );
    }

    const sendingEnquiry = async (e) => {
        e.preventDefault();
        // alert('Send')
        console.log("Text Area: ", textArea);
        console.log('Event data: ', propertyData.image[0]);
        if (window.confirm('You want send enquiry')) {
            console.log('Sent');
            const buyerEnquiry = {
                message: textArea,
                receiverId: propertyData.sellerId,
                receiverName: propertyData.sellerName,
                propertyId: propertyData._id,
                propertyImage: propertyData.image[0]
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
                        alert(fetchData.data)
                        setSendEnquirySeller(false)
                    } else {
                        if (fetchData.data.data === 'jwt expired' || fetchData.data.data === 'jwt malfarmed') {
                            if (window.confirm('Login again')) {
                                navigate('/realestate/login')
                            }
                        } else {
                            alert(fetchData.data);
                        }
                    }
                })
        }
    }

    const enquirySend = () => {
        return (
            <>
                <div className="enqSnd text-center py-2" >
                    <h3>Send Enquiry</h3>
                    <div className="sndForm">
                        <form className="mx-5" onSubmit={e => sendingEnquiry(e)}>
                            <div>
                                <textarea className="form-control" onChange={e => setTextArea(e.target.value)} required ></textarea>
                            </div>
                            <div className="d-flex justify-content-end my-3">
                                <button className="btn btn-secondary" onClick={() => setSendEnquirySeller(false)} > Cancel</button>
                                <button className="mx-3 btn btn-primary" type="submit" >Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    const filterProperty = async () => {
        console.log('Fetch');
        const token = JSON.parse(localStorage.getItem('token'))
        await fetch(`/realestate/getproperty?propertyFor=${props.gatherDetails.propertyFor}`, {
            headers: {
                Authorization: token
            }
        })
            .then(async res => {
                setfilterProps(await res.json())
            })
            .catch(err => console.log("Filter props: ", err.message))
    }

    const empty = () => {
        return
    }

    const callOnce = () => {
        props.gatherDetails.propertyFor && props.gatherDetails ? filterProperty() : empty()
    }

    const showFilterProperty = () => {
        console.log("Filter propertyss: ", filterProps);
    }

    useEffect((e) => {
        cartImage();
        filterProperty()
        callOnce()
    }, [])

    return (
        <>
            {DynamicCart()}
            {filterProps && showFilterProperty() ? filterProperty() : null}
        </>
    )
}

export default PropertyCart;