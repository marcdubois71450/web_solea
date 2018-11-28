import React, { Component } from 'react';
import './Home.css';
import { render } from 'react-dom';
import ServerInfo from './../../ServerInfo';



export default class Home extends Component {
  render() {
    return (
      <div>
      <h1 className="MainPageTitle">Accueil</h1>
      <ServerInfo />
      </div>
    );
  }
}
