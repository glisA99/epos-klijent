import axios from 'axios';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Message, Divider, Button, Icon} from 'semantic-ui-react';
import { IUser } from '../App';

interface IProps {
  login(user: IUser):void
}

interface IDetails {
  email: string,
  password: string,
  error: boolean,
  processing: boolean,
  firstName: string,
  lastName: string
}

interface IUserDTO extends IUser {
  password: string
}

const initDetails = {
  email: "",
  password: "",
  error: false,
  processing: false,
  firstName: "",
  lastName: ""
}

const Registration = withRouter(function (props: RouteComponentProps) {

    const [details,setDetails] = React.useState<IDetails>(initDetails);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDetails({...details, [e.currentTarget.name]: e.currentTarget.value});
    }

    const validateData = (firstName: string,lastName: string, email: string, password: string) => {
      if (firstName !== "" && lastName !== "" && password !== "" && password.length > 4) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return true;
      }
      return false;
    }

    const registerUser = async (user:IUserDTO) => {
      try {
        const res = await axios.post('http://localhost:3000', {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          action: "register"
      })
        if (typeof res.data === 'boolean') {
          return res.data;
        } else {
          console.log("Error thrown")
          throw new Error();
        }

      } catch (err) {
        return false;
      }
    }
  
    return (
      <form> 
            <div className="form-inner">
            <Message
              attached
              header='Welcome to our site!'
              content='Fill out the form below to sign-up for a new account'
            />
                <h2>Registration</h2>
                {details.error === true && <Message style={{textAlign: "center"}}
                    error
                    header='There was some errors with your registration'
                    list={[
                        'All fields are required and can not be left empty'
                    ]}
                    /> }
                <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <input type="firstName" name="firstName" id="firstName" value={details.firstName} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <input type="lastName" name="lastName" id="lastName" value={details.lastName} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={details.email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={details.password} onChange={onChange}/>
                </div>
                <Divider horizontal />
                <input type="submit" value="REGISTER" onClick={async (e:React.FormEvent<HTMLInputElement>) => {
                    e.preventDefault(); 
                    if (details.processing === false) {
                      console.log("processing");
                      setDetails({...details,processing: true});
                      if (validateData(details.email, details.firstName, details.lastName, details.password) === true) {
                        const user = {
                          email: details.email,
                          firstName: details.firstName,
                          lastName: details.lastName,
                          password: details.password
                        }
                        const res = await registerUser(user);
                        if (res === true) {
                          props.history.push('/sucssregistration');
                          return;
                        }
                        setDetails({...details, error: true});
                      }else {
                        setDetails({...details, error: true});
                      }
                      setDetails({...details,processing: false});
                    }
                    
                }}/>
                <br></br><br></br>
                <Message attached='bottom' warning>
                  <Icon name='help' />
                  Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
                </Message>
            </div>
            
        </form>
    );
  })
  
  
  export default Registration;
  