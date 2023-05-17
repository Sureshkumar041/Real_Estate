import { Link } from 'react-router-dom';
import Header from '../../UserComponent/HeaderComponent/header';
import './admindashboard.css';

export function Dashboard() {
    return (
        <>
            <Header />
            <div className="row admindash">
                <div className="col-2 bgColor text-center  menu">
                    <h3 className='my-4'>Admin Dashboard </h3>
                    <div className="text-center">
                        <Link to={'/realestate'} className='row text-decoration-none text-center text-white'>
                            <p className='n'>Home</p>
                        </Link>
                        <Link to={'/master'} className='row text-decoration-none text-center text-white'>
                            <p className='n'>Master</p>
                        </Link>
                        <Link to={'/realestate/dashboard/usermgmt/role'} className='row text-decoration-none text-center text-white'>
                            <p className='n'>User Registration</p>
                        </Link>
                        <Link to={'/realestate/admin/sellermgmt'} className='row text-decoration-none text-center text-white'>
                            <p className='n'>Manage Seller</p>
                        </Link>
                        <Link to={'/realestate/admin/buyermgmt'} className='row text-decoration-none text-center text-white'>
                            <p className='n'>Manage Buyer</p>
                        </Link>
                        <Link to={'/realestate/admin/enquiry'} className='row text-decoration-none text-center text-white'>
                            <p className='n'>Property Enquiry</p>
                        </Link>
                        <Link to={'/realestate/dashboard/notifications'} className='row text-decoration-none text-white'>
                            <p className='n' >Notifications</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

function AdminDashboard() {
    return (
        <>
            <Dashboard />
        </>
    )
}

export default AdminDashboard;