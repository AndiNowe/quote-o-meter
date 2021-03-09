// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import './LoginRegForm.css'




// export default function LoginForm () {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
 
//     function handleLoginSubmit(event) {
//         event.prevenDefault()
//         props.onSubmit(username, password)

//         //reset fields
//         setUsername("")
//         setPassword("")
//     }

//     function handleLoginChange (event) {
//         let {name, value} = event.target

//         switch (name) {
//             case "username":
//                 setUsername(value);
//                 break;
//             case "password":
//                 setPassword(value);
//                 break;
//             default:
//                 break;
//         }
//     }

//     return (
//         <div className="LoginRegForm">
//             <div className="login">
//                 <h2>Login</h2>

//                 {
//                     props.error && (
//                         <div className='aler alert-danger'>{props.error}</div>
//                     )
//                 }

            
//                 <form 
//                     id="login-form"
//                     onSubmit={handleLoginSubmit}
//                 >

//                     <ul 
//                         className="rpgui-container framed-golden" 
//                         id="login-box"
//                     >
//                         <div className="login-text">
//                             <label className="login-text">
//                                 <p> Login Here, Fellow Campaigners</p>
//                             </label>
//                         </div>
                        
//                         <label id="username" htmlFor="username">
//                             Email:
//                             <input 
//                                 id="username"
//                                 type="text"
//                                 name="username"
//                                 value={username}
//                                 defaultValue="LagerthaTheFierce" 
//                                 onChange={handleLoginChange}
//                             />
//                         </label>
                            
//                         <label id="password" htmlFor="password">
//                             Password:
//                             <input 
//                                 id="password" 
//                                 type="password"
//                                 name="password" 
//                                 value={password}
//                                 defaultValue="user@someEmail.com" 
//                                 onChange={handleLoginChange}
//                             />
//                         </label>
//                         <div className="links">
//                             <Link to="/forgotpw" id="forgot">
//                                 Forgot Password  
//                             </Link>
               
//                             <Link to="/registration" id="registration">
//                                 Register
//                             </Link>
//                         </div>
//                     </ul>
//                 </form>
//                 </div>
//         </div>
//     )
// }