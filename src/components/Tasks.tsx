import axios from 'axios';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { Table } from 'semantic-ui-react';
import { css } from "@emotion/core";
import Task from './Task';

export interface ITask{
    description:string,
    status: string
    name: string
}

interface IState {
    loaded: boolean,
    tasks: Array<ITask>
}
export default function Tasks() {

    const [state,setState] = React.useState<IState>({
        loaded: false,
        tasks: []
    })

    React.useEffect(() => {
        try {
            axios.get('http://localhost:3000/tasks').then((res) => {
                // imitacija dugog povratnog puta zahteva pri losoj konekciji
                setTimeout(() => {
                    console.log(res.data);
                    setState({tasks: res.data, loaded: true});
                },2000);
                
            }).catch((err) => {
                console.log("error occured during fetching");
            })
        } catch(err) {
            console.log("error occured during fetching")
        }

        return () => {
            // cleanup
        }
    },[]);

    const override = css`
    display: block;
    margin: auto;
    border-color: teal;
    `;

    return (
        <>
            {state.loaded === false ? <>
                Loading tasks...
                <ClipLoader loading={true} css={override} size={100}>Loading...</ClipLoader>
            </> :
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Task</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {state.tasks.map((task,index) => {
                            return <Task key={index} index={index} description={task.description} name={task.name} status={task.status}/>
                        })}
                    </Table.Body>
                </Table>
            }
        </>
    )

}