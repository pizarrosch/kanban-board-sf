import React from 'react';
import s from './MainContainer.module.scss';
import Column from "../Column/Column";
import {Columns} from "../../types";
import {Route, Routes} from "react-router";
import {Link} from "react-router-dom";

function MainContainer() {
  return (
      <div className={s.root}>
        {Columns.map(type => (
            <Column type={type} />
        ))}
      </div>
  )
}

export default MainContainer;