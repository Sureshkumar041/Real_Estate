import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import './start.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Badge } from "@mui/material";
import HeaderSideBar from "../../UserComponent/HeaderSideBarComponent/headerSideBar";

const Start = () => {
    const { id } = useParams(),
        navigate = useNavigate(),
        token = JSON.parse(localStorage.getItem('token')),
        API = 'http://localhost:3333/realestate';
    const [EditProperty, setEditProperty] = useState(''),
        [address, setAddress] = useState(''),
        [city, setCity] = useState(''),
        [state, setState] = useState(''),
        [pincode, setPincode] = useState(''),
        [image, setImage] = useState([]),
        [mapImage, setMapImage] = useState([]),
        [type, setType] = useState(),
        [sqft, setSqft] = useState(''),
        [rate, setRate] = useState(''),
        [info, setInfo] = useState(''),
        [propertyFor, setpropertyFor] = useState(''),
        [showlocation, setShowlocation] = useState([]),
        [showProperty, setShowProperty] = useState([]),
        [showPropertyType, setShowPropertyType] = useState([])


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

    const takeProperty = async () => {
        await fetch(`${API}/editproperty?propertyId=${id}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                Authorization: token
            }
        })
            .then(async res => {
                const fetchData = await res.json();
                if (res.status >= 199 && res.status < 300) {
                    setEditProperty(fetchData.data.data);
                    setAddress(fetchData.data.data.address)
                    setCity(fetchData.data.data.city)
                    setMapImage(fetchData.data.data.image)
                    setInfo(fetchData.data.data.info)
                    setType(fetchData.data.data.type)
                    setRate(fetchData.data.data.rate)
                    setSqft(fetchData.data.data.sqft)
                    setPincode(fetchData.data.data.pincode)
                    setpropertyFor(fetchData.data.data.propertyFor)
                    setState(fetchData.data.data.state)
                }
                else {
                    if (fetchData.data.data === 'jwt expired' || fetchData.data.data === 'jwt malfarmed') {
                        if (window.confirm('Login again')) {
                            navigate('/login')
                        }
                    } else {
                        error(fetchData.data.data);
                    }
                }
            })
            .catch(err => {
                console.log('Error: ', err.message);
            })
    }

    const cityMaster = () => {
        const url = 'http://localhost:3333/showlocation'
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

    const getPropertyType = async () => {
        await fetch(`${API}/showpropertytype`)
            .then(async res => {
                const fetchData = await res.json();
                return fetchData;
            })
            .then(fetchData => {
                setShowPropertyType(fetchData.data.data);
            })
            .catch(err => {
                console.log("Get property type: ", err);
            })
    }

    const handleChange = async e => {
        const files = e.target.files
        var multipleFiles = [];
        [...files].forEach(element => {
            multipleFiles.push(element)
        })
        setImage(multipleFiles)
    }

    const createPro = async property => {
        return fetch(`${API}/updateproperty/${EditProperty._id}`, {
            method: 'put',
            headers: {
                Accept: 'application/json',
                Authorization: token
            },
            body: property
        })
            .then(async response => {
                const fetchData = await response.json()
                if (response.status >= 199 && response.status < 300) {
                    success(fetchData.data.data)
                    setCity('')
                    setAddress('')
                    setImage('')
                    setInfo('')
                    setType('')
                    setRate('')
                    setSqft('')
                    setPincode('')
                    setpropertyFor('')
                    setState('')
                    setTimeout(() => {
                        navigate('/manageproperty')
                    }, 2000)
                } else {
                    error(fetchData.data.data)
                }
            })
            .catch(err => console.log(err))
    }

    const onSubmit = async e => {
        e.preventDefault()
        const sellerData = JSON.parse(localStorage.getItem('userdetails'));
        let formData = new FormData()
        formData.append('address', address)
        formData.append('city', city)
        formData.append('state', state)
        formData.append('pincode', pincode)

        const img = [...image, ...mapImage]
        img.forEach(element => {
            formData.append('image', element)
            // console.log("Elements: ", element);
        })

        formData.append('propertyFor', propertyFor)
        formData.append('type', type)
        formData.append('sqft', sqft)
        formData.append('rate', rate)
        formData.append('info', info)
        formData.append('sellerId', sellerData.id)

        console.log('img: ', img);
        // console.log("Image in form data : ", formData.get('image'));
        await createPro(formData)
    }

    const cancel = () => {
        return (
            <div>
                <p className="fs-1 cp">&times;</p>
            </div>
        )
    }

    const delImage = (item, index) => {
        const deleteImage = mapImage.filter((element, key) => item !== element);
        setMapImage(deleteImage)
    }

    const one = () => {
        return (
            <>
                <div className="updateForm">
                    <div className='form'>
                        <form
                            className='form mx-5 udform'
                            id='form'
                        >
                            <div className='text-center py-2'>
                                <h2>Edit Property</h2>
                            </div>
                            <div className='row mx-2 my-2'>
                                <select
                                    className='form-control'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    name='city'
                                    required
                                >
                                    <option defaultValue={city} >{EditProperty.city}</option>
                                    {showlocation.map((item, index) => (
                                        <option key={index} >{item.location}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='row mx-2 '>
                                <label>Address line</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='address'
                                    placeholder='Enter the street name'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='row px-2'>
                                <div className='col'>
                                    <label>State</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='state'
                                        placeholder='Enter the state'
                                        value={state}
                                        onChange={e => setState(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='col'>
                                    <label>Pin code</label>
                                    <input
                                        className='form-control'
                                        type='number'
                                        placeholder='Enter the pincode'
                                        name='pincode'
                                        defaultValue={EditProperty.pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row mx-2'>
                                <label>Upload property photo</label>

                                <div className="my-2 w-100">
                                    <span className="">
                                        {
                                            mapImage &&
                                            mapImage.map((item, index) => (
                                                <span key={index} className='mx-2'>
                                                    {/* `http://localhost:3333/uploads/${item.split('/')[4]} */}
                                                    <Badge className="w-25" badgeContent={cancel()} onClick={() => delImage(item, index)}>
                                                        <img src={item} className='my-2' alt='Something went wrong' />
                                                    </Badge>
                                                </span>
                                            ))
                                        }
                                    </span>
                                </div>

                                <input
                                    className='form-control'
                                    multiple
                                    type='file'
                                    name='image'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            <div className='row mx-1 my-3'>
                                <select
                                    className='col form-select mx-2'
                                    name='propertyFor'
                                    defaultValue={propertyFor}
                                    onChange={(e) => setpropertyFor(e.target.value)}
                                    required
                                >
                                    <option >{EditProperty.propertyFor}</option>
                                    {showProperty.map((item, index) => (
                                        <option key={index} value={item.propertyFor}>
                                            {item.propertyFor}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className='col form-select mx-2'
                                    name='type'
                                    defaultValue={EditProperty.type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                >
                                    <option  >{EditProperty.type} </option>
                                    {
                                        showPropertyType.map((item, index) => (
                                            <option key={index} >{item.propertyType} </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='row px-2'>
                                <div className='col'>
                                    <label>Area (sq.ft)</label>
                                    <input
                                        className='form-control'
                                        type='number'
                                        name='sqft'
                                        placeholder='Enter the sqft'
                                        defaultValue={EditProperty.sqft}
                                        onChange={(e) => setSqft(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='col'>
                                    <label>Rate(per sq.ft)</label>
                                    <input
                                        className='form-control'
                                        type='number'
                                        name='rate'
                                        placeholder='Enter the rate'
                                        defaultValue={EditProperty.rate}
                                        onChange={(e) => setRate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='mx-2'>
                                <label>Description</label>
                                <textarea
                                    className='form-control'
                                    type='message'
                                    name='info'
                                    placeholder='Enter the description...'
                                    defaultValue={EditProperty.info}
                                    onChange={(e) => setInfo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='row my-3 mx-2'>
                                <Link to={`/manageproperty`} className='col'>
                                    <button className='w-100 btn bg-secondary text-light  mx-4' >
                                        Cancel
                                    </button>
                                </Link>
                                <button className='col btn bg-info mx-4' type='submit' onClick={e => onSubmit(e)}>
                                    Update
                                </button>
                                <ToastContainer />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        takeProperty()
        cityMaster()
        getProperty()
        getPropertyType()
    }, [])

    return (
        <>
            <HeaderSideBar />
            {one()}
        </>
    )
}

export default Start;