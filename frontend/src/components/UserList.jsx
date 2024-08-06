import axios from 'axios';
import React, { useState } from 'react'

const UserList = ({user}) => {

    const [button,setButton] = useState(user.status)

    const userBlockHandler = async()=>{
        const res = await axios.post(`http://localhost:3000/api/admin/updataStatus/${user._id}`, {action:'block'}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if(res.data){
            setButton('block')
          }
    
        }
    const userUnBlockHandler = async()=>{
        const res = await axios.post(`http://localhost:3000/api/admin/updataStatus/${user._id}`, {action:'active'}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if(res.data){
            setButton('active')
          }
    }

  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-md">
  <img 
    src={user.profilePicture} 
    alt="" 
    className="h-10 w-10 rounded-full object-cover border border-gray-200"
  />
  <div className="flex-1">
    <span className="block text-lg font-semibold">{user.username}</span>
    <span className="block text-gray-600">{user.email}</span>
  </div>
  {button=='active' ? (<button 
    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
    onClick={userBlockHandler}
  >
  Block
  </button>) : (<button 
    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
    onClick={userUnBlockHandler}
  >
  Un Block
  </button>)} 
  
</div>

  )
}

export default UserList
