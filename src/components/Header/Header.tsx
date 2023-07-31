import React, {useState} from "react";
import Avatar from "./Avatar/Avatar";
import s from './Header.module.scss';
import Menu from "./Menu/Menu";

function Header() {

    const [showMenu, setShowMenu] = useState(false);

    function handleShowMenu() {
        !showMenu ? setShowMenu(true) : setShowMenu(false);
    }

    return (
        <div className={s.root}>
            <h1 className={s.headerTitle}>Awesome Kanban Board</h1>
            <Avatar showMenu={showMenu} onClick={handleShowMenu}/>
            {showMenu && <Menu/>}
        </div>
    )
}

export default Header;