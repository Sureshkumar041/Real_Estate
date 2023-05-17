import { Button } from "@mui/material";
import UserProfile from "../UserProfileComponent/userProfile";
import { RiLockPasswordFill } from "react-icons/ri"
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ChangePassword = () => {

    const navigate = useNavigate();
    const API = 'http://localhost:3333/realestate';
    const token = JSON.parse(localStorage.getItem('token'))
    const [password, setPassword] = useState(''),
        [newPassword, setNewPswd] = useState(''),
        [cnfmPassword, setCnfmPswd] = useState('')

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

    const editPswd = async (e) => {
        e.preventDefault()
        const formData = {
            password,
            newPassword,
            cnfmPassword
        }

        // const formData = new FormData():
        await fetch(`${API}/user/changepassword`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(formData)
        })
            .then(async res => {
                const fetchData = await res.json();
                if (res.status >= 199 && res.status < 300) {
                    success(fetchData.data.data)
                    setTimeout(() => {
                        nxtPage('/realestate/user/viewprofile')
                    }, 2000)
                } else {
                    if (fetchData.data.valid) {
                        if (window.confirm('Login your account')) {
                            nxtPage('/realestate/login')
                        }
                    } else {
                        error(fetchData.data.data)
                    }
                }
            })
            .catch(err => console.log("Change Pswd err: ", err.message))
    }

    const changePswd = () => {
        return (
            <div className="addDetails">
                <div className="d-flex justify-content-center py-2">
                    <Button variant="text" color="primary" className="my-2 border-bottom">
                        {/* <RiLockPasswordFill className="mx-2"></RiLockPasswordFill> */}
                        Change password
                    </Button>
                </div>
                <form className="d-grid gap-3 px-5" onSubmit={e => editPswd(e)}>
                    <div className="input-group gap-2">
                        <input
                            tyoe='password'
                            name="password"
                            className="form-control bg-secondary bg-opacity-25 rounded border-0"
                            placeholder="Enter the current password"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group gap-2">
                        <input
                            // type='password'
                            name="newPassword"
                            className="form-control bg-secondary bg-opacity-25 rounded border-0"
                            placeholder="Enter the new password"
                            onChange={e => setNewPswd(e.target.value)}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            title='Password must be strong'
                            required
                        />
                        <input
                            type='password'
                            name="cnfmPassword"
                            className="form-control bg-secondary bg-opacity-25 rounded border-0"
                            placeholder="Enter the confirm password"
                            onChange={e => setCnfmPswd(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-form row mx-5 d-flex gap-2 py-2 justify-content-center ">
                        <Button variant="outlined" className="col" onClick={() => nxtPage('/realestate/user/viewprofile')} >Cancel</Button>
                        <Button variant="contained" className="col" type="" >Change Password</Button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
        )
    }

    return (
        <>
            <UserProfile />
            {changePswd()}
        </>
    )
}

export default ChangePassword;