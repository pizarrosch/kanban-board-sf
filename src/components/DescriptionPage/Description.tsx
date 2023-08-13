import React, {useContext, useEffect, useRef, useState} from 'react';
import {TicketType} from "../../types";
import s from './Description.module.scss';
import {Link, useParams} from "react-router-dom";
import {StoreContext} from "../../App";

function Description({description}: TicketType) {

  const [isInputActive, setIsInputActive] = useState(false);
  const [savedText, setSavedText] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const {tickets} = useContext(StoreContext);
  const {ticketId} = useParams();

  function handleIsInputActive() {
    setIsInputActive(true);
  }

  useEffect(() => {
    if (isInputActive) {
      inputRef.current && inputRef.current.focus();
    }
  }, [isInputActive]);

  function saveNewText() {
    if (inputRef.current!.value !== '') {
      setIsInputActive(false);
      const savedDescription = tickets.map(ticket => {
        if (ticket.id === Number(ticketId)) {
          ticket.description = inputRef.current!.value;
          setSavedText(ticket.description)
        }
        return ticket;
      })
      localStorage.setItem('tickets', JSON.stringify(savedDescription))
    }
  }

  useEffect(() => {
    const savedTitle = localStorage.getItem('descriptionTitle');
    const savedDesc = localStorage.getItem('tickets');

    if (savedTitle) {
      setNewTitle(savedTitle)
    } else {
      tickets.map(ticket => {
        if (ticket.id === Number(ticketId)) {
          setNewTitle(ticket.title);
        }
        return ticket;
      })
    }

    if (savedDesc) {
      const parsedDesc: Array<TicketType> = JSON.parse(savedDesc);
      console.log(parsedDesc)
      parsedDesc.map(ticket => {
        if (ticket.id === Number(ticketId)) {
          setSavedText(ticket.description);
        }
        return ticket;
      });
    }
  }, []);

  return (
    <div className={s.root}>
      <div className={s.descriptionContainer}>
        <h1 style={{margin: 0}} className={s.descriptionTitle}>{newTitle}</h1>
        {isInputActive ?
          <div className={s.textAreaContainer}>
            <textarea ref={inputRef} className={s.input}/>
            <button className={s.confirmButton} onClick={saveNewText}>Confirm</button>
          </div>
          :
          <p className={s.descriptionParagraph} onClick={handleIsInputActive}>{savedText || description}</p>
        }
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