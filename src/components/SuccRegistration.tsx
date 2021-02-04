import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Message, Segment } from 'semantic-ui-react';

const SuccRegistration = withRouter((props: RouteComponentProps) => {
    

    return (
        <div className="div_central">
            <Segment>
                <Message
                success
                header='Your user registration was successful'
                content='You may now log-in with the username you have chosen'
                />
                <Button primary content="LOGIN" onClick={(e) => {
                    e.preventDefault();
                    props.history.push('/login');
                }}/>
            </Segment>
        </div>
        
    )

})

export default SuccRegistration;