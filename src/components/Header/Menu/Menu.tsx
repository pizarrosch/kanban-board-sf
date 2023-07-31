import React from "react";
import s from './Menu.module.scss';

function Menu() {
    return (
        <div className={s.root}>
            <span>Profile</span>
            <span>Log Out</span>
            <div className={s.avatarPointer}></div>
        </div>
    )
}

export default Menu;