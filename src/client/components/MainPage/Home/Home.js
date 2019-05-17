import React, { Component } from 'react';
import './Home.css';
import { render } from 'react-dom';



export default class Home extends Component {
  render() {
    return (
      <div>
      <h1 className="MainPageTitle">Accueil</h1>
      <h1 className="welcome">
      	<span>B</span>
      	<span>o</span>
      	<span>n</span>
      	<span>j</span>
      	<span>o</span>
      	<span>u</span>
      	<span>r</span>
      </h1>
      <p className="text-home">Sélectionnez une machine dans le menu latéral gauche.</p>
      </div>
    );
  }
}
