import React, { Component } from 'react';
import './Admin.css';
import { render } from 'react-dom';
import ServerInfo from './../ServerInfo';
import Home from './../Home';
import { scaleRotate as Menu } from 'react-burger-menu'




export default class Admin extends Component {
  render() {
    return (
      <div>
          <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
            <a id="home" className="menu-item" >Accueil</a>
            <a id="about" className="menu-item">Server 1</a>
            <a id="contact" className="menu-item">Server 2</a>
            <a id="contact" className="menu-item">Server 3</a>
            <a id="contact" className="menu-item">Server 4</a>
            <a id="contact" className="menu-item">Server 5</a>
          </Menu>
          <div id="outer-container">

            <main className="page-wrap" id="page-wrap">
            <Home />
            </main>
          </div>
      </div>
    );
  }
}
