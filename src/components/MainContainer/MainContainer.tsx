import React, {Dispatch, SetStateAction} from 'react';
import s from './MainContainer.module.scss';
import Column from "../Column/Column";
import {Columns} from "../../types";
import {Route, Routes} from "react-router";
import {Link} from "react-router-dom";

type Props = {
  setBacklogTaskNumber: Dispatch<SetStateAction<number>>,
  setFinishedTaskNumber: Dispatch<SetStateAction<number>>
}

function MainContainer({setBacklogTaskNumber, setFinishedTaskNumber}: Props) {
  return (
    <div className={s.root}>
      {Columns.map(type => (
        <Column type={type} setBacklogTaskNumber={setBacklogTaskNumber} setFinishedTaskNumber={setFinishedTaskNumber}/>
      ))}
    </div>
  )
}

export default MainContainer;