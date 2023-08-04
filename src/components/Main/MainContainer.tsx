import React from 'react';
import s from './MainContainer.module.scss';
import Column from "../Column/Column";
import {ColumnType} from "../../types";

function MainContainer() {
  return (
    <div className={s.container}>
      {Object.keys(ColumnType).map(key => <Column type={ColumnType[key]} />)}
    </div>
  )
}

export default MainContainer;