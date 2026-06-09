import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import UserProfile from '../UserProfileComponent/userProfile'
import './addDetails.css'

const AddDetails = () => {

    const API = 'http://localhost:3333/realestate',
        navigate = useNavigate()
    const [userData, setUserData] = useState('')

    const nxtPage = (path) => [
        navigate(path)
    ]

    const addYourDetails = () => {
        return (
            <Typography className='text-primary cp'
                onClick={() => nxtPage('/user/editprofile')}
                data-bs-tooltip='tooltip'
                title='Click to add your details'>Add your details</Typography>
        )
    }

    const userDetails = () => {
        return (
            <div className='addDetails py-2'>
                {
                    userData.data &&
                    (
                        <div className="row">
                            <div className="col-lg-11 mx-3">
                                <div className="card mb-4 px-3">
                                    <div className="card-body">
                                        <div className="row ">
                                            <div className="row my-3">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Full Name</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userData.data.userName} </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row my-3">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Role</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userData.data.role} </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row my-3">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Email</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userData.data.email} </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row my-3">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Mobile</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userData.data.phoneNumber}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row my-3">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Address</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {
                                                        userData.data.address ?
                                                            (
                                                                <p className="text-muted mb-0">{userData.data.address}</p>
                                                            ) :
                                                            addYourDetails()
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row my-3">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">city</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {
                                                        userData.data.city ?
                                                            (
                                                                <p className="text-muted mb-0">{userData.data.city}</p>
                                                            ) :
                                                            addYourDetails()
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row my-3">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">state</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    {
                                                        userData.data.state ?
                                                            (
                                                                <p className="text-muted mb-0">{userData.data.state}</p>
                                                            ) :
                                                            addYourDetails()
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        )
    }

    const getUserData = () => {
        fetch(`${API}/getuserdata`, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
            .then(res => { return res.json() })
            .then(res => {
                setUserData(res)
            })
            .catch(err => console.log("User data err: ", err.message))
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <UserProfile />
            {userDetails()}
        </>
    )
}

export default AddDetails;