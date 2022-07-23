import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef } from 'react/cjs/react.development';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import config from '../../config';
let {WEB_API_KEY}=config
const ProfileForm = () => {
  const newPasswordInputRef =useRef()
  const history=useHistory()
const {token}=useContext(AuthContext)
const submitHandler=(event)=>{
event.preventDefault();
const enteredNewPassword=document.getElementById("new-password").value;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "password": enteredNewPassword,
  "idToken": token,
  "returnSecureToken": "false"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${WEB_API_KEY}`, requestOptions)
  .then(response => response.text())
  .then(result => history.push('/')
  
  )
  .catch(error => console.log('error', error));
}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'  >New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
