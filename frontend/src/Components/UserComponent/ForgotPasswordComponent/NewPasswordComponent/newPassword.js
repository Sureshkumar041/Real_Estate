import { Backdrop, Button, CircularProgress, TextField, Typography } from '@mui/material'
import forgotPassword from '../../../../Image/Forgot Password.jpg'
import Header from '../../HeaderComponent/header'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NewPassword = () => {

    const API = 'http://localhost:3333/realestate',
        navigate = useNavigate(),
        params = useParams()
    const [newPassword, setNewPassword] = useState(''),
        [cnfmPassword, setCnfmPassword] = useState(''),
        [loadingAction, setLoadingAction] = useState(false)

    const nxtPage = path => {
        navigate(path)
    }

    const success = msg => {
        return toast.success(msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }

    const error = msg => {
        return toast.error(msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }

    const changePassword = e => {
        e.preventDefault()
        if (newPassword && cnfmPassword) {
            setLoadingAction(true)
            fetch(`${API}/user/newpassword?userId=${params.userId}&newpswd=${newPassword}&cnfmpswd=${cnfmPassword}`, {
                method: 'put'
            })
                .then(async res => {
                    const fetchdata = await res.json()
                    if (res.status >= 199 && res.status < 300) {
                        setLoadingAction(false)
                        success(fetchdata.data)
                        setTimeout(() => {
                            nxtPage(`/realestate/login`)
                        }, 2000)
                    } else {
                        setTimeout(() => {
                            setLoadingAction(false)
                            error(fetchdata.data)
                        }, 2000)
                    }
                })
                .catch(err => console.log('Err: ', err.message))
        } else {
            error('All fields required')
        }
    }

    const updatePasswordForm = () => {
        return (
            <div style={{ width: '99%', maxHeight: '560px' }} className='row m-2 bg-light'>
                <div className='col-6 px-3'>
                    <img style={{ width: '88%' }} src={forgotPassword} alt='Forgot password' />
                </div>
                <div style={{ minHeight: '560px' }} className='col-6 bgColor d-flex justify-content-center align-items-center'>
                    <form className='bg-white p-2 w-50 h-50 shadow-lg rounded'>
                        <div className='text-center m-1'>
                            <Typography className='fw-bold fs-3'>Change</Typography>
                            <Typography>Your Password</Typography>
                        </div>
                        <div className='row m-1'>
                            <TextField label='Enter new password' autoComplete='username'
                                required onChange={e => setNewPassword(e.target.value)} variant='standard' />
                        </div>
                        <div className='row m-1'>
                            <TextField label='Enter new password' type='password'
                                autoComplete='username' required onChange={e => setCnfmPassword(e.target.value)} variant='standard' />
                        </div>
                        <div className='row my-4 d-flex justify-content-center'>
                            <Button className='w-75' onClick={e => changePassword(e)} variant='contained' >Change Password</Button>
                            <ToastContainer />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const loading = () => {
        return (
            <>
                {
                    loadingAction &&
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
            </>
        )
    }

    return (
        <>
            <Header />
            {updatePasswordForm()}
            {loading()}
        </>
    )
}

export default NewPassword;