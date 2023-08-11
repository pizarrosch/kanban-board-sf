import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer/MainContainer";
import Footer from "./components/Footer/Footer";
import {Columns, ColumnType, TicketType} from "./types";
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
    const [backlogTaskNumber, setBacklogTaskNumber] = useState(0);
    const [finishedTaskNumber, setFinishedTaskNumber] = useState(0);

  useEffect(() => {
    const savedItems = localStorage.getItem('tickets');

    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setTickets(parsedItems)
    }
  }, [])

    return (
        <div>
          <Header/>
          <StoreContext.Provider value={{tickets, setTickets}}>
            <Routes>
              <Route path='dashboard' element={<MainContainer />}/>
              {tickets.map(ticket => (
                <Route
                  path={`ticket/${ticket.id}`}
                  element={<Description title={ticket.title} description={ticket.description} type={ticket.type} id={ticket.id}/>}
                />
              ))}
            </Routes>
            <Footer type={type} backlogTaskNumber={backlogTaskNumber} finishedTaskNumber={finishedTaskNumber}/>
          </StoreContext.Provider>
        </div>
    );
}

export default App;
