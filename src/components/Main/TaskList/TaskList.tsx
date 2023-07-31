import React, {useState} from 'react';
import s from './TaskList.module.scss';

function TaskList({value, tasksCounter}: {value: string, tasksCounter: number}) {

    const [activeTasksCounter, setActiveTasksCounter] = useState(0);

    return (
        <div className={s.root}>{value}</div>
    )
}

export default TaskList;