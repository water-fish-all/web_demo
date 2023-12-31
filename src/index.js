import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Example1 from "./E1";
import Example2 from "./E2"
import Example3 from "./E3"
import Test1 from "./test"
import Searcher from "./Searcher"
import SearchApp from "./SearchApp";
import reportWebVitals from './reportWebVitals';
import BarChartExample from "./BarChartExample";



ReactDOM.render(
  <React.StrictMode>
    <Test1 />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
