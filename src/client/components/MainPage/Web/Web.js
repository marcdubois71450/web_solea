import React, { Component } from 'react';
import './Web.css';
import { render } from 'react-dom';

export default class Web extends Component {

open_popup()
 {
  const  width = 800;
   const height = 620;
   if(window.innerWidth)
   {
     var left = (window.innerWidth-width)/2;
     var top = (window.innerHeight-height)/2;
   }
   else
   {
     var left = (document.body.clientWidth-width)/2;
     var top = (document.body.clientHeight-height)/2;
   }
   window.open('https://vwmare.solea.fr/ui/#/console/6','nom_de_ma_popup','menubar=no, scrollbars=no, top='+top+', left='+left+', width='+width+', height='+height+'');
 }

  render() {
    return (
      <div>
        <h1 className="MainPageTitle">Serveur Web</h1>
        <button onClick={this.open_popup} type="button">Remote Serveur</button>

  </div>
    );
  }
}
