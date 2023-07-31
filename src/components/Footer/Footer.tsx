import React from 'react';
import s from './Footer.module.scss';

function Footer() {
    return (
        <div className={s.root}>
            <div className={s.tasksCounter}>
                <span>Active tasks: 0</span>
                <span>Finished tasks: 0</span>
            </div>
            <span className={s.accountHolder}>Kanban board by Name Surname</span>
        </div>
    )
}

export default Footer;