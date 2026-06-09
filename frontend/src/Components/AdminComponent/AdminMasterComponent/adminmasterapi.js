import { useEffect, useState } from 'react'
import { Dashboard } from '../AdminDashboard/admindashboard'
import './adminmasterapi.css'

const AdminMaster = () => {
  const API = 'http://localhost:3333/realestate'
  const [location, setLocation] = useState(''),
    [propertyFor, setPropertyFor] = useState(''),
    [propertyType, setPropertyType] = useState(''),
    [showlocation, setShowlocation] = useState([]),
    [showPropertyType, setShowPropertyType] = useState([]),
    [showProperty, setShowProperty] = useState([]),
    [locationVisibility, setLocationVisibility] = useState(false),
    [propertyVisibility, setPropertyVisibility] = useState(false),
    [propertyTypeVisibility, setPropertyTypeVisibility] = useState(false);

  const addLocation = async e => {
    e.preventDefault()
    console.log('ADD LOCATION START...!')
    console.log('LOcation: ', location)
    try {
      const addLocation = {
        location
      }
      const url = `${API}/addlocation`
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addLocation)
      }

      fetch(url, requestOptions).then(async res => {
        const fetchData = await res.json()
        console.log('Response: ', fetchData)
        if (fetchData.data.status >= 199 && fetchData.data.status < 300) {
          alert(fetchData.data.message)
          e.target.reset()
        } else {
          alert(fetchData.data.message)
        }
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    console.log('ADD Properfy START...!')
    console.log('LOcation: ', propertyFor)

    try {
      const addpropertyFor = {
        propertyFor
      }
      const url = `${API}/propertyfor`
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addpropertyFor)
      }

      fetch(url, requestOptions).then(async res => {
        const fetchData = await res.json()
        console.log('Response: ', fetchData)
        if (res.status >= 199 && res.status < 300) {
          alert(fetchData.data.data)
          e.target.reset()
        } else {
          alert(fetchData.data.message)
        }
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  const onSubmitType = async (e, path) => {
    e.preventDefault();
    const data = {
      propertyType
    };

    await fetch(`${API}/${path}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(async res => {
        const fetchData = await res.json();
        console.log("Fetchdata: ", fetchData);
        if (res.status >= 199 && res.status < 300) {
          alert(fetchData.data.data)
          e.target.reset()
        } else {
          alert(fetchData.data.data)
        }
        return fetchData;
      })
      .catch(err => {
        console.log(err);
      })
  }

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

  // Location Table
  const showTable = () => {
    console.log('Show table')
    return (
      <>
        <div className='row my-5 mx-5 tableDiv'>
          <div className='col locations border-bottom border-dark'>
            <table className='table table-hover table-bordered border-dark bg-opacity-75 text-center'>
              <thead>
                <tr>
                  <th>SI.No</th>
                  <th>location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {showlocation.map((item, index) => (
                  <tr key={index} >
                    <td>{item.no} </td>
                    <td>{item.location}</td>
                    <td>
                      <button className='btn bg-danger text-white'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

  const showPropertyTable = () => {
    return (
      <>
        <div className='row my-5 mx-5 tableDiv'>
          <div className='col locations border-bottom border-dark'>
            <table className='table table-hover table-bordered border-dark bg-opacity-75 text-center'>
              <thead>
                <tr>
                  <th>SI.No</th>
                  <th>location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {showProperty.map((item, index) => (
                  <tr>
                    <td>{index + 1} </td>
                    <td>{item.propertyFor}</td>
                    <td>
                      <button className='btn bg-danger text-white'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

  const addpropertyFor = () => {
    return (
      <>
        <div className='row '>
          <h3>Add property for</h3>
          <div className='col-10'>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='row'>
                <div className='col-7'>
                  <input
                    className='form-control border-info'
                    name='propertyFor'
                    onChange={e => setPropertyFor(e.target.value)}
                    placeholder='Enter the property for'
                    required
                  />
                </div>
                <button className='col-2 btn btn-info mx-2' type='submit'>
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className='col-3 tables'>
            <button
              className='btn btn-outline-info px-2'
              onClick={e => setPropertyVisibility(!propertyVisibility)}
            >
              {propertyVisibility === true ? 'Hide' : 'Show property for'}
            </button>
          </div>
        </div>
        {propertyVisibility && showPropertyTable()}
      </>
    )
  }

  // Show Property Type Table...!
  const showPropertyTypeTable = () => {
    return (
      <>
        <div className='row my-5 mx-5 tableDiv'>
          <div className='col locations border-bottom border-dark'>
            <table className='table table-hover table-bordered border-dark bg-opacity-75 text-center'>
              <thead>
                <tr>
                  <th>SI.No</th>
                  <th>Property Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {showPropertyType.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1} </td>
                    <td>{item.propertyType}</td>
                    <td>
                      <button className='btn bg-danger text-white'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

  // Master
  const master = () => {
    return (
      <>
        <div className='master px-5 py-4'>
          <div className=''>
            <h3>Add location</h3>
            <div className='row addLocation'>
              <div className='col-10'>
                <form className='form' onSubmit={e => addLocation(e)}>
                  <div className='row'>
                    <div className='col-7'>
                      <input
                        className='form-control border-info'
                        onChange={e => setLocation(e.target.value)}
                        placeholder='Enter the location'
                        required
                      />
                    </div>
                    <button className='col-2 btn btn-info mx-2' type='submit'>
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className='col-3 tables'>
                <button
                  className='btn btn-outline-info px-4 id'
                  onClick={e => setLocationVisibility(!locationVisibility)}
                >
                  {locationVisibility === true ? 'Hide' : 'Show location'}
                </button>
              </div>
            </div>
            {locationVisibility && showTable()}
            {addpropertyFor()}
            <div className='row my-5'>
              <h3>Add property type</h3>
              <div className='col-10'>
                <form className='form' onSubmit={e => onSubmitType(e, 'propertytype')}>
                  <div className='row'>
                    <div className='col-7'>
                      <input
                        className='form-control border-info'
                        name='propertyType'
                        onChange={e => setPropertyType(e.target.value)}
                        placeholder='Enter the property type'
                        required
                      />
                    </div>
                    <button className='col-2 btn btn-info mx-2' type='submit'>
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className='col-3 tables'>
                <button
                  className='btn btn-outline-info px-2'
                  onClick={e =>
                    setPropertyTypeVisibility(!propertyTypeVisibility)
                  }
                >
                  {propertyTypeVisibility === true ? 'Hide' : 'Show property type'}
                </button>
              </div>
              {propertyTypeVisibility && showPropertyTypeTable()}
            </div>
          </div>
        </div>
      </>
    )
  }

  // Master API for location
  const cityMaster = () => {
    // const url = 'http://localhost:3333/showlocation'
    fetch(`${API}/showlocation`)
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

  const getPropertyType = async (path) => {
    await fetch(`${API}/${path}`)
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

  useEffect(e => {
    cityMaster()
    getProperty()
    getPropertyType('showpropertytype')
  }, [])

  return (
    <>
      <Dashboard />
      {master()}
    </>
  )
}

export default AdminMaster
