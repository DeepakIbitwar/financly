import React, { useEffect } from 'react'
import "./style.css"
import { auth } from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg"

function Header() {
const [user, loading]=useAuthState(auth);
const navigate=useNavigate()

useEffect(()=>{
  if(user){
    navigate("/dashboard");
  }
},[user, loading])


     function logoutfnc(){
        try{
          
          signOut(auth)
            .then(()=>{
              toast.success("You Have Logged Out");
              navigate("/");
            })
            .catch((error)=>{
              toast.error(error.message);
            });
          
        }catch(e){
          toast.error(e.message);
        }


     }




  return (
    <div className='navbar'>
      <p className='logo'>Financly.</p>
      {
        user &&
        
        (
          <div style={{display: "flex", alignItems:'center' , gap: "0.75rem"}}>
            <img
            src={user.photoURL? user.photoURL: userImg}
            
            style={{borderRadius: "50%", height:"1.5rem", width: "1.5rem"}}
            />
         <p onClick={logoutfnc} className='logo link'>Logout</p>
         </div>)
      }
    </div>
  )
}

export default Header
