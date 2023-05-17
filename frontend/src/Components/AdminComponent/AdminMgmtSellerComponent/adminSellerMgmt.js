import AdminDashboard from '../AdminDashboard/admindashboard'
import './adminSellerMgmt.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop, Button, ButtonBase, CircularProgress } from '@mui/material';

const AdminSellerMgmt = () => {

    // const [array, setArray] = useState([
    //     {
    //         userRoleid: 1,
    //         mainFeatures: [{ permisionId: 1, permission: ["view"] }]
    //     },
    //     {
    //         userRoleid: 2,
    //         mainFeatures: [{ permisionId: 2, permission: ["view"] }]
    //     }])
    const [reqArray, setReqArray] = useState([])
    const permission = [
        { id: 1, name: "vijay", permission: ["add", "edit"] },
        { id: 2, name: "raj", permission: ["add", "edit", "view"] },
        { id: 3, name: "suresh", permission: ["add", "edit", "view", 'delete'] }
    ];
    const role = [
        { role: "admin", id: 1 },
        { role: "agent", id: 2 }
    ];

    const sendData = (userId, action, permisionId) => {
        const saveObj = {
            userRoleid: userId,
            mainFeatures: [{ permisionId: permisionId, permission: [action] }]
        }

        var acceptUser, acceptPermission, acceptAction;
        if (reqArray && reqArray.length !== 0) {
            acceptUser = true;
            reqArray.forEach(element => {
                // If user already exixts
                if (element.userRoleid === userId) {
                    // const index = reqArray.findIndex(checkValue => checkValue.userRoleid === id)
                    // console.log('Index: ', index);
                    acceptUser = false;
                    acceptPermission = true;
                    element.mainFeatures.forEach(rolewise => {
                        // If permission role already exists
                        if (rolewise.permisionId === permisionId) {
                            acceptPermission = false;
                            acceptAction = true;
                            rolewise.permission.forEach(actions => {
                                // If action already exists
                                if (actions === action) {
                                    acceptAction = false;
                                }
                            })
                            if (acceptAction) {
                                rolewise.permission.push(action)
                            }
                        }
                    })
                    if (acceptPermission) {
                        element.mainFeatures.push({ permisionId: permisionId, permission: [action] })
                    }
                }
            })
            if (acceptUser) {
                reqArray.push(saveObj);
            }
        } else {
            reqArray.push(saveObj);
        }
        // console.log('Save Data: ', reqArray);
    }

    const updatePermission =()=>{
        console.log('User permission: ',reqArray)
    }

    const permissionTable = () => {
        console.log('Render: ', reqArray & reqArray);
        return (
            <div className='sellermgmt'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            {
                                role.map((item, index) => (
                                    <th key={index}> {item.role}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            permission.map((items, indexs) => (
                                <tr key={indexs}>
                                    <td>{items.name} </td>
                                    {
                                        role.map((role, index) => (
                                            <td key={index}>
                                                {
                                                    items.permission.map((item, index) => (
                                                        <button className='m-1' onClick={() => sendData(items.name, item, role.id)} key={index}>{item} </button>
                                                    ))
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                    <Button variant='contained' onClick={()=>updatePermission()}>Submit</Button>
                </div>
            </div>
        )
    }


    const API = 'http://localhost:3333/realestate',
        token = JSON.parse(localStorage.getItem('token')),
        navigate = useNavigate();
    const [showCart, setShowCart] = useState([]),
        [visible, setVisible] = useState(false),
        [propertyEnquiryCount, setPropertyEnquiryCount] = useState([]),
        [status, setStatus] = useState(''),
        [propertyId, setPropertyId] = useState(''),
        [stateName, setStateName] = useState(''),
        [city, setCity] = useState(''),
        [propertyFor, setPropertyFor] = useState('')

    const img = (item) => {
        setVisible(!visible)
        return (
            <div>
                <img src={item.image[0]} className='tsrc' alt='Something went wrong' />
            </div>
        )
    }

    const success = (msg) => {
        toast.success(msg, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const nxtPage = path => {
        navigate(path)
    }

    const loginMust = () => {
        if (window.confirm('Login your account')) {
            navigate('/realestate/login')
        }
    }

    const changeStatus = (e, item) => {
        setPropertyId(item._id)
        if (e.target.textContent === 'Active') {
            setStatus('Inactive');
        } else {
            setStatus('Active');
        }
        setTimeout(() => {
            cartImage()
        }, 1000)
    }

    const modifyStatus = () => {
        fetch(`${API}/admin/changestatus?propertyId=${propertyId}&status=${status}`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(res => success(res.data))
            .catch(err => console.log('Err sts: ', err.message))
    }

    useEffect(() => {
        modifyStatus()
    }, [propertyId, status])

    const routing = () => {
        return (
            // <Breadcrumbs aria-label="breadcrumb">
            //     <Link href='/realestate/dashboard/notifications' underline="hover" >
            //         Dashboard notifications
            //     </Link>
            //     <Typography>Properties</Typography>
            // </Breadcrumbs>
            <div className='d-flex justify-content-evenly m-2'>
                <select name='city'
                    className='border-0 bg-secondary bg-opacity-25 w-25 p-2'
                    onChange={e => setCity(e.target.value)}>
                    <option value=''>All Properties</option>
                    <option>Salem</option>
                    <option>Chennai</option>
                    <option>Coimbatore</option>
                    <option>Ooty</option>
                    <option>Hyderabad</option>
                </select>
                <input name='stateName'
                    className='border-0 bg-secondary bg-opacity-25 p-2'
                    onChange={e => setStateName(e.target.value)}>

                </input>
                <select name='propertyFor'
                    className='border-0 bg-secondary bg-opacity-25 w-25 p-2'
                    onChange={e => setPropertyFor(e.target.value)}>
                    <option value=''>All Properties </option>
                    <option>Rent</option>
                    <option>Sell</option>
                </select>
            </div>
        )
    }


    const SellerDetails = (showCart) => {
        return (
            <>
                {
                    propertyEnquiryCount.status !== 400 ?
                        (
                            propertyEnquiryCount.data && propertyEnquiryCount.data ?
                                <div className='sellermgmt'>
                                    <div className='m-1'>
                                        {routing()}
                                    </div>
                                    <div className='sellerDetails'>
                                        <table className='table table-hover'>
                                            <thead className='bg-info border' >
                                                <tr>
                                                    <th className='border-0 bg-info' >SI.No</th>
                                                    <th className='bg-info'>Property Id</th>
                                                    <th className='bg-info'>Property Image</th>
                                                    <th className='bg-info'>Seller Name</th>
                                                    <th className='bg-info'>Address</th>
                                                    <th className='bg-info'>City</th>
                                                    <th className='bg-info'>State</th>
                                                    <th className='bg-info'>Property for</th>
                                                    <th className='bg-info'>Type</th>
                                                    <th className='bg-info'>Action</th>
                                                    <th className='bg-info text-center' >Enquiry Count</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    showCart.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1} </td>
                                                            <td>
                                                                <Button size="small" className='fw-bolder shadow-lg' color="secondary">
                                                                    {item.propsId}
                                                                </Button>
                                                            </td>
                                                            <td className='tdimage' onClick={e => img(item)}>
                                                                <img src={item.image[0]} className='tsrc' alt='Something went wrong' />
                                                            </td>
                                                            <td>{item.sellerName} </td>
                                                            <td>{item.address} </td>
                                                            <td>{item.city} </td>
                                                            <td>{item.state} </td>
                                                            <td>{item.propertyFor} </td>
                                                            <td>{item.type} </td>
                                                            <td >
                                                                {
                                                                    item.status === 'Active' ?
                                                                        <button className='btn btn-success' onClick={e => changeStatus(e, item)}>Active</button> :
                                                                        (
                                                                            <>
                                                                                <button className='btn btn-danger' onClick={e => changeStatus(e, item)}>Inactive</button>
                                                                                <ToastContainer />
                                                                            </>
                                                                        )
                                                                }
                                                            </td>
                                                            <td className='text-center'>
                                                                {
                                                                    item._id === propertyEnquiryCount.data[index].propertyId ?
                                                                        (
                                                                            propertyEnquiryCount.data[index].enquiryCount !== 0 ?
                                                                                (
                                                                                    <button className="btn btn-warning"
                                                                                        onClick={() => nxtPage(`/realestate/admin/propsenquiry/${item.propsId}`)}
                                                                                        key={index}>
                                                                                        {propertyEnquiryCount.data[index].enquiryCount}
                                                                                    </button>
                                                                                ) :
                                                                                (
                                                                                    <button className="btn btn-warning"
                                                                                        onClick={() => nxtPage(`/realestate/admin/propsenquiry/${item.propsId}`)}
                                                                                        key={index} disabled>
                                                                                        {propertyEnquiryCount.data[index].enquiryCount}
                                                                                    </button>
                                                                                )
                                                                        ) : <p className='text-danger'> No </p>
                                                                }
                                                            </td>
                                                        </tr>

                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div > :
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={true}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                        ) : loginMust()
                }
            </>
        )
    }

    const cartImage = () => {
        fetch(`http://localhost:3333/realestate/cartimage?city=${city}&state=${stateName}&propertyFor=${propertyFor}`)
            .then(async (res) => {
                const cart = await res.json();
                return cart;
            })
            .then((cart) => {
                setShowCart(cart.data);
            })
            .catch((err) => {
                console.log("Cart image: ", err.message);
            })
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

    useEffect((e) => {
        cartImage();
        getEnquiryCount();
    }, [city, stateName, propertyFor])

    return (
        <>
            <AdminDashboard />
            {SellerDetails(showCart)}
            {/* {permissionTable()} */}
        </>
    )
}

export default AdminSellerMgmt;