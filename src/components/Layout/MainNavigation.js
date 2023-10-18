import { Link } from "react-router-dom";
import { useContext } from "react";

import classes from "./MainNavigation.module.css";
import AuthContext from "../Store/auth-context";
import { useHistory } from 'react-router-dom';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const IsLoggedIn = authCtx.isLoggedIn;

  const history=useHistory()

  const logoutHandler=()=>{
    authCtx.logout()
     history.replace('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!IsLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {IsLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          {IsLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
