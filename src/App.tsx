import React, {useState} from "react";
// import './App.css';
import LoginForm from './components/LoginForm';
import 'semantic-ui-css/semantic.min.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import Registration from './components/Registration'
import SuccRegistration from "./components/SuccRegistration";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

export interface IUser {
  firstName: string,
  lastName: string,
  email: string
}

interface IState extends IUser {
  logged: boolean
}
 
export const UserContext = React.createContext<IUser>({} as IUser);

const App = withRouter(function (props: RouteComponentProps) {

  const [state,setState] = React.useState<IState>({
    email: "",
    firstName: "",
    lastName: "",
    logged: false
  });

  const login = (user: IUser) => {
    setState({...state,...user, logged: true});
  }

  const logout = () => {
    setState({
      email: "",
      firstName: "",
      lastName: "",
      logged: false
    });
    props.history.push('/login');
  }

  React.useEffect(() => {
    console.log(props.history.location)
    if (!state.logged && props.history.location.pathname !== "/register" && props.history.location.pathname !== "/login") {
      console.log("Pushing to login page")
      props.history.push('/login');
    }
  })

  const override = css`
    display: block;
    margin: auto;
    border-color: teal;
    `;

  return (
    <UserContext.Provider value={state as IUser}>
      {state.logged === true && <Navbar logout={logout}/>}
      <div className="App">
        <Switch>
          <Route path='/sucssregistration' exact>
            <SuccRegistration />
          </Route>
          <Route path='/login' exact>
            <LoginForm login={login}/>
          </Route>
          <Route path='/register' exact>
            <Registration />
          </Route>
          <Route path='/' exact>
            {!state.logged && <ClipLoader loading={true} css={override} size={100} />}
            <Home />
          </Route>
          <Route path="*">
            {!state.logged && <ClipLoader loading={true} css={override} size={100} />}  
            </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
});

export default App;
