import axios from 'axios';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Divider, Message } from 'semantic-ui-react';
import { IUser } from '../App';

interface IProps {
    login(user: IUser):void
}

interface IDetails {
    email: string,
    password: string,
    error: boolean,
    validating: boolean
}

export interface userDTO {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

const initData = {
    email: "", 
    password: "",
    error: false,
    validating: false
};

const LoginForm = withRouter(function(props: RouteComponentProps & IProps) {

    const [details, setDetails] = useState<IDetails>(initData);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({...details, [e.currentTarget.name]: e.currentTarget.value});
    }

    async function validateDetails(email: string, password: string ) {
        try {
            const res = await axios.post('http://localhost:3000', {
                email: email,
                password: password,
                action: "login"
            })
            if (typeof res === 'boolean') {
                return false;
            }else return res.data as userDTO;
            

        } catch (err) {
            return false;
        }

    }

    return (
        <form> 
            <div className="form-inner">
                <h2>Login</h2>
                {details.error === true && <Message style={{textAlign: "center"}}
                    error
                    header='There was some errors with your submission'
                    list={[
                        'Invalid username or password'
                    ]}
                    /> }
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={onChange} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={onChange} value={details.password}/>
                </div>
                <Divider horizontal />
                <input type="submit" value="LOGIN" onClick={async (e:React.FormEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    if (!details.validating) {
                        setDetails({...details,validating: true});
                        console.log({
                            email: details.email,
                            pass: details.password
                        })
                        const res = await validateDetails(details.email, details.password);
                        if (typeof res === 'boolean') {
                            console.log("settings error");
                            setDetails({ ...initData, error: true, validating: false});
                            return;
                        }
                        props.login(res as userDTO);
                        props.history.push('/');
                        
                    } 
                }}/>
                <Button content="REGISTER" primary style={{marginLeft: "5px", borderRadius: "8px"}} onClick={() => {
                    props.history.push("/register");
                }}/>
            </div>
        </form>
    )
})

export default LoginForm
