import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginRegForm.css'




export default function LoginForm () {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
 
    // function handleLoginSubmit(event) {
    //     event.prevenDefault()


    //     reset fields
    //     setEmail("")
    //     setPassword("")
    // }

    // function handleLoginChange (event) {
    //     let {name, value} = event.target

    //     switch (name) {
    //         case "email":
    //             setEmail(value);
    //             break;
    //         case "password":
    //             setPassword(value);
    //             break;
    //         default:
    //             break;
    //     }
    // }

    return (
        <div className="LoginRegForm">
                <form 
                    id="login-form"
                    // onSubmit={handleLoginSubmit}
                >

                    <ul 
                        className="rpgui-container framed-golden" 
                        id="login-box"
                    >
                        <div className="login-text">
                            <label className="login-text">
                                <p> Login Here, Fellow Campaigners</p>
                            </label>
                        </div>
                        
                        <label id="email" htmlFor="email">
                            Email:
                            <input 
                                id="email"
                                type="text"
                                name="email"
                                // value={email}
                                defaultValue="user@someEmail.com" 
                                // onChange={handleLoginChange}
                            />
                        </label>
                            
                        <label id="password" htmlFor="password">
                            Password:
                            <input 
                                id="password" 
                                type="password"
                                name="password" 
                                // value={password}
                                defaultValue="user@someEmail.com" 
                                // onChange={handleLoginChange}
                            />
                        </label>
                        <div className="links">
                            <Link to="/forgotpw" id="forgot">
                                Forgot Password  
                            </Link>
               
                            <Link to="/registration" id="registration">
                                Register
                            </Link>
                        </div>
                    </ul>
                </form>
        </div>
    )
}