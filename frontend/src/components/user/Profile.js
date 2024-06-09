import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile () {
    const { user }  = useSelector(state => state.authState);

    return (
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid mt-3" src={user.avatar??'./images/avatar.jpeg'} alt='' />
                </figure>
                <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5 ">
                    Edit Profile
                </Link>
            </div>
    
            <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{user.name}</p>
    
                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                <Link to="/orders" className="btn btn-success w-50 my-5 mx-1">
                    My Orders
                </Link>

                <Link to="/myprofile/update/password" className="btn btn-primary w-50 mx-1">
                    Change Password
                </Link>
            </div>
        </div>
    )
}