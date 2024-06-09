import {useEffect, useState } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { register,clearAuthError } from "../../actions/userActions";
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
export const Register = () => {
    const[userData,setUserData]=useState({
        name:"",
        email:"",
        password:""
    });
    const[avatar,setAvatar]=useState("");
    const[avatarPreview,setAvatarPreview]=useState("/images/avatar.jpeg");
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const{loading,error,isAuthenticated} =useSelector(state=>state.authState)

    const changeHandler=(e)=>{
        if(e.target.name=== 'avatar'){
            const reader=new FileReader();
            reader.readAsDataURL(e.target.files[0])

            reader.onload=()=>{
                if(reader.readyState ===2){
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }
        }else{
            setUserData({...userData,[e.target.name]:e.target.value})
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar);
        dispatch(register(formData))
    }
    useEffect(()=>{
        if(isAuthenticated) {
            navigate('/');
            return
        }
        if(error)  {
            toast(error, {
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[error, isAuthenticated, dispatch, navigate])


    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form  onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                    <h1 className="mb-3">Register</h1>

                    <div className="form-group">
                        <label for="email_field">Name</label>
                        <input name="name" onChange={changeHandler} type="name" id="name_field" className="form-control"  />
                    </div>

                    <div className="form-group">
                        <label for="email_field">Email</label>
                        <input
                            name="email"
                            onChange={changeHandler}
                            type="email"
                            id="email_field"
                            className="form-control"
                            
                        />
                    </div>

                    <div className="form-group">
                        <label for="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            name="password"
                            onChange={changeHandler}
                            className="form-control"
                           
                        />
                    </div>

                    <div className='form-group'>
                        <label for='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img
                                        src={avatarPreview}
                                        className='rounded-circle'
                                        alt='Avatar'
                                    />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    onChange={changeHandler}
                                    className='custom-file-input'
                                    id='customFile'
                                />
                                <label className='custom-file-label' for='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    )
}
