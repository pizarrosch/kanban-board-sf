import React, {FormEvent, useEffect, useRef, useState} from "react";
import s from './TaskCard.module.scss';
import TaskList from "../TaskList/TaskList";

function TaskCard({cardName}: { cardName: string }) {

    const [active, setActive] = useState(false);
    const [activeSelect, setActiveSelect] = useState(false);
    const [backlogTasks, setBacklogTasks] = useState<Array<string>>([]);
    const [readyTasks, setReadyTasks] = useState<Array<string>>([]);
    const [inProgressTasks, setInProgressTasks] = useState<Array<string>>([]);
    const [finishedTasks, setFinishedTasks] = useState<Array<string>>([]);
    const ref = useRef<HTMLInputElement|null>(null);

    function clickButton() {
        if (active && !ref.current!.value) {
            setActive(false);
            return;
        }

        if (!active) {
            setActive(true);
        } else {
            setBacklogTasks((prev) => [...prev, ref.current!.value]);
            setActive(false);
        }
    }

    useEffect(() => {
        const savedBacklogTasks = localStorage.getItem('backlogTasks');
        const parsedBacklogTasks = JSON.parse(savedBacklogTasks);
        parsedBacklogTasks && setBacklogTasks((prev) => [...prev, parsedBacklogTasks]);
    }, [])

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!ref.current!.value) {
            setActive(false);
            return;
        }

        setBacklogTasks((prev) => [...prev, ref.current!.value]);
        setActive(false);
        const stringBacklogData = JSON.stringify(backlogTasks);
        localStorage.setItem('backlogTasks', stringBacklogData);
    }

    function showSelect() {
        setActiveSelect(active => !active)
    }

    function chooseTask(e: MouseEvent) {
        const target = e.target as HTMLOptionElement;
       cardName === 'Ready' && setReadyTasks((prev) => [...prev, target.value])
    }

    return (
        <div className={s.cardContainer}>
            <div className={s.root}>
                <span>{cardName}</span>
                {backlogTasks && backlogTasks.map((task) => <TaskList value={task} />)}
                {active &&
                  <form onSubmit={handleSubmit}>
                    <input type='text' className={s.input} ref={ref} />
                  </form>
                }
                {cardName === 'Backlog' && <span className={s.addCard} onClick={clickButton}>{active ? 'Submit' : '+Add card'}</span>}
                {cardName === 'Ready' && (activeSelect ? <select onClick={(e) => chooseTask}>{backlogTasks && backlogTasks.map(backlogTask => {
                    console.log(backlogTask);
                   return <option>{backlogTask}</option>
                })}</select> : <span className={s.addCard} onClick={showSelect}>+Add card</span>)}
                {cardName === 'In Progress' && (activeSelect ? <select>{readyTasks && readyTasks.map(readyTask => <option>{readyTask}</option>)}</select> : <span className={s.addCard} onClick={showSelect}>+Add card</span>)}
                {cardName === 'Finished' && (activeSelect ? <select>{inProgressTasks && inProgressTasks.map(inProgressTask => <option>{inProgressTask}</option>)}</select> : <span className={s.addCard} onClick={showSelect}>+Add card</span>)}
            </div>
        </div>
    )
}

export default TaskCard;