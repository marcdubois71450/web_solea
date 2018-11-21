import React, { Component } from 'react';
import './Home.css';
import { render } from 'react-dom';
import ServerInfo from './../ServerInfo';



export default class Home extends Component {
  render() {
    return (
      <div>


      <div className="Home">
      <h1 className="WebsiteName">WebSoléa</h1>
      </div>

      <ServerInfo />

      </div>
    );
  }
}
