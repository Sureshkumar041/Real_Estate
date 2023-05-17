import { Button, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import AdminDashboard from '../AdminDashboard/admindashboard'
import './userData.css'

const UserMgmt = () => {

    const API = 'http://localhost:3333/realestate',
        params = useParams();
    console.log('params: ', params && params.role);
    const [userData, setUserData] = useState(),
        [role, setRole] = useState(params.role),
        [totalPage, setTotalPage] = useState(),
        [currentPage, setCurrentPage] = useState(1)

    const handleChange = (e, value) => {
        if (e.target.name === 'role') {
            setRole(e.target.value)
            // setCurrentPage(1)
        } else {
            if (value !== '') {
                setCurrentPage(value)
            }
        }
        // getUserData(e.target.value || role, value || currentPage)
    }

    const userRegister = () => {
        return (
            <div className='usermgmt'>
                <Typography className='fw-bold m-2 fs-4'> User Registration Data</Typography>
                <div className='row'>
                    <div className="row">
                        <div className='col-3'>
                            <select
                                className='form-select rounded-1'
                                name='role'
                                value={role}
                                onChange={e => handleChange(e)}
                            >
                                <option>All role </option>
                                <option>Seller</option>
                                <option>Buyer</option>
                            </select>
                        </div>
                    </div>
                </div >
            </div >
        )
    }

    const dataTable = () => {
        return (
            <>
                <div className='row usermgmt userDataTable my-4'>
                    <table className='table table-hover text-center'>
                        <thead>
                            <tr className='bg-info th'>
                                <th className='bg-info border-0'>SI.No</th>
                                <th className='bg-info'>User name</th>
                                <th className='bg-info'>Email</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData && userData.map((item, index) => (
                                    <tr key={index}>
                                        <td> {(index + 1) + (currentPage * 5 - 5)} </td>
                                        <td>{item.userName} </td>
                                        <td>{item.email} </td>
                                        <td>{item.phoneNumber} </td>
                                        <td>
                                            <Button className='inside'>{item.role} </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='d-flex justify-content-end px-5'>
                    <Pagination
                        count={totalPage}
                        defaultPage={1}
                        color='primary'
                        onChange={handleChange} >
                    </Pagination>
                </div>
            </>
        )
    }

    const getUserData = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        fetch(`${API}/admin/userData?role=${role}&pageNo=${currentPage || 1}`, {
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(res => {
                setUserData(res.data.userData)
                setTotalPage(res.data.totalPage)
            })
            .catch(err => console.log("Get user data: ", err.message))
    }

    useEffect(() => {
        getUserData()
    }, [role, currentPage])

    return (
        <>
            <AdminDashboard />
            {userRegister()}
            {dataTable()}
        </>
    )
}

export default UserMgmt;