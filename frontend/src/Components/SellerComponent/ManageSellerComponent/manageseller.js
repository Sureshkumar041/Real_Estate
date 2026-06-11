import { useEffect, useState } from "react";
import Seller from "../SellerDashComponent/seller";
// import './manageseller.css'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumbs, Button, Typography } from "@mui/material";

const MyProperty = () => {
    const API = 'http://localhost:3333/realestate';
    const token = JSON.parse(localStorage.getItem('token'));
    const navigate = useNavigate();
    const [getPoperty, setGetProperty] = useState([]),
        [enquirycount, setEnquiryCount] = useState('');
    const sellerData = JSON.parse(localStorage.getItem('userdetails'));
    const id = sellerData.id;

    const nxtPage = path => {
        navigate(path)
    }

    const ownProperty = async () => {
        await fetch(`${API}/ownproperty/${id}`, {
            headers: {
                Accept: 'application/json',
                Authorization: token
            }
        })
            .then(async (res) => {
                const fetchData = await res.json();
                if (res.status >= 199 && res.status < 300) {
                    if ((fetchData.data.data).length === 0) {
                        // setPropertyAvailable(true)
                    } else {
                        setGetProperty(fetchData.data.data)
                    }
                } else {
                    if (window.confirm('Login again')) {
                        navigate('/login')
                    } else {
                        console.log("Else");
                    }
                }
            })
            .catch(err => {
                console.log('Get own property : ', err.message);
            })
    }


    const getOwnProperty = async () => {
        ownProperty();
    }

    // const noProperty = () => {
    //     return (
    //         <>
    //             <div className="noproperty">
    //                 <h3>Still not upload any property</h3>
    //                 <img src={notFound} alt="No_image" className="px-5 error" ></img>
    //             </div>
    //         </>
    //     )
    // }

    const actionProperty = async (id, path, method) => {
        if (method === 'delete') {
            if (window.confirm('You want to delete this property ?')) {
                await fetch(`${API}/${path}/${id}`, {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        Authorization: token
                    }
                })
                    .then(async res => {
                        const fetchData = await res.json();
                        console.log("Fetch data sellermgmt: ", fetchData);
                        if (res.status >= 199 && res.status < 300) {
                            alert(fetchData.data.data);
                            getOwnProperty();
                        }
                        else {
                            alert(fetchData.data.message);
                        }
                    })
                    .catch(err => {
                        console.log("SELLER MGMT: ", err.message);
                    })
            }
        }
    }

    const edit = (e, item) => {
        e.preventDefault();
        console.log("Event");
        navigate(`/seller/editproperty/${item.propsId}`)
    }

    const routing = () => {
        return (
            <>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to={'/dashboard/notifications'} underline="hover" color="inherit">
                        Dashboard notifications
                    </Link>
                    <Typography color="text.primary">Manage Property</Typography>
                </Breadcrumbs>
            </>
        )
    }

    const SellerDetails = () => {
        console.log("getPoperty in table: ", getPoperty);
        return (
            <>
                <div className='propertymgmt'>
                    <div className="m-1">
                        {routing()}
                    </div>
                    <div className='propertyDetails'>
                        <table className='table table-hover text-center'>
                            <thead className='bg-info border' >
                                <tr >
                                    <th className='border-0 bg-info' >SI.No</th>
                                    <th className='bg-info'>Property Id</th>
                                    <th className='bg-info' >Property Image</th>
                                    <th className='bg-info'>Address</th>
                                    <th className='bg-info'>City</th>
                                    <th className='bg-info'>State</th>
                                    <th className='bg-info'>Property for</th>
                                    <th className='bg-info'>Type</th>
                                    <th className='bg-info'>Enquiry Count</th>
                                    <th className='bg-info'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getPoperty.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1} </td>
                                            <td>
                                                <Button size="small" className='fw-bolder shadow-lg' color="secondary">
                                                    {item.propsId}
                                                </Button>
                                            </td>
                                            <td className="tdimage">
                                                <img src={item.image[0]} className='tsrc' alt='Something went wrong' />
                                            </td>
                                            <td>{item.address} </td>
                                            <td>{item.city} </td>
                                            <td>{item.state} </td>
                                            <td>{item.propertyFor} </td>
                                            <td>{item.type} </td>
                                            <td>
                                                {
                                                    enquirycount && enquirycount.map((propsId, index) => (
                                                        item.propsId === propsId.propsId ?
                                                            (
                                                                propsId.enquiryCount !== 0 ?
                                                                    (
                                                                        <button className="btn btn-warning"
                                                                            onClick={() => nxtPage(`/admin/propsenquiry/${item.propsId}`)}
                                                                            key={index}>
                                                                            {propsId.enquiryCount}
                                                                        </button>
                                                                    ) :
                                                                    (
                                                                        <button className="btn btn-warning"
                                                                            onClick={() => nxtPage(`/admin/propsenquiry/${item.propsId}`)}
                                                                            key={index} disabled>
                                                                            {propsId.enquiryCount}
                                                                        </button>
                                                                    )
                                                            ) : null
                                                    ))
                                                }
                                            </td>
                                            <td>
                                                <button className='btn btn-info' onClick={e => edit(e, item)} >Edit</button>
                                                <button className="btn bg-danger mx-3" onClick={() => actionProperty(item._id, 'deleteproperty', 'delete')}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div >

            </>
        )
    }

    const getEnquiryCount = () => {
        fetch(`${API}/enquirycount`, {
            headers: {
                Authorization: token
            }
        })
            .then(async res => {
                const fetchData = await res.json();
                console.log('Fetchdata ec: ', fetchData);
                setEnquiryCount(fetchData.data)
            })
            .catch(err => console.log('EC ERR: ', err.message))
    }

    useEffect(() => {
        getOwnProperty()
        getEnquiryCount()
    }, [id])

    return (
        <>
            <Seller />
            {SellerDetails()}
        </>
    )
}

export default MyProperty;