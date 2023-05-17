import './header.css'
import LogOutComponent from '../LogOutComponent/logoutComponent'
import { CgLogIn } from 'react-icons/cg'
import { CiUser } from 'react-icons/ci'
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { VscAccount } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { SlUserFollowing } from 'react-icons/sl'
import { TbMessageCircle } from 'react-icons/tb'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { FcHome } from 'react-icons/fc'


const Header = () => {

    const API = 'http://localhost:3333/realestate',
        navigate = useNavigate();
    const [userData, setUserData] = useState(''),
        [showProfile, setShowProfile] = useState(true),
        [profileOpen, setProfileOpen] = useState(false);

    const authorizedPerson = () => {
        return (
            <p className='fs-2' data-bs-tooltip='tooltip' title='Click to view menu'>
                <VscAccount className='cp' onClick={() => setProfileOpen(!profileOpen)} />
            </p>
        )
    }

    const nxtPage = path => {
        navigate(path)
    }

    const userProfile = () => {
        return (
            <div className='userDetailView'>
                <div className='userMenu'>
                    <p className='fs-4'>
                        <VscAccount className='mx-2 fs-4'></VscAccount>
                        {userData.userName}
                    </p>
                    {
                        userData.role === 'Buyer' ?
                            null :
                            (
                                userData.role === 'Seller' ?
                                    (
                                        <Link to={'/realestate/dashboard/notifications'} className='text-decoration-none text-info my-1' >
                                            <button className='btn btn-outline-info border-0 w-75'>
                                                <MdOutlineDashboardCustomize className='text-white mx-3' />
                                                Dashboard
                                            </button>
                                        </Link>
                                    )
                                    :
                                    (
                                        <Link to={'/realestate/dashboard/notifications'} className='text-decoration-none text-info my-1' >
                                            <button className='btn btn-outline-info border-0 w-75'>
                                                <MdOutlineDashboardCustomize className='text-white mx-3' />
                                                Dashboard
                                            </button>
                                        </Link>
                                    )
                            )
                    }
                    <Link to={'/realestate/propertyenquiry'} className='text-decoration-none text-info my-1'>
                        <button className='btn btn-outline-info border-0 w-75'>
                            <span><TbMessageCircle className='text-white mx-3' /></span>
                            Your Enquiry
                        </button>
                    </Link>
                    <Link to={'/realestate/user/viewprofile'} >
                        <button className='btn btn-outline-info border-0 w-75' >
                            <span>
                                <SlUserFollowing className='text-white mx-3' />
                            </span>
                            View Profile
                        </button>
                    </Link>
                    <LogOutComponent />
                </div>
            </div>
        )
    }

    const unAuthorizedPerson = () => {
        return (
            <div>
                <Button variant='contained' className='bg-white text-primary h5 mx-2' onClick={() => nxtPage('/realestate/signup')}>
                    Signup
                    <CiUser className='mx-1 fs-4'></CiUser>
                </Button>
                <Button variant='outlined' className='border text-white h5' onClick={() => nxtPage('/realestate/login')}>
                    <CgLogIn className='mx-1 fs-3'></CgLogIn>
                    Login
                </Button>
            </div>
        )
    }

    const headerTop = () => {
        return (
            <div className='headers row shadow-lg'>
                <div className="col px-4">
                    <FcHome className='fs-1' />
                    <Typography className='btn fs-2 text-light shadow-sm'>Real Estate</Typography>
                    <span className='mx-4'>
                        <Link to='/realestate' className='text-decoration-none'>
                            <button variant='outlined'
                                data-bs-tooltip='tooltip'
                                title='Click to home'
                                className='btn text-white border-bottom'>
                                Home
                            </button>
                        </Link>
                    </span>
                </div>
                <div className='col fs-3 d-flex justify-content-end m-2'>
                    {showProfile ? authorizedPerson() : unAuthorizedPerson()}
                </div>
            </div>
        )
    }

    const getUserData = () => {
        fetch(`${API}/getuserdata`, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
            .then(async res => {
                const fetchData = await res.json()
                if (res.status >= 199 && res.status < 300) {
                    setUserData(fetchData.data)
                } else {
                    if (fetchData.data.valid) {
                        setShowProfile(false)
                    } else {
                        console.log('Profile err: ', fetchData.data.data);
                    }
                }
            })
            .catch(err => console.log("User data err: ", err.message))
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <header>
                {headerTop()}
                {profileOpen && userProfile()}
            </header>
        </>
    )
}

export default Header;