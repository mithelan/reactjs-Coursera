import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from "./components/MainComponent";
import './App.css';
import {DISHES} from '../src/shared/dishes'
class App extends Component {

  render(){
  return (
    <div className="App">


    <Main/>

    </div>
  );
  }
}

export default App;
