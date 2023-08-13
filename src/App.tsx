import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer/MainContainer";
import Footer from "./components/Footer/Footer";
import {ColumnType, TicketType} from "./types";
import {Route, Routes} from "react-router";
import Description from "./components/DescriptionPage/Description";

type ContextType = {
  tickets: Array<TicketType>,
  setTickets: Dispatch<SetStateAction<Array<TicketType>>>;
}

export const StoreContext = createContext<ContextType>({
  tickets: [],
  setTickets: () => undefined
});

type Props = {
  type: ColumnType;
}

function App({type}: Props) {
  const [tickets, setTickets] = useState<Array<TicketType>>([]);
  const [backlogTaskNumber, setBacklogTaskNumber] = useState<number>(0);
  const [finishedTaskNumber, setFinishedTaskNumber] = useState<number>(0);
  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem('userName'));

  useEffect(() => {
    if (!userName) {
      const namePrompt = prompt('Please type your name');
      setUserName(namePrompt);
      localStorage.setItem('userName', namePrompt!);
    }

    const savedItems = localStorage.getItem('tickets');
    const backlogCounter = localStorage.getItem('ticketsCounter') as string;
    const finishedCounter = localStorage.getItem('finishedCounter') as string;

    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setTickets(parsedItems)
    }

    if (backlogCounter) {
      const parsedBacklogCounter = JSON.parse(backlogCounter);
      setBacklogTaskNumber(parsedBacklogCounter);
    }

    if (finishedCounter) {
      const parsedFinishedCounter = JSON.parse(finishedCounter);
      setFinishedTaskNumber(parsedFinishedCounter);
    }
  }, [])

  return (
    <div>
      <Header userName={userName}/>
      <StoreContext.Provider value={{tickets, setTickets}}>
        <Routes>
          <Route
            path='dashboard'
            element={
              <MainContainer
                setBacklogTaskNumber={setBacklogTaskNumber} setFinishedTaskNumber={setFinishedTaskNumber}/>
            }/>
          {tickets.map(ticket => (
            <Route
              path="/ticket/:ticketId"
              element={
                <Description
                  title={ticket.title}
                  description={ticket.description}
                  type={ticket.type}
                  id={ticket.id}
                />}
            />
          ))}
        </Routes>
        <Footer
          type={type}
          backlogTaskNumber={backlogTaskNumber}
          finishedTaskNumber={finishedTaskNumber}
          userName={userName}
        />
      </StoreContext.Provider>
    </div>
  );
}

export default App;
