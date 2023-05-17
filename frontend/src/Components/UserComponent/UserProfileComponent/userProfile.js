import { useEffect, useState } from "react";
import profile from '../../../Image/Profile.jpg'
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import HeaderSideBar from "../HeaderSideBarComponent/headerSideBar";
import './userProfile.css'
import IconButton from '@mui/material/IconButton';
import { BsCamera } from 'react-icons/bs'
import { Button } from "@mui/material";

const UserProfile = () => {

    const API = 'http://localhost:3333/realestate',
        token = JSON.parse(localStorage.getItem('token'))
    const navigate = useNavigate()
    const [userData, setUserData] = useState('')

    const nxtPage = (path) => {
        navigate(path)
    }

    const setProfile = e => {
        const formData = new FormData();
        formData.append('profileImage', e.target.files[0])
        fetch(`${API}/user/editprofile`, {
            method: 'put',
            headers: {
                Authorization: token,
                Accept: 'applications/json'
            },
            body: formData
        })
            .then(async res => {
                const fetchData = await res.json();
                console.log('Res: ', fetchData);
                getUserData();
            })
            .catch(err => console.log('Profile Err: ', err.message))
    }

    const viewProfile = () => {
        return (
            <div className="yourProfile">
                {
                    userData.data && (
                        <div className="row my-2 px-3">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <div className="position-absolute" onClick={() => nxtPage('/realestate')} >
                                            <p className="fs-1 cp" >&times; </p>
                                        </div>
                                        {
                                            userData.data.profileImage ?
                                                (
                                                    <img className="rounded-circle"
                                                        style={{ width: 920, height: 280 }}
                                                        src={`http://localhost:3333/profileImages/${userData.data.profileImage}`} alt="profile" />
                                                ) :
                                                (
                                                    <img className="rounded-circle" src={profile} alt='wrong' />
                                                )
                                        }
                                        {
                                            userData.data.profileImage ?
                                                (
                                                    <>
                                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                                            <input hidden accept="image/*" name="profileImage" onChange={e => setProfile(e)} type="file" />
                                                            Edit <BsCamera className="mx-1" />
                                                        </IconButton>
                                                    </>
                                                ) :
                                                (
                                                    <>
                                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                                            <input hidden accept="image/*" name="profileImage" onChange={e => setProfile(e)} type="file" />
                                                            Upload <BsCamera className="mx-1" />
                                                        </IconButton>
                                                    </>
                                                )
                                        }
                                        <h5 className="my-3 text-primary fw-bolder">{userData.data.userName} </h5>
                                        <p className="text-muted mb-1">{userData.data.role} </p>
                                        <p className="text-muted mb-4">{userData.data.email} </p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button className="btn btn-outline-primary mx-2" data-bs-tooltip='tooltip' data-bs-placement='top' title='Click to change password' onClick={() => nxtPage('/realestate/user/changepassword')} >
                                                {/* <RiLockPasswordFill className="mx-1 text-danger"></RiLockPasswordFill> */}
                                                Change password
                                            </button>
                                            {/* <button type="button" className="btn btn-outline-primary mx-2">Role</button> */}
                                            <button type="button" className="btn btn-primary">{userData.data.role} </button>
                                            <FaUserEdit data-bs-tooltip='tooltip' data-bs-placement='top' title="Click to edit" className="fs-1 mx-2 cp text-danger" onClick={() => nxtPage('/realestate/user/editprofile')} ></FaUserEdit>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
                }
            </div >
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
            <HeaderSideBar />
            {viewProfile()}
        </>
    )
}

export default UserProfile;