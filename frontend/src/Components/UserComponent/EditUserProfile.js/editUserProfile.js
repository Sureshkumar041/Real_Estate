import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserProfile from "../UserProfileComponent/userProfile";
import './editUserProfile.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditUserProfile = () => {

    const API = 'http://localhost:3333/realestate';
    const token = JSON.parse(localStorage.getItem('token'));
    const navigate = useNavigate()
    const [userData, setUserData] = useState(''),
        [userName, setUserName] = useState(''),
        [email, setEmail] = useState(''),
        [phoneNumber, setPhoneNumber] = useState(''),
        [address, setAddress] = useState(''),
        [city, setCity] = useState(''),
        [state, setState] = useState('')

    // Navigate to other component
    const nxtPage = (path) => {
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

    const updateChange = e => {
        e.preventDefault()
        const data = {
            userName,
            email,
            phoneNumber,
            address,
            city,
            state
        }

        fetch(`${API}/user/editprofile`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(data)
        })
            .then(async res => {
                const fetchData = await res.json();
                if (res.status >= 199 && res.status < 300) {
                    success(fetchData.data.data)
                    setTimeout(() => {
                        nxtPage('/realestate/user/viewprofile')
                    }, 2000)
                } else {
                    console.log("Error Bad");
                    if (fetchData.data.valid) {
                        if (window.confirm('Login your account')) {
                            nxtPage('/realestate/login')
                        }
                    } else {
                        error(fetchData.data.data)
                    }
                }
            })
            .catch(err => console.log('Edit Err: ', err.message))
    }

    const editUserData = () => {
        console.log("User data: ", userData && userData.data);
        console.log('userName: ', userName && userName);
        return (
            <div className="us d-flex justify-content-center">
                {
                    userData && (
                        <div className="w-75 px-5 py-3 border">
                            <div className="d-flex justify-content-center">
                                <div>
                                    <Typography className="m-2 my-2 fw-bold fs-4">Edit Your Profile </Typography>
                                </div>
                            </div>
                            <form className="d-grid gap-3" onSubmit={e => updateChange(e)} >
                                <div className="row">
                                    <TextField label='User name' className="bgInput" variant="standard" defaultValue={userName} onChange={e => setUserName(e.target.value)} ></TextField>
                                </div>
                                <div className="row">
                                    <TextField label='Email' className="bgInput" variant="standard" defaultValue={email} onChange={e => setEmail(e.target.value)} ></TextField>
                                </div>
                                <div className="row">
                                    <TextField label='Phone Number' variant="standard" defaultValue={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} ></TextField>
                                </div>
                                <div className="row">
                                    <TextField label='Address' variant="standard" defaultValue={address} onChange={e => setAddress(e.target.value)} ></TextField>
                                </div>
                                <div className="row">
                                    <TextField label='City' variant="standard" defaultValue={city} onChange={e => setCity(e.target.value)} ></TextField>
                                </div>
                                <div className="row">
                                    <TextField label='State' variant="standard" defaultValue={state} onChange={e => setState(e.target.value)} ></TextField>
                                </div>

                                <div className="row mx-5 d-gird gap-3">
                                    <Button variant="outlined" className="col" onClick={() => nxtPage('/realestate/user/viewprofile')} >Cancel</Button>
                                    <Button variant="contained" className="col" type="sumbit" >Save Changes</Button>
                                    <ToastContainer />
                                </div>
                            </form>
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
                setUserName(res.data.userName)
                setEmail(res.data.email)
                setPhoneNumber(res.data.phoneNumber)
                setAddress(res.data.address)
                setCity(res.data.city)
                setState(res.data.state)
            })
            .catch(err => console.log("User data err: ", err.message))
    }

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <>
            <UserProfile />
            {editUserData()}
        </>
    )
}

export default EditUserProfile;