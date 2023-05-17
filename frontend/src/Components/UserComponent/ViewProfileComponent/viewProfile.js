import { Fab, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import './viewProfile.css'
import profile from '../../../Image/Profile.jpg'
import { FcLike, FcHome, FcComments } from 'react-icons/fc'
import { BiLike } from 'react-icons/bi'
import { MdOutlinePendingActions } from 'react-icons/md'
import { RiMessage2Fill } from 'react-icons/ri'
import { IoPricetagOutline } from 'react-icons/io5'
import { TfiEmail } from 'react-icons/tfi'

const ViewProfile = () => {
    const API = 'http://localhost:3333/realestate',
        navigate = useNavigate(),
        params = useParams(),
        token = JSON.parse(localStorage.getItem('token'));
    const [openProfile, setOpenProfile] = useState(true),
        [userData, setUserData] = useState('')

    const nxtPage = path => {
        navigate(path)
    }

    const handleClose = () => setOpenProfile(false)

    const viewUserProfile = () => {
        return (
            <div>
                <Modal
                    className='d-flex justify-content-center align-items-center'
                    open={openProfile}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="container bg-white rounded">
                        {
                            userData &&
                            <>

                                <div className="row justify-content-center">
                                    <div className="col-12 col-sm-8 col-lg-6">
                                        <div className="section_heading text-center wow fadeInUp my-1" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
                                            <p className="animate-charcter">{userData.userName} </p>
                                            <p className="text-primary"> <TfiEmail className="fs-3 text-danger" /> {userData.email} </p>
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="single_advisor_profile wow fadeInUp border" data-wow-delay="0.4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
                                            <div className="advisor_thumb ">
                                                {
                                                    userData.profileImage ?
                                                        (
                                                            <img style={{ width: 200, height: 180 }} src={`http://localhost:3333/profileImages/${userData.profileImage}`} alt="" />
                                                        ) :
                                                        (
                                                            <img src={profile} alt="" />
                                                        )

                                                }
                                                <div className="social-info">
                                                </div>
                                            </div>
                                            <div className="single_advisor_details_info">
                                                <h6>{userData.userName}</h6>
                                                <p className="designation">{userData.role} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 w-75">
                                        <div className="py-2" data-wow-delay="0.4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
                                            <div className="d-flex justify-content-center">
                                                <div style={{ width: '90%' }} className="row about-list rounded-3  my-4 border shadow">
                                                    <div className="col-md-6">
                                                        <div className="media">
                                                            <label>Role</label>
                                                            <p>{userData.role}</p>
                                                        </div>
                                                        <div className="media">
                                                            <label>Email</label>
                                                            <p>{userData.email} </p>
                                                        </div>
                                                        <div className="media">
                                                            <label>Phone Number</label>
                                                            <p>{userData.phoneNumber} </p>
                                                        </div>
                                                    </div>{
                                                        userData.address && userData.city && userData.state ?
                                                            (
                                                                <div className="col-md-6">
                                                                    <div className="media">
                                                                        <label>Address</label>
                                                                        <p>{userData.address} </p>
                                                                    </div>
                                                                    <div className="media">
                                                                        <label>City</label>
                                                                        <p>{userData.city}</p>
                                                                    </div>
                                                                    <div className="media">
                                                                        <label>State</label>
                                                                        <p>{userData.state} </p>
                                                                    </div>
                                                                </div>
                                                            ) :
                                                            (
                                                                <div className="col-md-6">
                                                                    <div className="media">
                                                                        <label>Address</label>
                                                                        <p>Not update</p>
                                                                    </div>
                                                                    <div className="media">
                                                                        <label>City</label>
                                                                        <p>Not update</p>
                                                                    </div>
                                                                    <div className="media">
                                                                        <label>State</label>
                                                                        <p>Not update</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                            {
                                                userData.role === 'Buyer' ?

                                                    <div className="d-flex justify-content-between gap-5 user_Details_Count">
                                                        <Fab color="warning" variant="extended" aria-label="add">
                                                            Bought Properties
                                                            <FcHome className="fs-2 mx-1" />
                                                        </Fab>
                                                        <Fab color="secondary" variant="extended" aria-label="edit">
                                                            Enquiries <FcComments className="fs-3 mx-1" />
                                                        </Fab>
                                                        <Fab variant="extended">
                                                            Wishes
                                                            <FcLike className='text-white fs-3 mx-1' />
                                                        </Fab>
                                                        <Fab variant="extended" color="primary" aria-label="like">
                                                            Likes
                                                            <BiLike className="fs-3 mx-1" />
                                                        </Fab>
                                                    </div> :
                                                    <div className="d-flex justify-content-between gap-3 user_Details_Count">
                                                        <Fab color="warning" variant="extended" aria-label="add">
                                                            Post Properties
                                                            <FcHome className="fs-3 mx-1" />
                                                        </Fab>
                                                        <Fab color="secondary" variant="extended" aria-label="edit">
                                                            Sold Properties
                                                            <IoPricetagOutline className="fs-3 mx-1" />
                                                        </Fab>
                                                        <Fab variant="extended">
                                                            Pending Properties
                                                            <MdOutlinePendingActions className='fs-3 mx-1' />
                                                        </Fab>
                                                        <Fab variant="extended" color="primary" aria-label="like">
                                                            Enquiries
                                                            <RiMessage2Fill className="fs-1 mx-1" />
                                                        </Fab>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </div>


                </Modal >
            </div >
        )
    }

    const getUserData = () => {
        fetch(`${API}/getuserdata?userId=${params.userId}`, {
            headers: {
                Authorization: token
            }
        })
            .then(async res => {
                const fetchData = await res.json();
                setUserData(fetchData.data)
            })
            .catch(err => console.log('Err fd: ', err.message))
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <>
            {viewUserProfile()}
        </>
    )
}

export default ViewProfile;