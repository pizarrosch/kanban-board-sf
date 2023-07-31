import React, {FormEvent, useRef, useState} from "react";
import s from './TaskCard.module.scss';
import TaskList from "../TaskList/TaskList";

function TaskCard({cardName}: { cardName: string }) {

    const [active, setActive] = useState(false);
    const [tasks, setTasks] = useState<Array<string>>([]);
    const ref = useRef<HTMLInputElement|null>(null);

    function clickButton() {
        // setActive((prev) => !prev);
        if (!active) {
            setActive(true);
        } else {
            setTasks((prev) => [...prev, ref.current!.value]);
            setActive(false);
        }
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setTasks((prev) => [...prev, ref.current!.value]);
        setActive(false);
    }

    return (
        <div className={s.cardContainer}>
            <div className={s.root}>
                <span>{cardName}</span>
                {tasks && tasks.map((task) => <TaskList value={task} tasksCounter={tasks.length}/>)}
                {active &&
                  <form onSubmit={handleSubmit}>
                    <input type='text' className={s.input} ref={ref} />
                  </form>
                }
                <span className={s.addCard} onClick={clickButton}>{active ? 'Submit' : '+Add card'}</span>
            </div>
        </div>
    )
}

export default TaskCard;