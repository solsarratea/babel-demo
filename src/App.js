import './App.css';
import World from './World.js';
import React from 'react';

const { useState, useEffect } = React;

function App() {


    return (
        <header className="App-header">
            <div className="App">
                <World name="Mother"/>
            </div>
        </header>
    );
}

export default App;
