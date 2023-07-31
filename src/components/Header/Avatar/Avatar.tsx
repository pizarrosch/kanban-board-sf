import React, {useState} from "react";
import avatar from '../../../assets/user-avatar.png';
import arrowDown from '../../../assets/arrow-down.svg';
import s from './Avatar.module.scss';
import {TShowMenu} from "../../../types";

function Avatar({showMenu, onClick}: TShowMenu) {

    return (
        <div className={s.root}>
            <img src={avatar} alt='avatar' className={s.avatar} />
            <img src={arrowDown} alt='show-hide-menu' onClick={onClick} className={showMenu ? s.arrowUp : s.arrowDown}/>
        </div>
    )
}

export default Avatar;