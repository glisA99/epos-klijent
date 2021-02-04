import React from 'react';
import { Button, Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { UserContext } from '../App';

interface IProps {
    logout():void
}

export default function Navbar(props: IProps) {

    const user = React.useContext(UserContext);

    
    return (
        <Segment style={{ margin: "0px",padding: "5px", position: "sticky", borderRadius: "0%", zIndex: '400', height: "8%" }} className="topSegment">
            <Menu stackable secondary className='navbarMenu' defaultActiveIndex="3" fluid>  
                <Menu.Item fitted='vertically' style={{ borderRight: "1px solid teal", borderRadius: "0px" }} className="navbarItem ">
                    <h2 className='textNavbar'>Planner</h2>
                </Menu.Item>
                <Menu.Menu position='right' fitted='vertically' style={{ borderRight: "1px solid teal", borderRadius: "0px" }} className="navbarItem ">
                    <Menu.Item fitted='vertically' style={{ borderRight: "1px solid teal", borderRadius: "0px" }}>
                        <Header as='h2'>
                            <Icon name='user circle' />
                            <Header.Content style={{textAlign: "left"}}>
                            {`${user.firstName} ${user.lastName}`}
                            <Header.Subheader>{user.email}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                    <Menu.Item fitted='vertically' style={{ borderRadius: "0px" }}>
                        <Button content="Logout" primary onClick={() => props.logout()}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Segment>
    )

}