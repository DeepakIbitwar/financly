import React from 'react'
import Header from '../componants/Header'
import SignUpSigninComponant from '../componants/SignupSignin'
function Signup() {
  return (
    <div>
      <Header/>
      <div className='wrapper'><SignUpSigninComponant/></div>
    </div>
  )
}

export default Signup
