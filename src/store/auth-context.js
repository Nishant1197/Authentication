import { createContext } from "react"
import { useState } from "react/cjs/react.development";

 const AuthContext=createContext();

export const AuthProvider=({children})=>{
   let initialState= localStorage.getItem('token')
let [token,setToken]=useState(initialState);
let userIsLoggedIn=!!token;
let loginHandler=(token)=>{
   setToken(token)
   localStorage.setItem('token',token)
}
let logoutHandler=()=>{
    setToken(null)
    localStorage.removeItem('token')
   
}
let contextValue={
    token:token,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler
};
return(
<AuthContext.Provider value={contextValue} >{children}</AuthContext.Provider>
)}
export default AuthContext;