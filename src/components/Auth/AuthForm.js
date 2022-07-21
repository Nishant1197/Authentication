import { useState,useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from "../../store/auth-context"
import classes from './AuthForm.module.css';
import config from '../../config';
let {WEB_API_KEY}=config
const AuthForm = () => {
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
const history=useHistory()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  let {login}=useContext(AuthContext)
  const submitHandler=async (event)=>{
event.preventDefault();
const enteredEmail=emailInputRef.current.value;
const enteredPassword=passwordInputRef.current.value;
setIsLoading(true)
let url
if(isLogin)
{
   url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`
}
else{
 url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`
  }


  const response=await fetch(url,{
    method:'POST',
    body:JSON.stringify({
      email:enteredEmail,
      password:enteredPassword,
      returnSecureToken:true
    }),
    headers:{
      'Content-Type':'application/json'
    },
  }).then((res)=>{
    setIsLoading(false)
    if(res.ok)
    {
    return res.json();
    }
    else{
  return res.json().then((data)=>{
        console.log(data);
        alert(data.error.message)
        throw new Error(data.error.message);
      })
    }
   }).then(data=>{
    login(data.idToken)
    history.replace('/');
   }).catch((e)=>{
    alert(e.message)
   })
  


}


// console.log("fnnfn");
//   const data=await response.json()
// return data
// }
// catch(err)
// {
// console.log(err);
// }
// }
//   }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
        {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
        {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
