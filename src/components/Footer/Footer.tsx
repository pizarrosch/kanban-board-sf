import React from 'react';
import s from './Footer.module.scss';

type Props = {
  backlogTasksCounter?: number
}

function Footer({backlogTasksCounter = 0}: Props) {
    return (
        <div className={s.root}>
            <div className={s.tasksCounter}>
                <span>Active tasks: {backlogTasksCounter}</span>
                <span>Finished tasks: 0</span>
            </div>
            <span className={s.accountHolder}>Kanban board by Name Surname</span>
        </div>
    )
}

export default Footer;