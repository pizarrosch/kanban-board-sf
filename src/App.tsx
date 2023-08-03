import React, {useState} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import s from './App.scss';
import MainContainer from "./components/Main/MainContainer";
import Footer from "./components/Footer/Footer";

function App() {

    const [backlogTasksCounter, setBacklogTasksCounter] = useState(0);

    return (
        <div className={s.root}>
            <Header/>
            <MainContainer/>
            <Footer backlogTasksCounter={backlogTasksCounter}/>
        </div>
    );
}

export default App;
