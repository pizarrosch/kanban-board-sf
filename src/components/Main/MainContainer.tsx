import React from 'react';
import s from './MainContainer.module.scss';
import TaskCard from "./TaskCard/TaskCard";

let cardNames: string[] = ['Backlog', 'Ready', 'In Progress', 'Finished'];
function MainContainer() {
    return (
        <div className={s.container}>
            {cardNames.map((cardName: string) => {
                return <TaskCard cardName={cardName}/>
            })
            }
        </div>
    )
}

export default MainContainer;