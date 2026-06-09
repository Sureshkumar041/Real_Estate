import './postproperty.css'
import Seller from '../SellerComponent/SellerDashComponent/seller'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function PostProperty() {
  const API = 'http://localhost:3333/realestate'
  const navigate = useNavigate();
  const [address, setAddress] = useState(''),
    [city, setCity] = useState(''),
    [state, setState] = useState(''),
    [pincode, setPincode] = useState(''),
    [image, setImage] = useState([]),
    [type, setType] = useState('1BHK'),
    [sqft, setSqft] = useState(''),
    [rate, setRate] = useState(''),
    [info, setInfo] = useState(''),
    [propertyFor, setpropertyFor] = useState('Sell'),
    [showlocation, setShowlocation] = useState([]),
    [showProperty, setShowProperty] = useState([]),
    [showPropertyType, setShowPropertyType] = useState([]);

  const handleChange = async e => {
    const files = e.target.files
    console.log("Image: ", e.target.files);
    var multipleFiles = [];
    [...files].forEach(element => {
      multipleFiles.push(element)
    })
    setImage(multipleFiles)
  }

  const createPro = async product => {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('Token: ', token);
    return fetch(`${API}/property`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: token
      },
      body: product
    })
      .then(async response => {
        const fetchData = await response.json()
        if (response.status >= 199 && response.status < 300) {
          // alert(fetchData.data.data)
          success(fetchData.data.data)
          setTimeout(()=>{
            navigate('/manageproperty')
          },2000)
        } else {
          alert(fetchData.data.data)
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
    image.forEach(element => {
      formData.append('image', element)
    })
    formData.append('propertyFor', propertyFor)
    formData.append('type', type)
    formData.append('sqft', sqft)
    formData.append('rate', rate)
    formData.append('info', info)
    formData.append('sellerId', sellerData.id)
    formData.append('sellerName', sellerData.userName)
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

  // const warning = (msg) => {
  //   toast.warning(msg, {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // }

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

  useEffect(e => {
    cityMaster()
    getProperty()
    getPropertyType('showpropertytype')
  }, [])

  const nxtPage = path => {
    navigate(path)
  }

  // Property Upload form ...!
  const propertyForm = () => {
    return (
      <>
        <div className='postproperty'>
          <form
            className='form  mx-5 my-2'
            id='form'
            onSubmit={e => onSubmit(e)}
          >
            <div className='text-center py-2'>
              <h2>Post Property</h2>
            </div>
            <div className='row mx-2 my-2'>
              <select
                className='form-select'
                onChange={e => setCity(e.target.value)}
                name='city'
                required
              >
                <option defaultValue>Select the city</option>
                {showlocation.map(item => (
                  <React.Fragment key={item.no}>
                    <option>{item.location}</option>
                  </React.Fragment>
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
                onChange={e => handleChange(e)}
                required
              />
            </div>
            <div className='row mx-1 my-3'>
              <select
                className='col form-select mx-2'
                name='propertyFor'
                onChange={e => setpropertyFor(e.target.value)}
                required
              >
                <option value='select anyone'>Choose property for</option>
                {showProperty.map((item, index) => (
                  <option key={index} value={item.propertyFor}>
                    {' '}
                    {item.propertyFor}{' '}
                  </option>
                ))}
              </select>
              <select
                className='col form-select mx-2'
                name='type'
                onChange={e => setType(e.target.value)}
                required
              >
                <option value='null'>Property type</option>
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
                required
              />
            </div>
            <div className='row my-3 mx-2'>
              <button className='col btn bg-secondary text-light  mx-4' onClick={() => nxtPage('/dashboard/notifications')}>
                Cancel
              </button>
              <button className='col btn bg-info mx-4' type='submit'>
                {' '}
                Submit
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </>
    )
  }

  return (
    <>
      <Seller />
      {propertyForm()}
    </>
  )
}

export default PostProperty