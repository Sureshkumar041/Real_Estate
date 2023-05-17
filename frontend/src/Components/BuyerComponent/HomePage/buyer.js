import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/material/ListItemSecondaryAction'
import './buyer.css'
import '../../UserComponent/PropertyComponent/PropertyComponent/propertyCartApi.css'
import noProperty from '../../../Image/Not property.jpg'
import LogOutComponent from '../../UserComponent/LogOutComponent/logoutComponent';
import { Box, Modal, Pagination, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../UserComponent/HeaderComponent/header';


function BuyerComponent() {

  const [showlocation, setShowlocation] = useState([]),
    [token, setToken] = useState(false),
    [form, setForm] = useState(false),
    [userDetails, setUserDetails] = useState(false),
    [showProperty, setShowProperty] = useState([]),
    [showCart, setShowCart] = useState([]),
    [searchCity, setSearchCity] = useState(''),
    [searchPropertyFor, setSearchPropertyFor] = useState(''),
    [propertyData, setPropertyData] = useState(''),
    [individualProperty, setIndividualProperty] = useState(''),
    [sendEnquirySeller, setSendEnquirySeller] = useState(false),
    [textArea, setTextArea] = useState(''),
    [userData, setUserData] = useState(''),
    [totalPage, setTotalPage] = useState(''),
    [currentPage, setCurrentPage] = useState(1),
    [dataSize, setDataSize] = useState(''),
    [open, setOpen] = React.useState(false),
    handleClose = () => setOpen(false);

  const API = 'http://localhost:3333/realestate';
  const navigate = useNavigate();

  const handleChange = async (e, value) => {
    if (e.target.name === 'city') {
      setCurrentPage(1)
      setSearchCity(e.target.value)
    } else if (e.target.name === 'propertyFor') {
      setCurrentPage(1)
      setSearchPropertyFor(e.target.value)
    } else {
      console.log("Values: ", value);
      setCurrentPage(value)
    }
  }

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

  const userProfile = () => {
    console.log('User data: ', userData && userData.data);
    return (
      <>
        <div className='bg-dark userProfile text-info py-3'>
          <div className='text-center'>
            <p className='fs-4'>
              <FaUser className='mx-2 my-2 fs-4'></FaUser>
              {userData.data.userName}
            </p>
            {
              userData.data.role === 'Buyer' ?
                null :
                (
                  userData.data.role === 'Seller' ?
                    (
                      <Link to={'/realestate/dashboard/notifications'} className='text-decoration-none text-info my-1' >
                        <button className='btn btn-outline-info border-0 w-75'>Dashboard</button>
                      </Link>
                    )
                    :
                    (
                      <Link to={'/realestate/dashboard/notifications'} className='text-decoration-none text-info my-1' >
                        <button className='btn btn-outline-info border-0 w-75'>Dashboard</button>
                      </Link>
                    )
                )
            }
            <Link to={'/realestate/propertyenquiry'} className='text-decoration-none text-info my-1'>
              <button className='btn btn-outline-info border-0 w-75'>Your Enquiry</button>
            </Link>
            <Link to={'/realestate/user/viewprofile'} >
              <button className='btn btn-outline-info border-0 w-75' >View Profile </button>
            </Link>
            <LogOutComponent />
          </div>
        </div>
      </>
    )
  }

  const profile = () => {
    return (
      <div className='row bg-dark bg-opacity-25 mx-5 my-3 shadow-lg rounded-pill'>
        <div className='col-3 location my-2'>
          <select
            className='form-select rounded-pill'
            name='city'
            onChange={e => handleChange(e)}
          >
            <option value='' >Choose the location</option>
            {
              showlocation.map(item => (
                <option
                  value={item.location}
                  key={item._id}
                  onClick={e => handleChange(e)}
                  name='propertyFor'
                >
                  {item.location}
                </option>
              ))}
          </select>
        </div>
        <div className='col-2 location my-2'>
          <select
            name='propertyFor'
            className='form-select rounded-pill'
            onChange={e => handleChange(e)}
          >
            <option value='' >Property type</option>
            {showProperty.map((item, index) => (
              <option key={index} >{item.propertyFor} </option>
            ))}
          </select>
        </div>
        {/* {userData.data ? authenticated() : entryProfile()} */}
      </div>
    )
  }

  // Guest Login
  // const entryProfile = () => {
  //   return (
  //     <React.Fragment>
  //       <div className='col d-flex flex-row-reverse py-3 px-4'>
  //         <Link
  //           to={'/realestate/signup'}
  //           className='d-flex flex-row-reverse text-decoration-none'
  //         >
  //           <button className='btn bg-white' onClick={e => setForm(!form)}>
  //             Login / Signup
  //           </button>
  //         </Link>
  //       </div>
  //     </React.Fragment>
  //   )
  // }

  // Authenication
  // const authenticated = () => {
  //   return (
  //     <React.Fragment>
  //       <div className='col start'>
  //         <div className='col d-flex flex-row-reverse py-3 px-4'>
  //           <CgProfile data-bs-tooltip='tooltip' data-bs-placement='left' title='Click to View Profile' className='cursor-pointer fs-1' id='usericon' onClick={e => setUserDetails(!userDetails)}></CgProfile>
  //           <p className='my-2 mx-2 fs-5'>Me </p>
  //         </div>
  //       </div>
  //     </React.Fragment>
  //   )
  // }

  // Get location data
  const cityMaster = () => {
    const url = `${API}/showlocation`
    fetch(url)
      .then(async res => {
        const fetchData = await res.json()
        return fetchData
      })
      .then(fetchData => {
        setShowlocation(fetchData.data.location)
      })
      .catch(err => {
        console.log('Show location: ', err.message)
      })
  }

  // User...!
  const tokenValidate = () => {
    if (JSON.parse(localStorage.getItem('token'))) {
      setToken(true)
    }
  }

  // Get property
  const getProperty = () => {
    fetch(`${API}/showpropertyfor`)
      .then(async res => {
        const fetchData = await res.json()
        return fetchData
      })
      .then(fetchData => {
        setShowProperty(fetchData.data.data)
      })
      .catch(err => {
        console.log('Show location: ', err.message)
      })
  }

  const filterProperty = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(`${API}/getproperty?city=${searchCity}&propertyFor=${searchPropertyFor}&currentPage=${currentPage}`, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(res => {
        setShowCart(res.data.data)
        setTotalPage(res.data.totalPage)
        setDataSize(res.data.dataSize)
      })
      .catch(err => console.log("Search Err: ", err.message))
  }

  const enquiry = (e) => {
    setPropertyData(e)
    setOpen(true)
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      setSendEnquirySeller(true)
    } else {
      if (window.confirm('Login your account')) {
        navigate('/realestate/login')
      } else {
        console.log("Not come..!");
      }
    }
  }

  const sendingEnquiry = async (e) => {
    e.preventDefault();
    console.log('userData: ', userData.data);
    let token = JSON.parse(localStorage.getItem('token'));
    if (textArea !== '') {
      if (userData.data) {
        console.log('Sent');
        const buyerEnquiry = {
          address: userData.data.address,
          city: userData.data.city,
          message: textArea,
          receiverId: propertyData.sellerId,
          receiverName: propertyData.sellerName,
          propertyId: propertyData._id,
          propsId: propertyData.propsId,
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
              // alert(fetchData.data)
              success(fetchData.data)
              setTimeout(() => {
                setSendEnquirySeller(false)
              }, 2000)
            } else {
              if (fetchData.data.data === 'jwt expired' || fetchData.data.data === 'jwt malfarmed') {
                if (window.confirm('Login again')) {
                  navigate('/realestate/login')
                }
              } else {
                if (fetchData.data === 'Add your details') {
                  if (window.confirm('Add your details ?')) {
                    nxtPage('/realestate/user/editprofile')
                  }
                } else {
                  error(fetchData.data)
                }
              }
            }
          })
      } else {
        if (window.confirm('Login again')) {
          navigate('/realestate/login')
        }
      }
    } else {
      warning('Cannot be empty')
    }

  }

  const enquirySend = () => {
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
                          {propertyData.propsId}
                        </Button>
                      </span>
                    </Typography>
                    <Typography> Property owner name :
                      <span>
                        <Button size="small" className='fw-bolder shadow-lg' color="secondary">
                          {propertyData.sellerName}
                        </Button>
                      </span>
                    </Typography>
                  </div>
                  <div className='col'>
                    <img src={propertyData.image[0]} className='w-75' alt='Something went wrong' />
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

  const viewProperty = (item) => {
    navigate(`/realestate/showproperty/${item.propsId}`)
    setIndividualProperty(item)
  }

  // Image show
  const imageMap = (img, index, item) => {
    return (
      <>
        <div key={index} data-bs-tooltip='tooltip' title='Click to view property'>
          <CardMedia
            component="img"
            alt="Something went wrong"
            height="140"
            image={img}
            className='cp'
            onClick={() => viewProperty(item)}
          />
        </div>
      </>
    )
  }

  const DynamicCart = () => {
    console.log('Cart');
    return (
      <div>
        {/* <AdminDashboard/> */}
        <div className="cartD row">
          {
            dataSize &&
            (
              <div>
                <Button variant='outlined' className='w-25 mx-4' >Available Property</Button>
                <Button variant='contained' >{dataSize}</Button>
              </div>
            )
          }
          {
            showCart.map((item, index) => (
              <div key={index} className='col-lg-4 col-xs-12 col-md-4 my-3'>
                <Card className='cartSizes'>
                  {
                    item.image.map((img, index) => (
                      <div key={index}>
                        {index === 0 ? imageMap(img, index, item) : null}
                      </div>
                    ))
                  }
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <span className='shadow-sm p-2'>
                        {item.city}
                      </span>
                      <span className=''>
                        <span className='fs-6 mx-2'>
                          Property Id
                        </span>
                        <Button size="small" className='fw-bolder shadow-lg' color="secondary">
                          {item.propsId}
                        </Button> </span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.info}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" className='fw-bolder shadow-lg' color="success" >{item.propertyFor} </Button>
                    <Button size="small" className='fw-bolder shadow-lg' color="primary">{item.type} </Button>
                    <Button size="small" data-bs-toggle="tooltip"
                      data-bs-placement="bottom" title="Click to enquiry"
                      variant="contained" className='w-100' endIcon={<SendIcon />}
                      onClick={e => enquiry(item)}>
                      Enquiry
                    </Button>
                    <ToastContainer />
                  </CardActions>
                </Card>
              </div>
            ))
          }
          {sendEnquirySeller && enquirySend()}
          <div className='d-flex justify-content-end px-5 my-4'>
            <Pagination
              count={totalPage}
              defaultPage={1}
              color='primary'
              onChange={handleChange}
            >
            </Pagination>
          </div>
        </div >
      </div>
    );
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
    cityMaster()
    tokenValidate()
    getProperty()
    getUserData()
  }, [])

  useEffect(() => {
    filterProperty()
  }, [searchCity, searchPropertyFor, currentPage, dataSize])

  const noPropertyFound = () => {
    return (
      <>
        <div className='my-5'>
          <Button variant='outlined' color='error' className='w-25 mx-4' >Available Property</Button>
          <Button variant='contained' color='error' >{showCart.length}</Button>
        </div>
        <div className='noPropertyFound my-5'>
          <img src={noProperty} className='w-50' alt='Something went wrong' />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      {profile()}
      {userDetails && userProfile()}
      {showCart.length !== 0 ? DynamicCart() : noPropertyFound()}
      {/* {
        individualProperty && individualProperty ? <ShowPropsDetails individualProperty={individualProperty} /> :
          (showCart.length !== 0 ? DynamicCart() : noPropertyFound())
      } */}
    </>
  )
}

export default BuyerComponent