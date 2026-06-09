import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import './updatePro.css'


const UpdateProp = (props) => {

    const API = 'http://localhost:3333/realestate',
        token = JSON.parse(localStorage.getItem('token')),
        navigate = useNavigate();
    console.log("props.propertyId data: ", props.propertyId);
    const [address, setAddress] = useState(props && props.propertyId && props.propertyId.address ? props.propertyId.address : 'sdfsfsd'),
        [city, setCity] = useState(props.propertyId.city),
        [state, setState] = useState(props.propertyId.state),
        [pincode, setPincode] = useState(props.propertyId.pincode),
        [image, setImage] = useState([props.propertyId.image]),
        [type, setType] = useState(props.propertyId.type),
        [sqft, setSqft] = useState(props.propertyId.sqft),
        [rate, setRate] = useState(props.propertyId.rate),
        [info, setInfo] = useState(props.propertyId.info),
        [propertyFor, setpropertyFor] = useState(props.propertyId.propertyFor),
        [formVisibility, setFormVisibility] = useState(true),
        [showlocation, setShowlocation] = useState([]),
        [showProperty, setShowProperty] = useState([]),
        [showPropertyType, setShowPropertyType] = useState([]);

    console.log("address: ", address);

    const handleChange = async e => {
        const files = e.target.files
        var multipleFiles = [];
        [...files].forEach(element => {
            multipleFiles.push(element)
        })
        setImage(multipleFiles)
    }

    const createPro = property => {
        return fetch(`${API}/updateproperty/${props.propertyId._id}`, {
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
                    alert(fetchData.data.data)
                    setFormVisibility(!formVisibility)
                    false && differProperty()
                } else {
                    alert(fetchData.data.data)
                }
            })
            .catch(err => console.log(err))
    }

    const update = async (e) => {
        e.preventDefault()
        console.log('Onsubmit...!');
        // const sellerData = JSON.parse(localStorage.getItem('userdetails'));
        const formData = new FormData()
        formData.append('address', address)
        formData.append('city', city)
        formData.append('state', state)
        formData.append('pincode', pincode)
        // formData.append('image', image);
        console.log('Fetch image: ', props.propertyId.image);
        console.log("Set image sumbit: ", image);
        // setImage(props.propertyId.image)
        image.forEach(element => {
            formData.append('image', element)
        })
        formData.append('propertyFor', propertyFor)
        formData.append('type', type)
        formData.append('sqft', sqft)
        formData.append('rate', rate)
        formData.append('info', info)
        // formData.append('sellerId', sellerData.id)
        console.log("Formdata: ", [...formData]);
        // setCity('')
        // setAddress('')
        // setImage('')
        // setInfo('')
        // setType('')
        // setRate('')
        // setSqft('')
        // setPincode('')
        // setpropertyFor('')
        // setState('')
        await createPro(formData)
    }

    const cancel = () => {
        setFormVisibility(!formVisibility)
        navigate('/manageproperty')
    }

    // const setValue = () => {
    //     console.log("CAme...!");

    // }

    const differProperty = () => {
        console.log("differ property Set image: ", image);
        console.log("props differ: ", props.propertyId);
        return (
            <>
                <div className="edit bg-info">
                    <div className='editProperty'>
                        <form
                            className='form  mx-5 my-2'
                            id='form'
                        >
                            <div className='text-center py-2'>
                                <h2>Edit Property</h2>
                            </div>
                            <div className='row mx-2 my-2'>
                                <select
                                    className='form-control'
                                    onChange={(e) => setCity(e.target.value)}
                                    name='city'
                                    required
                                >
                                    <option >{city}</option>
                                    {showlocation.map((item, index) => (
                                        <option key={index} >{item.location}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='row mx-2 '>
                                <label>Address line</label>
                                <input
                                    className='form-control'
                                    name='address'
                                    placeholder='Enter the street name'
                                    defaultValue={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='row px-2'>
                                <div className='col'>
                                    <label>State</label>
                                    <input
                                        className='form-control'
                                        name='state'
                                        placeholder='Enter the state'
                                        defaultValue={state}
                                        onChange={(e) => setState(e.target.value)}
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
                                        defaultValue={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row mx-2'>
                                <label>Upload property photo</label>
                                <input
                                    className='form-control'
                                    multiple
                                    type='file'
                                    name='image'
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className='row mx-1 my-3'>
                                <select
                                    className='col form-select mx-2'
                                    name='propertyFor'
                                    onChange={(e) => setpropertyFor(e.target.value)}
                                    required
                                >
                                    <option >{propertyFor}</option>
                                    {showProperty.map((item, index) => (
                                        <option key={index} value={item.propertyFor}>
                                            {item.propertyFor}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className='col form-select mx-2'
                                    name='type'
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                >
                                    <option>{type} </option>
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
                                        name='sqft'
                                        placeholder='Enter the sqft'
                                        defaultValue={sqft}
                                        onChange={(e) => setSqft(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='col'>
                                    <label>Rate(per sq.ft)</label>
                                    <input
                                        className='form-control'
                                        name='rate'
                                        placeholder='Enter the rate'
                                        defaultValue={rate}
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
                                    defaultValue={info}
                                    onChange={(e) => setInfo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='row my-3 mx-2'>
                                <button className='col btn bg-secondary text-light  mx-4' onClick={() => cancel()} >
                                    Cancel
                                </button>
                                <button className='col btn bg-info mx-4' type='submit' onClick={e => update(e)}>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    // useEffect(() => {
    //     onLoad()
    // }, [])

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
        console.log('City master...!')
        fetch(`${API}/showpropertyfor`)
            .then(async res => {
                const fetchData = await res.json()
                return fetchData
            })
            .then(fetchData => {
                setShowProperty(fetchData.data.data)
                console.log('Show property for : ', fetchData.data.data)
            })
            .catch(err => {
                console.log('Show location: ', err.message)
            })
    }

    const getPropertyType = async (path) => {
        await fetch(`${API}/showpropertytype`)
            .then(async res => {
                const fetchData = await res.json();
                return fetchData;
            })
            .then(fetchData => {
                console.log('Get property type: ', fetchData)
                setShowPropertyType(fetchData.data.data);
            })
            .catch(err => {
                console.log("Get property type: ", err);
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const value = () => {
    //     setCity(props.propertyId.city)
    //     setAddress(props.propertyId.address)
    //     setImage(props.propertyId.image)
    //     setInfo(props.propertyId.info)
    //     setType(props.propertyId.type)
    //     setRate(props.propertyId.rate)
    //     setSqft(props.propertyId.sqft)
    //     setPincode(props.propertyId.pincode)
    //     setpropertyFor(props.propertyId.propertyFor)
    //     setState(props.propertyId.state)
    // }

    useEffect(() => {
        getPropertyType();
        cityMaster();
        getProperty();
    }, [])

    return (
        <>
            {props.propertyId && formVisibility ? differProperty() : null}
        </>
    )
}

export default UpdateProp;