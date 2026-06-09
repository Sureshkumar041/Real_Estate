import { Backdrop, Button, CircularProgress, TextField, Typography } from '@mui/material'
import forgotPassword from '../../../../Image/Forgot Password.jpg'
import Header from '../../HeaderComponent/header'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SendOtp = () => {

    const API = 'http://localhost:3333/realestate',
        navigate = useNavigate()
    const [email, setEmail] = useState(''),
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

    const sendOtpMail = e => {
        e.preventDefault()
        setLoadingAction(true)
        console.log('Email: ', email);

        fetch(`${API}/user/forgotpassword?email=${email}`, {
            method: 'put'
        })
            .then(async res => {
                const fetchdata = await res.json()
                if (res.status >= 199 && res.status < 300) {
                    setLoadingAction(false)
                    success(fetchdata.data.message)
                    setTimeout(() => {
                        nxtPage(`/user/verifyotp/${fetchdata.data.userId}`)
                    }, 2000)
                } else {
                    setTimeout(() => {
                        setLoadingAction(false)
                        error(fetchdata.data)
                    }, 2000)
                }
            })
            .catch(err => console.log('Err: ', err.message))
    }


    const sendOtpForm = () => {
        return (
            <div style={{ width: '99%', maxHeight: '560px' }} className='row m-2 bg-light'>
                <div className='col-6 px-3'>
                    <img style={{ width: '88%' }} src={forgotPassword} alt='Forgot password' />
                </div>
                <div style={{ minHeight: '560px' }} className='col-6 bgColor d-flex justify-content-center align-items-center'>
                    <form className='bg-white p-2 w-50 shadow-lg rounded'>
                        <div className='text-center'>
                            <Typography className='fw-bold fs-3'>Email details</Typography>
                            <Typography>Enter your email to verify your profile information</Typography>
                        </div>
                        <div className='row mx-1 py-3'>
                            <TextField label='Enter email' autoComplete='username' required onChange={e => setEmail(e.target.value)} id='userName' variant='standard' />
                        </div>
                        <div className='row m-2 d-flex justify-content-center'>
                            <Button className='w-75' onClick={e => sendOtpMail(e)} variant='contained' >Send OTP</Button>
                            <ToastContainer />
                        </div>
                        <div className='m-1 d-flex justify-content-center'>
                            <Link to={'/signup'}
                                className='row text-decoration-none '>
                                Create new account
                            </Link>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <p className='mx-2'>Already have account ?
                                <Link to={'/login'}
                                    className='text-decoration-none' data-bs-tooltip='tooltip'
                                    title='Click to Login' >
                                    <span className='mx-2'>Login</span>
                                </Link>
                            </p>
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
            {sendOtpForm()}
            {loading()}
        </>
    )
}

export default SendOtp;