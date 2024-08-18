import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Card from "./components/Card";
import { postData } from "./components/data";
import { io } from "socket.io-client";

function App() {
  const [socket,setSocket] = useState(null)
  const [val, setVal] = useState(0);
  const [switcher, setSwitcher] = useState("");
useEffect(() => {
  setSocket(io("http://localhost:3000"));

}, []);
const handleUser = ()=>{
  socket?.emit("newUser",val)
}
  return (
    <div>
      {switcher ? (
        <div className="w-screen h-[100vh] bg-gray-100 flex justify-center py-10">
          <div className="w-1/2 overflow-y-auto bg-white">
            <Nav user={val} socket={socket} />
            <div className="">{
              postData.map((item,i)=>{
                return <Card id={i} post={item} socket={socket} user={val}/>
              }
                
              )
              }</div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-[100vh] flex justify-center items-center">
          <div className="w-1/3 py-10 px-10 py-6 bg-gray-100">
            <input
              onChange={(e) => setVal(e.target.value)}
              className="w-full py-4 px-8 text-2xl"
              type="text"
            />
            <div
              onClick={() => {setSwitcher(val),handleUser()}}
              className="py-2 px-8 text-center bg-slate-500 text-white text-2xl cursor-pointer"
            >
              Log in
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
