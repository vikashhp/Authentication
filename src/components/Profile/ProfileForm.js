import classes from "./ProfileForm.module.css";
import { useRef } from "react";
import AuthContext from "../Store/auth-context";
import { useContext } from "react";

const ProfileForm = () => {
  const inputNewPasswordRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const newPassword = inputNewPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCwZv808OhRcTulajFFTsrXP6Qn3bwN-uE",
      {
        method: "POST",
        body: JSON.stringify({
          token: authCtx.token,
          password: newPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res =>{
      console.log(res)
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={inputNewPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
