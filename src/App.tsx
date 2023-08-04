import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import s from './App.scss';
import MainContainer from "./components/Main/MainContainer";
import Footer from "./components/Footer/Footer";
import {TicketType} from "./types";

type ContextType = {
  tickets: Array<TicketType>,
  setTickets: Dispatch<SetStateAction<Array<TicketType>>>;
}

export const StoreContext = createContext<ContextType>({
  tickets: [],
  setTickets: () => undefined
});

function App() {
    const [tickets, setTickets] = useState<Array<TicketType>>([
      {
        title: 'Milk',
        description: 'Buy some milk in the local store',
        status: 'ready'
      }
    ]);

    return (
        <div className={s.root}>
            <Header/>
            <StoreContext.Provider value={{tickets, setTickets}}>
              <MainContainer/>
              <Footer />
            </StoreContext.Provider>
        </div>
    );
}

export default App;
