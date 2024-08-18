import React,{useState,useEffect} from 'react'
import { CiBellOn } from 'react-icons/ci'
import { FaRegEnvelope } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const Nav = ({user,socket}) => {
  const [msg,getMsg] = useState([])
  const [open,setOpen] = useState(false)
  useEffect(() => {
    socket.on("getNotification",(data)=>{
      getMsg((prev)=>[...prev,data])
    })
  }, []);

  const displayNotification = ({senderName,type})=>{
    let action;
    if (type=== 1) {
       action = "like"
    }else if (type === 2) {
      action = "comment"
    } else if (type === 3) {
      action = "share"
    }

    return (
      <p className='mb-2 bg-white py-1 px-2 shadow-md'>{senderName} {action} your post</p>
    )
  }

  console.log(msg)
  return (
    <div className='flex justify-between items-center relative text-gray-500 px-10 mb-20 py-10 bg-amber-300'>
       <span className='text-5xl font-bold top-10 right-10'>{user}</span>
      <span className='text-2xl font-bold'>Hello Coder</span>
      <div className='flex gap-4 items-center'>
      <div onClick={()=>setOpen(!open)} className='cursor-pointer relative'><CiBellOn size={30} />
         {
          msg.length > 0 && (
            <div className="counter absolute -top-2 w-5 h-5 -right-1 text-white rounded-full bg-rose-500 flex justify-center items-center">{msg.length}</div>
          )
         }
      </div>
       <div className='cursor-pointer relative'><FaRegEnvelope size={30} /></div>
       <div className='cursor-pointer relative'><IoSettingsOutline size={30} /></div>
       {
        open && (
          <div className="bg-gray-50 absolute top-20 right-0 py-2">
          {msg.map((n,i)=>(
               <div key={i} className="">
                { displayNotification(n)}
               </div>
          ))}
         </div>
        )
       }
      </div>
    </div>
  )
}

export default Nav
