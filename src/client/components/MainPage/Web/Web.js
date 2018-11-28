import React, { Component } from 'react';
import './Web.css';
import { render } from 'react-dom';

export default class Web extends Component {
  render() {
    return (
      <div>
        <h1 className="MainPageTitle">Serveur Web</h1>
        <a href="https://192.168.141.3/ui/#/console/6" target="_blank" onclick="window.open(this.href,_blank','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600px,height=600px');return false;">Popup link</a>
      </div>
    );
  }
}
