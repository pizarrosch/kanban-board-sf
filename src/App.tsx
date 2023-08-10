import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer/MainContainer";
import Footer from "./components/Footer/Footer";
import {Columns, ColumnType, TicketType} from "./types";

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
    const [backlogTaskNumber, setBacklogTaskNumber] = useState(0);
    const [finishedTaskNumber, setFinishedTaskNumber] = useState(0);

  useEffect(() => {
    const savedItems = localStorage.getItem('tickets');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setTickets(parsedItems)
    }
  }, [])

    if (type === 'backlog' || type === 'finished') {
      switch (type) {
        case "backlog":
          const backlogTickets = tickets.map(ticket => ticket.title);
          return setBacklogTaskNumber(backlogTickets.length);

        case "finished":
          const finishedTickets = tickets.map(ticket => ticket.title);
          return setFinishedTaskNumber(finishedTickets.length);
      }
    }

    return (
        <div>
            <Header/>
            <StoreContext.Provider value={{tickets, setTickets}}>
              <MainContainer/>
              <Footer backlogTaskNumber={backlogTaskNumber} finishedTaskNumber={finishedTaskNumber} type={type}/>
            </StoreContext.Provider>
        </div>
    );
}

export default App;
