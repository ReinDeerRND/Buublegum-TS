import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it("render App", ()=>{
    const app = document.createElement("div");
    ReactDOM.render(<App />, app);
    ReactDOM.unmountComponentAtNode(app);
})