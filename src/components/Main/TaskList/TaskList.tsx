import React, {useState} from 'react';

function TaskList({value}: {value: string}) {

    return (
        <span>{value}</span>
    )
}

export default TaskList;