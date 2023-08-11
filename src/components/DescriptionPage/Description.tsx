import React from 'react';
import {TicketType} from "../../types";
import s from './Description.module.scss';
import {Link} from "react-router-dom";

function Description({title, description}: TicketType) {
  return (
      <div className={s.root}>
        <div className={s.descriptionContainer}>
          <h1 style={{margin: 0}} className={s.descriptionTitle}>{title}</h1>
          <p className={s.descriptionParagraph}>{description}</p>
          <Link to={'/dashboard'}>
            <div className={s.closeButton}>
              <div className={s.lineOne}></div>
              <div className={s.lineTwo}></div>
            </div>
          </Link>
        </div>
      </div>
  )
}

export default Description;