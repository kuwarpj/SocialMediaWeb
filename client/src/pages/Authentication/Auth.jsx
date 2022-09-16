
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUP } from '../../actions/AuthAction'
import './Auth.css'
const Auth = () => {

  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const loading = useSelector((state)=> state.AuthReducer.loading)

const initialState = { firstname: "", lastname: "", email: "",username: "", password: "", confirmpassword: "" }
  const [data, setData] = useState(initialState)

  const [confirmpass, setConfirmPass] = useState(true)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
setConfirmPass(true)
    if (isSignup) {
      data.password === data.confirmpassword ? dispatch(signUP(data)) : setConfirmPass(false)
    } else {
      dispatch(logIn(data))
      // localStorage.setItem("profile","data")
    }
  }

  const resetForm = () => {
    setConfirmPass(true)
    setData({ firstname: "", lastname: "" , password: "", confirmpassword: "", username: "" })
  }
  return (

    <div className='Auth'>
      <div class="wrapper">
        <h1>{isSignup ? "Signup" : "Log In"}</h1>
        {/* <p>Welcome back you've <br></br> been missed!</p> */}
        <form className='auth-form' onSubmit={handleSubmit}>


          {isSignup && (
            <>
              <input type="text" name='firstname' placeholder="First Name" onChange={handleChange} value={data.firstname} />
              <input type="text" name='lastname' placeholder="Last Name" onChange={handleChange} value={data.lastname} />



            </>


          )}
<input type="text" name='username' placeholder="Email" onChange={handleChange} value={data.username} />
          <input type="password" name='password' placeholder="Password" onChange={handleChange} value={data.password} />
          {isSignup && (
            <>
              <input type="password" name='confirmpassword' placeholder=" Confirm Password" onChange={handleChange} value={data.confirmpassword} />
            </>
          )}
          <span style={{ display: confirmpass ? "none" : "block", color: "red", fontsize: "12px" }} >
            Password doesn't match
          </span>

          <button type='submit' className='sign-button' >
            { isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p class="or">
          ----- or continue with -----
        </p>
        <div class="icons">
          <i class="fab fa-google"></i>
          <i class="fab fa-github"></i>
          <i class="fab fa-facebook"></i>
        </div>
        <div class="not-member" onClick={() => { setIsSignup((prev) => !prev); resetForm() }} style={{ cursor: "pointer" }}>

          {isSignup ? "Already have a Account Sign In" : "Not a member ? Sign Up"}
          {/* <a href="#">Sign In</a> */}
        </div>
      </div>



    </div>

  )

}

// function SignUp(){
//     return(


//     )
// }

// function Login(){
//     return(
//         <div class="wrapper">
//         <h1>Hello Again!</h1>
//         <p>Welcome back you've <br></br> been missed!</p>
//         <form>
//           <input type="text" placeholder="Enter username"/>
//           <input type="password" placeholder="Password"/>
//           <p class="recover">
//             <a  href="#">Recover Password</a>
//           </p>
//         </form>
//         <button className='sign-button'>Sign in</button>
//         <p class="or">
//           ----- or continue with -----
//         </p>
//         <div class="icons">
//           <i class="fab fa-google"></i>
//           <i class="fab fa-github"></i>
//           <i class="fab fa-facebook"></i>
//         </div>
//         <div class="not-member">
//           Not a member? <a href="#">Register Now</a>
//         </div>
//       </div>

//     )
// }

export default Auth