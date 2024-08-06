import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../util/firebase.js'
import axios from 'axios'
import { updateUserStart, updateUserFailure, updateUserSuccess,deleteUserStart, deleteUserFailure,deleteUserSuccess,signOut } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true;

const Profile = () => {
  const fileRef = useRef(null)
  const [image , setImage] = useState(undefined)
  const [imagePrecent, setImagePrecent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

   let { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(()=>{
    if(image) handleFileUpload(image)
  },[image])

  const handleFileUpload = (image) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef,image);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          setImagePrecent(Math.round(progress))
        },
        (error) =>{
          setImageError(true)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({...formData, profilePicture: downloadURL}))
        }
      );
  }

  const hadleChange = (e) =>{
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      const res = await axios.post(`http://localhost:3000/api/user/update/${currentUser._id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = res.data
     
      if(data){
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
      }else{
        dispatch(updateUserFailure(data))
        return
      }
    }catch(err){
      dispatch(updateUserFailure(err))
    }
  }

  const handleDeleteAccount = async() => {
    try {
      dispatch(deleteUserStart())
      const res = await axios.delete(`http://localhost:3000/api/user/delete/${currentUser._id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = res.data
      if(data) {
        console.log('hele')
        dispatch(deleteUserSuccess())
        navigate('/sign-in')
      }
    } catch (error) {
      dispatch(deleteUserFailure())
    }
  }

  const handleSignout = async()=>{
    try {
      await axios.get('http://localhost:3000/api/auth/signout')
      dispatch(signOut())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Profile </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
        <img className='mt-2 h-24 w-24 self-center cursor-pointer rounded-full object-cover' 
        src={formData.profilePicture || currentUser.profilePicture} alt="Profile-img" 
        onClick={()=>fileRef.current.click()}
        />
        <p className='text-sm self-center'>{imageError ? 
        ( <span className='text-red-700'> Error Uploading image (file size must less than 2 MB) </span> ) : 
        imagePrecent > 0 && imagePrecent < 100 ? ( <span className='text-slate-700'> Uploading: {imagePrecent} %  </span> ): 
        imagePrecent===100 ? ( <span className='text-green-700'> Image Uploaded Successfully </span> ) : ''}</p>
        <input defaultValue={currentUser.username} type="text" id="username" placeholder='Usernmae' 
        className='bg-slte-100 rounded-lg p-3 outline-none' onChange={hadleChange}
        />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder='Email' 
        className='bg-slte-100 rounded-lg p-3 outline-none' onChange={hadleChange}
        />
        <input type="password" id="password" placeholder='Password' 
        className='bg-slte-100 rounded-lg p-3 outline-none' onChange={hadleChange}
        />
       <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
        {loading ? 'Loading' : 'Update'}
       </button>

      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount} >Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignout}>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error&& 'something went wrong'}</p>
      <p className='text-red-700 mt-5'>{updateSuccess&& 'Profile updated'}</p>
    </div>
  )
}

export default Profile
