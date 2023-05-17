import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

const UpdateProperty = () => {
    const propertyId = useLocation().state.propertyId;
    const navigate = useNavigate();
    const API = 'http://localhost:3333/realestate';
    const token = JSON.parse(localStorage.getItem('token'));
    const [address, setAddress] = useState(''),
        [city, setCity] = useState(''),
        [state, setState] = useState(''),
        [pincode, setPincode] = useState(''),
        [image, setImage] = useState([]),
        [type, setType] = useState(''),
        [sqft, setSqft] = useState(''),
        [rate, setRate] = useState(''),
        [info, setInfo] = useState(''),
        [propertyFor, setpropertyFor] = useState(''),
        [editProperty, setEditProperty] = useState([]),
        [showlocation, setShowlocation] = useState([]),
        [showProperty, setShowProperty] = useState([]),
        [showPropertyType, setShowPropertyType] = useState([]);
    // [formVisibility, setFormVisibility] = useState(true)

    const handleChange = async e => {
        const files = e.target.files
        var multipleFiles = [];
        [...files].forEach(element => {
            multipleFiles.push(element)
        })
        setImage(multipleFiles)
    }

    const createPro = property => {
        return fetch(`${API}/updateproperty/${propertyId}`, {
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
                    navigate('/realestate/manageproperty')
                } else {
                    alert(fetchData.data.data)
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
        // formData.append('image', image);
        image.forEach(element => {
            formData.append('image', element)
        })
        formData.append('propertyFor', propertyFor)
        formData.append('type', type)
        formData.append('sqft', sqft)
        formData.append('rate', rate)
        formData.append('info', info)
        formData.append('sellerId', sellerData.id)
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
        await createPro(formData)
    }


    const cityMaster = () => {
        const url = 'http://localhost:3333/realestate/showlocation'
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
        await fetch(`${API}/${path}`)
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

    const takeProperty = async () => {
        await fetch(`${API}/editproperty/${propertyId}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                Authorization: token
            }
        })
            .then(async res => {
                const fetchData = await res.json();
                console.log("Fetch data EDit: ", fetchData);
                if (res.status >= 199 && res.status < 300) {
                    alert('Edit')
                    setEditProperty([fetchData.data.data]);
                    console.log("Donnee..!");
                }
                else {
                    if (fetchData.data.data === 'jwt expired' || fetchData.data.data === 'jwt malfarmed') {
                        if (window.confirm('Login again')) {
                            navigate('/realestate/login')
                        }
                    } else {
                        alert(fetchData.data.data);
                    }
                }
            })
            .catch(err => {
                console.log('Error: ', err.message);
            })
    }

    useEffect(() => {

        // setRealEstate(true)
        cityMaster()
        getProperty()
        getPropertyType('showpropertytype')
        takeProperty()
    }, [])


    const changeProperty = () => {
        console.log('lets Update property...!', editProperty);
        return (
            <>
                <div className="edit bg-info">
                    <div className='editProperty'>
                        <form
                            className='form  mx-5 my-2'
                            id='form'
                            onSubmit={e => onSubmit(e)}
                        >
                            <div className='text-center py-2'>
                                <h2>Edit Property</h2>
                            </div>
                            <div className='row mx-2 my-2'>
                                <select
                                    className='form-select'
                                    onChange={e => setCity(e.target.value)}
                                    name='city'
                                    required
                                >
                                    <option >{editProperty.city}</option>
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
                                    onChange={e => setAddress(e.target.value)}
                                    defaultValue={editProperty.address}
                                    required
                                />
                            </div>
                            <div className='row px-2'>import Parent2 from './../components/Parent2/parent2'

                                <div className='col'>
                                    <label>State</label>
                                    <input
                                        className='form-control'
                                        name='state'
                                        placeholder='Enter the state'
                                        defaultValue={setState(editProperty.state)}
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
                                        defaultValue={editProperty.pincode}
                                        onChange={e => setPincode(e.target.value)}
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
                                    // defaultValue={item.image}
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            <div className='row mx-1 my-3'>
                                <select
                                    className='col form-select mx-2'
                                    name='propertyFor'
                                    onChange={e => setpropertyFor(e.target.value)}
                                    // defaultValue={item.propertyFor}
                                    required
                                >
                                    <option >{editProperty.propertyFor}</option>
                                    {showProperty.map((item, index) => (
                                        <option key={index} value={item.propertyFor}>
                                            {item.propertyFor}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className='col form-select mx-2'
                                    name='type'
                                    onChange={e => setType(e.target.value)}
                                    // defaultValue={editProperty.propertyType}
                                    required
                                >
                                    <option>{editProperty.type} </option>
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
                                        onChange={e => setSqft(e.target.value)}
                                        defaultValue={editProperty.sqft}
                                        required
                                    />
                                </div>
                                <div className='col'>
                                    <label>Rate(per sq.ft)</label>
                                    <input
                                        className='form-control'
                                        name='rate'
                                        placeholder='Enter the rate'
                                        onChange={e => setRate(e.target.value)}
                                        defaultValue={editProperty.rate}
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
                                    onChange={e => setInfo(e.target.value)}
                                    defaultValue={editProperty.info}
                                    required
                                />
                            </div>
                            <div className='row my-3 mx-2'>
                                <button className='col btn bg-secondary text-light  mx-4'>
                                    Cancel
                                </button>
                                <button className='col btn bg-info mx-4' type='submit'>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    const updateForm = () => {
        return (
            <>
                <div>
                    <p>Update property here...!</p>
                    {changeProperty()}
                </div>
            </>
        )
    }
    return (
        <>
            {updateForm()}
        </>
    )
}

export default UpdateProperty;