import React from 'react';
import { Segment, Table } from 'semantic-ui-react';
import { ITask } from './Tasks';

interface IProps extends ITask {
    index: number
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(props: IProps) {
    
    return (
        <Table.Row key={props.index}>
            <Table.Cell>{props.name}</Table.Cell>
            <Table.Cell>{props.status}</Table.Cell>
            <Table.Cell>
                {props.description}
            </Table.Cell>
        </Table.Row>
    )

}