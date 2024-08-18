import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
const Card = ({id,post,socket,user}) => {
  const [like,setLike] = useState(false)
  console.log(like)
 const handleNotification = (type)=>{
  socket.emit("sendNotification",{
    senderName:user,
    receperName:post.userName,
    type
  })
 }
  return (
    <div key={id} className='px-10 mb-20'>
       <div className="flex items-center gap-3 mb-3">
        <img className='w-10 h-10 rounded-full' src={post.profile} alt="dvd" />
        <h2 className='font-bold'>{post.fullName}</h2>
       </div>
       <div className="w-full">
       <img className='w-full' src={post.postImg} alt="dvd" />
       </div>
       <div className="mt-2 flex gap-4 items-center">
        {
          like ? (<div className='cursor-pointer'><FaHeart size={30}/></div>) : (  <div onClick={()=>(  setLike(true), handleNotification(1))} className='cursor-pointer'><CiHeart size={30}/></div>)
        }
          <div onClick={()=>handleNotification(2)} className='cursor-pointer'><FaRegComment size={30}/></div>
          <div onClick={()=>handleNotification(3)} className='cursor-pointer'><CiShare2 size={30}/></div>
       </div>
    </div>
  )
}

export default Card
