import React, { Component } from 'react';
import './Asterisk.css';
import { render } from 'react-dom';


export default class Asterisk extends Component {

  constructor(props, context) {
          super(props, context);
      }


  render() {
    return (
      <div>

        <div>
          <h1 className="MainPageTitle">Serveur Asterisk</h1>
        </div>
        <div className="device">
          <div className="more">
          <a href="https://vwmare.solea.fr/ui/#/console/4" className="bouton">Controler le serveur</a>
          <a href="http://asterisk.solea.fr:8080" className="bouton">Configurer le serveur</a>
            <p className="ip">Adresse IP : XXX.XXX.XXX.XXX</p>
            <p className="domaine">Nom de domaine : asterisk.solea.fr</p>
            <p className="mac">Adresse MAC : xx:xx:xx:xx:xx:xx:xx</p>
          </div>
          <div className="save">
            <a className="bouton">Effectuer une sauvegarde</a>
            <table>
              <thead>
                <tr>
                  <th>Dates</th>
                  <th>Heures</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-column="Date">29 Janvier 2019</td>
                  <td data-column="Heure">17h34</td>
                  <td className="restaurer" data-column="Restaurer la sauvegarde">Restaurer</td>
                </tr>
                <tr>
                <td data-column="Date">27 Janvier 2019</td>
                  <td data-column="Heure">14h43</td>
                  <td className="restaurer" data-column="Restaurer la sauvegarde">Restaurer</td>
                </tr>
                <tr>
                <td data-column="Date">13 Janvier 2019</td>
                  <td data-column="Heure">12h21</td>
                  <td className="restaurer" data-column="Restaurer la sauvegarde">Restaurer</td>
                </tr>
                <tr>
                <td data-column="Date">14 Decembre 2019</td>
                  <td data-column="Heure">11h14</td>
                  <td className="restaurer" data-column="Restaurer la sauvegarde">Restaurer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
