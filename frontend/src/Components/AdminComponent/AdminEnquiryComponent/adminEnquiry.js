import { Backdrop, Box, Breadcrumbs, Button, Chip, CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import './adminEnquiry.css'
import HeaderSideBar from "../../UserComponent/HeaderSideBarComponent/headerSideBar";
import { Link } from "react-router-dom";

const AdminPropertyEnquiry = () => {

    const API = 'http://localhost:3333/realestate';
    const params = useParams(),
        navigate = useNavigate()
    // console.log("View Property Id: ", params.id);
    const [viewPropsEnquiry, setViewPropsEnquiry] = useState(''),
        [enquiries, setEnquiries] = useState([]),
        [propertyEnquiryCount, setPropertyEnquiryCount] = useState([]),
        [viewEnquiry, setViewEnquiry] = useState(false),
        [specificEnq, setSpecificEnq] = useState(false),
        [enquiryTableVisibility, setEnquiryTableVisibility] = useState(true),
        [sawEnquiry, setSawEnquiry] = useState('');

    const visible = () => {
        setSpecificEnq(false)
        setViewEnquiry(true)
    }

    const specificEnquiry = () => {
        console.log("sawEnquiry: ", sawEnquiry);
        return (
            <div className="adminEnquiry w-75">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to={'/realestate/dashboard/notifications'} underline="hover" color="inherit">
                        Dashboard notifications
                    </Link>
                    <Typography color="text.primary">Manage Property</Typography>
                </Breadcrumbs>
                <div className="row">
                    <div className="col bg-dark text-light py-2">
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <p className="">  Buyer Name-
                                    <span className="text-info mx-2">{sawEnquiry.senderName}</span>
                                    Seller Name-
                                    <span className="text-info mx-2">{sawEnquiry.receiverName}</span>
                                </p>
                            </div>
                            <div className="col d-flex justify-content-end">
                                <Button variant="contained"
                                    color="warning"
                                    onClick={() => visible()} >Back</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row viewMsg mx-1 my-1">
                    <div>
                        {
                            sawEnquiry.message.map((item, index) => (
                                sawEnquiry.senderId === item.senderId ?
                                    (<p className="d-flex justify-content-start text-dark bg-info h6s" key={index}> {item.message} </p>) :
                                    (<p className="d-flex justify-content-end" key={index}>{item.message} </p>)
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    const showEnquiry = (data) => {
        setSawEnquiry(data)
        setSpecificEnq(true)
        setViewEnquiry(false)
        setEnquiryTableVisibility(false)
    }


    const viewIndividualPropsEnquiry = () => {
        console.log('VIP: ', viewPropsEnquiry);
        console.log("Enquiries: ", enquiries.data && enquiries.data);
        return (
            <div className="adminEnquirys">
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <Box sx={{ my: 3, mx: 2 }}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div">
                                    {viewPropsEnquiry.sellerName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div">
                                    $4.50
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography color="text.secondary" variant="body2">
                            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                            just down the hall.
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ m: 2 }}>
                        <Typography gutterBottom variant="body1">
                            Select type
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Extra Soft" />
                            <Chip color="primary" label="Soft" />
                            <Chip label="Medium" />
                            <Chip label="Hard" />
                        </Stack>
                    </Box>
                    <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                        <Button>Add to cart</Button>
                    </Box>
                </Box>
                <div className="row" >
                    <div>
                        <p> Buyer List </p>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            {
                                enquiries.data && enquiries.data.map((item, index) => (
                                    item.propsId === viewPropsEnquiry.propsId ?
                                        (
                                            <div className="row my-2" key={index}>
                                                <div className="col">
                                                    <p>{item.senderName} </p>
                                                </div>
                                                <div className="col">
                                                    <Button variant="outlined" onClick={() => showEnquiry(item)}>View Enquiry </Button>
                                                </div>
                                            </div>
                                        ) : null
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const individualPropsEnquiry = (individualPropsId) => {
        navigate(`/realestate/admin/propsenquiry/${individualPropsId.propsId}`)
        setViewEnquiry(true);
        setViewPropsEnquiry(individualPropsId)
    }

    const propertyEnquiry = () => {
        console.log('propertyEnquiryCount: ', propertyEnquiryCount);
        var limit = 1;
        return (
            <div className="adminEnquiry">
                {
                    propertyEnquiryCount.data ?
                        <div className="enqtable my-5">
                            <table className='table table-hover'>
                                <thead className='bg-info border' >
                                    <tr className="text-center">
                                        <th className='border-0 bg-info' >SI.No</th>
                                        <th className="bg-info"> Property Id</th>
                                        <th className='bg-info'>Property Image</th>
                                        <th className='bg-info'>Seller Name</th>
                                        <th className='bg-info' >Enquiry Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        propertyEnquiryCount.data && propertyEnquiryCount.data.map((item, index) => (
                                            item.enquiryCount !== 0 ?
                                                (
                                                    <tr key={index} className='text-center'>
                                                        <td>{limit++} </td>
                                                        <td>
                                                            <Button size="small" className='fw-bolder shadow-lg' color="secondary">
                                                                {item.propsId}
                                                            </Button>
                                                        </td>
                                                        <td className='' >
                                                            <img style={{ width: 150, height: 90 }} src={item.propertyImage} className='tsrc' alt='Something went wrong' />
                                                        </td>
                                                        <td>{item.sellerName} </td>
                                                        <td>
                                                            <button className="btn btn-warning countBtn" onClick={() => individualPropsEnquiry(item)} >{item.enquiryCount}  </button>
                                                        </td>
                                                    </tr>
                                                ) : null
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                }

            </div>
        )
    }


    const getEnquiries = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        fetch(`${API}/individualpropsenquiry`, {
            headers: {
                Authorization: token
            }
        })
            .then(async res => {
                setEnquiries(await res.json())
            })
            .catch(err => console.log("Get ENquiries: ", err.message))
    }

    const getEnquiryCount = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        fetch(`${API}/enquirycount`, {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                setTimeout(async () => {
                    setPropertyEnquiryCount(await res.json())
                }, 1000)
            })
    }

    useEffect(() => {
        getEnquiries()
        getEnquiryCount()
    }, [])

    return (
        <>
            <HeaderSideBar />
            {viewEnquiry ? viewIndividualPropsEnquiry() : enquiryTableVisibility && propertyEnquiry()}
            {specificEnq && specificEnquiry()}
        </>
    )
}

export default AdminPropertyEnquiry;