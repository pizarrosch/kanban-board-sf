import React, {useState} from "react";
import s from './TaskCard.module.scss';

function TaskCard({cardName}: { cardName: string }) {

    const [active, setActive] = useState(false);

    function clickButton() {
        setActive((prev) => !prev);
    }

    return (
        <div className={s.root}>
            <span>{cardName}</span>
            {active && <input type='text' className={s.input}/>}
            <span className={s.addCard} onClick={clickButton}>{active ? 'Submit' : '+Add card'}</span>
        </div>
    )
}

export default TaskCard;