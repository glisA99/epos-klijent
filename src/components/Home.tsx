import React from 'react';
import { Divider, Segment } from 'semantic-ui-react';
import TableStructured from './Table';
import Tasks from './Tasks';


// eslint-disable-next-line import/no-anonymous-default-export
export default function() {

    return (
        <div className="div_central">
            <Segment>
                <h1>Welcome!</h1>
                <Divider horizontal></Divider>
                <Tasks></Tasks>
                <br></br>
                <TableStructured />
            </Segment>
        </div>
    )

}