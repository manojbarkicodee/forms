// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Form from "./components/Form"
import Tabular from './components/Tabular';
function App() {
 
  let [tabulardata,settabulardata]=useState([])
  return (
    <div className="App">
      <Form />
      <Tabular  className="table" tabulardata={tabulardata} settabulardata={settabulardata}/>
    </div>
  );
}

export default App;
