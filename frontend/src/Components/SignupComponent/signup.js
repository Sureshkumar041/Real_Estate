import { Component } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'
import { withRouter } from '../NavigateComponent/router';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import FrontPageImage from '../UserComponent/FrontPageComponent/frontPageImage';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../UserComponent/HeaderComponent/header';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: 'Buyer',
            email: '',
            userName: '',
            phoneNumber: '',
            password: '',
            data: []
        }
    }

    goToLogin = () => {
        this.props.navigate('/login');
    }

    HandleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    Submit = async (e) => {
        e.preventDefault();
        console.log("Submit");
        const { role, email, userName, phoneNumber, password } = this.state;

        if(role && email && userName && phoneNumber && password){
            const data = {
                role,
                email,
                userName,
                phoneNumber,
                password
            };
            console.log("Register value : ", data);
    
            const url = 'http://localhost:3333/signup';
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
    
            await fetch(url, requestOptions)
                .then(async res => {
                    if (res.status >= 200 && res.status <= 299) {
                        console.log("Response: ", res.json({ "message": res.message }));
                        // alert('Register successfully...!');
                        toast.success('Register Successfully', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                        setTimeout(() => {
                            this.goToLogin();
                        }, 3000)
                        console.log("Status code: ", res.status);
                        return res;
                    } else {
                        // throw new Error(await res.json({'Message' : res.message}));
                        console.log("Status code: ", res.status);
                        // alert('User name or email address already exists')
                        toast.error('User name or email address already exists', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                        return res;
                    }
                })
                .then(data => {
    
                    console.log("Promise: ", data);
                })
                .catch(err => {
                    console.log(err.message);
                })
        }else{
            toast.warn('Fill all the field', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    }

    SignUpForm = () => {
        return (
            <div className='register border flex-row-reverse ' >
                <div className='row px-5 py-4 shadow-lg bg-white mov' >
                    <form >
                        <div className='row text-center'>
                            <Typography className='fs-3'>Signup</Typography>
                        </div>
                        <FormControl className='gap-2' variant='standard'>
                            <FormLabel>Role</FormLabel>
                            <RadioGroup row defaultValue={'Buyer'} name='role' onChange={e => this.HandleChange(e)} >
                                <FormControlLabel value="Buyer" control={<Radio />} label="Buyer" />
                                <FormControlLabel value="Seller" control={<Radio />} label="Seller" />
                            </RadioGroup>
                            <TextField label='Enter the email' type='email' name='email' variant='standard' onChange={e => this.HandleChange(e)} required />
                            <TextField label='Enter the user name' name='userName' variant='standard' onChange={e => this.HandleChange(e)} required />
                            <TextField label='Enter the phone number' name='phoneNumber' variant='standard' onChange={e => this.HandleChange(e)} required />
                            <TextField label='Enter the password' type={'password'} name='password' variant='standard' onChange={e => this.HandleChange(e)} required />
                        </FormControl>
                        <div className='row my-3 px-3'>
                            <Button variant='contained' onClick={e => this.Submit(e)} >SignUp</Button>
                            <ToastContainer />
                        </div>
                        <div className='row'>
                            <p className='mx-2 col'>Already have account ?
                                <Link to={'/login'} className='text-decoration-none' data-bs-tooltip='tooltip' data-bs-placement='top' title='Click to Login' >
                                    <span className='mx-2'>Login</span>
                                </Link>
                            </p>
                        </div>
                        {/* <Link to={'/login'} className='row text-decoration-none px-3'>
                            <p className='mx-2'>Already have account ?</p>
                        </Link> */}
                    </form>
                </div>
            </div>
        )
    }

    // <div className='register my-5'>
    //                 <div className='text-center'>
    //                     <h3 className='font-monospace fw-bold'>Signup</h3>
    //                 </div>
    //                 <div className='forms position-absolute'>
    //                     <form className='mx-4 my-2' onSubmit={e => this.Submit(e)}>
    //                         <div className='mx-5' id='radio'>
    //                             <input className='mx-3' type='radio' onChange={e => this.HandleChange(e)}
    //                                 name='role' value='Buyer' required ></input>
    //                             <label>Buyer</label>
    //                             <span className='mx-5'>
    //                                 <input className='mx-3' type='radio' onChange={e => this.HandleChange(e)}
    //                                     name='role' value='Seller' required ></input>
    //                                 <label>Seller</label>
    //                             </span>
    //                         </div>
    //                         <div className='my-2'>
    //                             <label>Email address</label>
    //                             <input className='form-control border-0 bg-secondary bg-opacity-25' type='email' onChange={e => this.HandleChange(e)}
    //                                 name='email' placeholder='example@gmail.com' required ></input>
    //                         </div>
    //                         <div className='my-2'>
    //                             <label>User name</label>
    //                             <input className='form-control border-0 bg-secondary bg-opacity-25' onChange={e => this.HandleChange(e)}
    //                                 name='userName' placeholder='username' required ></input>
    //                         </div>
    //                         <div className=' my-2'>
    //                             <label>Phone number</label>
    //                             <input className='form-control border-0 bg-secondary bg-opacity-25' onChange={e => this.HandleChange(e)}
    //                                 pattern='(?<!\d)\d{10}(?!\d)' title='Invalid phone number' name='phoneNumber'
    //                                 placeholder='phonenumber' required  ></input>
    //                         </div>
    //                         <div className="my-2">
    //                             <label>Password</label>
    //                             <input type="password" className="form-control border-0 bg-secondary bg-opacity-25" onChange={e => this.HandleChange(e)}
    //                                 pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    //                                 title='Password must be strong' name='password' placeholder="password" required  ></input>
    //                         </div>
    //                         <div className='row my-2 px-3'>
    //                             <button className='btn bg-info bg-opacity-75 my-2' type='Submit'>Submit</button>
    //                             {/* <button className='btn btn-outline-primary rounded-4'>Login</button> */}
    //                         </div>
    //                         <Link to={'/login'} className='row text-decoration-none px-3'>
    //                             <p className=''>Login</p>
    //                         </Link>
    //                     </form>
    //                 </div>
    //             </div>

    render() {
        return (
            <>
                <Header />
                <FrontPageImage />
                {this.SignUpForm()}
            </>
        );
    }

}

export default withRouter(SignUp);