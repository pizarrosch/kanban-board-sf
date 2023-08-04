import React, {FormEvent, useContext} from 'react';
import Ticket from "../Ticket/Ticket";
import {StoreContext} from "../../App";
import {ColumnType} from "../../types";
import s from "../Ticket/Ticket.module.scss";

type Props = {
  type: keyof typeof ColumnType;
}

function Column({type}: Props) {
  const {tickets, setTickets} = useContext(StoreContext);

  function clickButton() {
    if (isInputActive && !ref.current!.value) {
      setIsInputActive(false);
      return;
    }

    if (!isInputActive) {
      setIsInputActive(true);
    } else {
      setBacklogTasks((prev) => [...prev, ref.current!.value]);
      setIsInputActive(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ref.current!.value) {
      setIsInputActive(false);
      return;
    }

    setBacklogTasks((prev) => [...prev, ref.current!.value]);
    setIsInputActive(false);
    // const stringBacklogData = JSON.stringify(backlogTasks);
    // localStorage.setItem('backlogTasks', stringBacklogData);
  }

  function showSelect() {
    setIsSelectActive(active => !active)
  }

  function chooseTask(e: MouseEvent) {
    const target = e.target as HTMLOptionElement;
    cardName === 'Ready' && setReadyTasks((prev) => [...prev, target.value])
  }

  return (
      <div className={s.cardContainer}>
          <h4>{ColumnType[type]}</h4>
          <div>
              {tickets.map(ticket => (
                <Ticket title={ticket.title} description={ticket.description} type={type} />
              ))}
          </div>
      </div>
  )
}

export default Column;