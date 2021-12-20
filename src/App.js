import './styles/App.css';
import World from './World.js';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,

} from "react-router-dom";

const { useState, useEffect } = React;

function App() {
 // const [ seed , setSeed ] = useState(null);
   // setSeed("Mother")
    const seed = "Mother";

    const  initView =
          (<div>
               <p>B a b e l</p>
               <Link to={`/${seed}`}>New World</Link>
           </div>)


    return (
        <header className="App-header">
            <div className="App">
                <Router >
                    <Routes>
                        <Route path="/"
                               element ={initView}>
                        </Route>
                        <Route path="/:name"
                               element ={<World />}>
                        </Route>
                    </Routes>

                </Router>
            </div>
        </header>
    );
}

export default App;
