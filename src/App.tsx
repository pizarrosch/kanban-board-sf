import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import s from './App.scss';
import MainContainer from "./components/Main/MainContainer";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className={s.root}>
            <Header/>
            <MainContainer/>
            <Footer />
        </div>
    );
}

export default App;
