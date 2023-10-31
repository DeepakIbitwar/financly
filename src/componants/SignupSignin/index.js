import React, { useState } from 'react'
import "./style.css";
import Input from "../Input/index"
import {createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth, db, doc, provider, setDoc} from "../../firebase"
import Button from '../Button';
// import {toast} from "react-toastify";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
// import {doc, setDoc} from "firebase/firestore"
import { GoogleAuthProvider} from 'firebase/auth';
function SignUpSigninComponant() {
  const [name , setName]=useState("");
   const [email, setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword, setConfirmPassword]=useState("");
const [loading, setLoading]=useState(false)

const [loginForm,setLoginForm]=useState(false);

const navigate=useNavigate();
function SignupWithEmail(){
  // console.log("Name" ,name)
  // console.log("Name" ,email)
  // console.log("Name" ,password)
  // console.log("Name" ,confirmPassword)
  
setLoading(true);
  if(name!="" && email!=""&& password!="" && confirmPassword!="" ){
    if(password==confirmPassword){
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    toast.success("User Created");
    setLoading(false)
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    createDoc(user)
    // navigate("/dashboard")
    toast.success("User Created");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
    setLoading(false)
    // ..
  });

    }else{
      toast.error("Password and Confirm Password Doesn't Match");
      setLoading(false)
    }

  
}else{
  toast.error("All fields are mandatory")
  setLoading(false);
}
}

function loginUsingEmail(){
  console.log("Deepak");
  setLoading(true);

  if(email!=""&& password!="" ){
   
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // navigate("/dashboard") 
      // Signed in 
      const user = userCredential.user;
      navigate("/dashboard") 
      toast.success("User Logged In")
     createDoc(user)
      console.log("User", user);
      setLoading(false);
      navigate("/dashboard")      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
      setLoading(false);
    });

    
  }else{
    toast.error("All Fields Are Mandatory");
    setLoading(false);
  }
}

async function createDoc(user){
  setLoading(true);

  if(!user) return;
const userRef=doc(db,"users",user.uid);
const userData = await getDoc(userRef);
if(!userData.exists()){
  try{
    await setDoc(doc(db, "users", user.uid),{
      name : user.displayName? user.displayName:name,
      email: user.email,
      photoURL: user.photoURL? user.photoURL:"",
      createdAt:new Date()
    });
    toast.success("Doc created");
  }catch(e){
    toast.error(e.message);
  }
}else{
  // toast.error("Doc already exists");
  setLoading(false);
}
}
function googleAuth(){
setLoading(true)

  try{
    setLoading(true);
    
  signInWithPopup(auth, provider)
  .then((result) => {
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.

    credentialFromResult(result);
    
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("USer>>>" ,user)
    createDoc(user);
    setLoading(false);
    
    navigate("/dashboard");
    toast.success("user authenticated");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    
    toast.error(errorMessage);
    // ...
  });

  }catch(e){
    toast.error(e.message);

  }
}

    return (
      <>{loginForm ? <><div className='signup-wrapper'>
      <h2 className='title'>Login On<span style={{color:"var(--them)"}}>Financly.</span></h2>
      <form >
        <Input label={"Email"}
         state={email}
        setState={setEmail}
        placeholder={"JohnDoe@gmail.com"}/>
         <Input label={"Password"}
        type="password"
         state={password}
        setState={setPassword}
        placeholder={"Example123"}/>


<Button 
disabled={loading}
text={loading ? "Loading..." :"Login Using Email and Password"}
 onClick={loginUsingEmail}
 />
 {/* <ToastContainer/> */}

<p className='p-login'>or</p>

<Button text={loading ? "Loading..." : "Login Using Google"} blue={true} onClick={googleAuth}/>

 <p  className='p-login' style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>or Don't Have An Account ? Click Here</p>
 
      </form>
    </div></>:<div className='signup-wrapper'>
      <h2 className='title'>Sign Up On <span style={{color:"var(--them)"}}>Financly.</span></h2>
      <form >

        
        <Input
         label={"Full Name"}
         state={name}
        setState={setName}
        
        placeholder={"John Doe"}
        />


        <Input label={"Email"}
         state={email}
        setState={setEmail}
        placeholder={"JohnDoe@gmail.com"}/>


        <Input label={"Password"}
        type="password"
         state={password}
        setState={setPassword}
        placeholder={"Example123"}/>


        <Input label={"Confirm Password"}
       type="password"
         state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"Example123"}/>

<Button 
disabled={loading}
text={loading ? "Loading..." :"Signup Using Email and Password"}
 onClick={SignupWithEmail}/>
 <ToastContainer/>

<p className='p-login' style={{textAlign:"center", margin: 0}} >or</p>

<Button
 text={loading ? "Loading..." : "Signup Using Google"} 
 blue={true} onClick={googleAuth}/>

 <p  style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)} className='p-login'>or Have an Account  Already? click Here</p>
      </form>
    </div>}
    
    </>
  )
}

export default SignUpSigninComponant
