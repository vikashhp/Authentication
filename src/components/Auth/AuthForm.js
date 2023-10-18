import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const inputEmailref = useRef();
  const inputPasswordref = useRef();
  const [isLoading,setIsLoading]=useState(false)

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = inputEmailref.current.value;
    const enteredPassword = inputPasswordref.current.value;

    setIsLoading(true)

    if(isLogin){

    }else{
     
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwZv808OhRcTulajFFTsrXP6Qn3bwN-uE',{
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(res =>{
        setIsLoading(false)
        if(res.ok){
        

        }else{
         return res.json().then(data =>{
           let errorMessage='Authentication Failed!';
           if(data && data.error && data.error.message){
            errorMessage=data.error.message
           }
           alert(errorMessage)
          })
        }
      })
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={inputEmailref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={inputPasswordref}
          />
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Cretae Account'}</button>}
         {isLoading && <p>Sending Request....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
