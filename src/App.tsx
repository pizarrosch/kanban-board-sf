import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer/MainContainer";
import Footer from "./components/Footer/Footer";
import {Columns, TicketType} from "./types";

type ContextType = {
  tickets: Array<TicketType>,
  setTickets: Dispatch<SetStateAction<Array<TicketType>>>;
}

export const StoreContext = createContext<ContextType>({
  tickets: [],
  setTickets: () => undefined
});

function App() {
    const [tickets, setTickets] = useState<Array<TicketType>>([]);

    return (
        <div>
            <Header/>
            <StoreContext.Provider value={{tickets, setTickets}}>
              <MainContainer/>
              {Columns.map(type => <Footer type={type} tickets={tickets}/>)}
            </StoreContext.Provider>
        </div>
    );
}

export default App;
