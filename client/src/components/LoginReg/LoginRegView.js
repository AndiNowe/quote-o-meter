// //This shows how Login and Registration would look 
// //as a full unit without interrupting original App

// import React, { useState } from 'react'
// import { Switch, Route, useHistory } from 'react-router-dom'
// // import LoginForm from './LoginForm'

// //helper functions
// import Local from './helpers/Local'
// import Api from './helpers/Api'




// export default function LoginRegView () {

//     const [user, setUser] = useState(Local.getUser());
//     const [loginErrorMsg, setLoginErrorMsg] = useState("");
//     const history = useHistory();


//     async function doLogin(username, password) {
//         let response = await Api.loginUser(username, password);
//         if (response.ok) {
//             Local.saveUserInfo(response.data.token, response.data.user);
//             setUser(response.data.user);
//             setLoginErrorMsg('');
//             history.push('/');
//         } else {
//             setLoginErrorMsg('Login failed');
//         }
//     }

//     function doLogout() {
//         Local.removeUserInfo();
//         setUser(null);
//         history.push('/');
//     }



//     return (
//         <div className="LoginRegView">

//             {/* <NavBar user={user} onLogout={doLogout}  /> */}

//             <div className="container">
//                 <Switch>

//                     <Route path="/" exact>

//                     </Route>

//                 </Switch>
//             </div>
//             {/* <LoginForm /> */}
//         </div>
        
//     )
// }