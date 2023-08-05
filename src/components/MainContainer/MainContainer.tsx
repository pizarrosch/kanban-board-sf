import React from 'react';
import s from './MainContainer.module.scss';
import Column from "../Column/Column";
import {Columns} from "../../types";

function MainContainer() {
  return (
    <div className={s.root}>
      {Columns.map(type => <Column type={type} />)}
    </div>
  )
}

export default MainContainer;