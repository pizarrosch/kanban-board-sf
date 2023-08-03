import React, {useState} from 'react';
import s from './TaskList.module.scss';

function TaskList({value}: {value: string}) {

    return (
        <div className={s.root}>{value}</div>
    )
}

export default TaskList;