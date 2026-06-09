import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { withRouter } from '../NavigateComponent/router';
import { Component } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import FrontPageImage from '../UserComponent/FrontPageComponent/frontPageImage';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../UserComponent/HeaderComponent/header';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            data: {},
            details: [],
        };
    }

    HandleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    nxtPage = (fetchdata) => {
        console.log("Role: ", fetchdata.data.info.role);
        setTimeout(() => {
            if (fetchdata.data.info.id !== '') {
                if (fetchdata.data.info.role === 'Seller') {
                    this.props.navigate('/realestate/dashboard/notifications');
                } else if (fetchdata.data.info.role === 'Buyer') {
                    this.props.navigate('/realestate');
                } else if (fetchdata.data.info.role === 'Admin') {
                    this.props.navigate('/realestate/dashboard/notifications');
                }
            }
        }, 2000)
    }

    Signin = async (e) => {
        e.preventDefault();

        const { userName, password } = this.state;
        const data = {
            userName,
            password
        };

        const url = 'http://localhost:3333/realestate/login';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        await fetch(url, requestOptions)
            .then(async res => {
                const fetchdata = await res.json();
                if (fetchdata.data.status >= 200 && fetchdata.data.status <= 299) {
                    localStorage.setItem('token', JSON.stringify(fetchdata.data.token));
                    localStorage.setItem('userdetails', JSON.stringify(fetchdata.data.info));
                    this.setState({ details: fetchdata.data.info })
                    toast.success('Login Successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                    this.nxtPage(fetchdata);
                } else {
                    this.setState({ details: fetchdata.data.info });
                    // alert(fetchdata.data.info)
                    toast.error(fetchdata.data.info, {
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
            })
            .catch(err => {
                console.log(err);
            })
    }

    authentication = () => {
        return (
            <React.Fragment>
                <div className='login border flex-row-reverse'>
                    <div className='row p-5 shadow-lg bg-white mov'>
                        <form>
                            <div className='row text-center'>
                                <Typography className='fs-3'>Login</Typography>
                            </div>
                            <div className='row'>
                                <TextField label='Enter email or User name' autoComplete='username' required onChange={e => this.HandleChange(e)} id='userName' variant='standard' />
                            </div>
                            <div className='row my-2'>
                                <TextField type={'password'} autoComplete='current-password' label='Enter the password' required variant='standard' id="password" onChange={e => this.HandleChange(e)} />
                            </div>
                            <Link to={'/user/sendotp'} className='row py-1'>
                                <p className='d-flex justify-content-end'>Forgot Password ?</p>
                            </Link>
                            <div className='row my-2 px-3'>
                                <Button variant='contained' onClick={e => this.Signin(e)} >Login</Button>
                                <ToastContainer />
                            </div>
                            <Link to={'/signup'} className='row text-decoration-none px-3 '>
                                <p className='mx-2' data-bs-tooltip='tooltip' title='Click to signup' >Create new account</p>
                            </Link>
                        </form>
                    </div>
                </div >
            </React.Fragment>
        )
    }

    render() {
        return (
            <>
                <Header />
                <FrontPageImage />
                {this.authentication()}
            </>
        )
    }
};

export default withRouter(Login);