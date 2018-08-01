import React, { Component } from 'react';
import ShowArticle from './components/ShowArticle'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="titre">Bienvenue</h1>
        <ShowArticle/>
      </div>
    );
  }
}

export default App;
