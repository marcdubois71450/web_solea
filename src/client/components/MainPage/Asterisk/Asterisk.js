import React, { Component } from 'react';
import './Asterisk.css';
import { render } from 'react-dom';
import openSocket from 'socket.io-client';
import { database } from '../firebase';
import dateFromNum from 'date-from-num';

const socket = openSocket('http://'+window.location.hostname+':8080');

var myDevice = "asterisk";



export default class Asterisk extends Component {

  constructor() {
    super();
    this.state = {
        messages: [],
        chargementSauv: false,
        isAlive: false,
        IP: "",
        MAC: "",
        domaineName: ""
    };
}





// ------------------------------------------------------------------------------
// ---------------------------------React Function-------------------------------
// ------------------------------------------------------------------------------

componentDidMount() {
    fetch('/api/ping')
        .then(res => res.json())
        .then(obj => this.setStateApi(obj));
};

componentWillMount() {
    const messagesRef = database.ref(myDevice)
        .orderByKey()
        .limitToLast(100);
    messagesRef.on('child_added', snapshot => {
        const message = {
            id: snapshot.key,
            date: this.formatDate(dateFromNum(snapshot.key)),
            heure: this.formatHeure(dateFromNum(snapshot.key))
        };
        this.setState({
            chargementSauv: false
        });
        this.setState(prevState => ({
            messages: [message, ...prevState.messages],
        }));
    });
}










// ------------------------------------------------------------------------------
// ---------------------------------Service--------------------------------------
// ------------------------------------------------------------------------------

setStateApi(obj) {
    this.setState({
        isAlive: obj.asterisk
    });
    this.setState({
        domaineName: obj.domaineAsterisk
    });
    this.setState({
        MAC: obj.asteriskMac
    });
    this.setState({
        IP: obj.asteriskIP
    });
}

formatDate(date) {
    var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
formatHeure(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
        var minutes = '0' + minutes;
    }
    return hours + 'h' + minutes;
}












// ------------------------------------------------------------------------------
// ---------------------------------Client Socket IO----------------------------
// ------------------------------------------------------------------------------

restaurer = (date) => {
  var restoration = {
      device: myDevice,
      date: date
  };
    this.setState({
        chargementSauv: true
    });

    console.log("Je demande la restauration de : " + date);
    socket.emit('restaurer', restoration);
};

sauvegarder = () => {
    this.setState({
        chargementSauv: true
    });
    console.log("Je demande la sauvegarde via socket io");
    socket.emit('sauvegarder', myDevice);
};

suppr = (date) => {
  var suppression = {
      device: myDevice,
      date: date
  };
    var msg2 = this.state.messages
    for (var i = 0; i < msg2.length; i++) {
        var obj = msg2[i];
        if (obj.id == date) {
            msg2.splice(i, 1);
        }
    }
    this.setState(prevState => ({
        messages: msg2,
    }));
    console.log("Je demande la suppression de : " + date);
    socket.emit('suppr', suppression);
};








// ------------------------------------------------------------------------------
// ---------------------------------Rendu JSX------------------------------------
// ------------------------------------------------------------------------------

render() {
    return (
      <div>
        <div>
          <h1 className="MainPageTitle">Serveur Asterisk</h1>
        </div>
        <div className="device">
        {this.state.isAlive ?
          <div className="more">
            <a href="https://vwmare.solea.fr/ui/#/console/4" className="bouton">Controler le serveur</a>
            <a href="http://asterisk.solea.fr:8080" className="bouton">Configurer le serveur</a>
            <p className="ip">Adresse IP : {this.state.IP}</p>
            <p className="domaine">Nom de domaine : {this.state.domaineName}</p>
            <p className="mac">Adresse MAC : {this.state.MAC}</p>
          </div>
          :
          <div className="more">
            <p className="ip">La machine est actuellement hors ligne.</p>
            <p className="mac">Nom de domaine : asterisk.solea.fr</p>
          </div>
        }

          <div className="save">
            {this.state.isAlive && <a className="bouton" onClick={() => this.sauvegarder()}>Effectuer une sauvegarde</a>}
        <table className="save-table">
             <thead>
               <tr>
                 <th>Dates</th>
                 <th>Heures</th>
               </tr>
             </thead>
             <tbody>
             {this.state.chargementSauv &&
               <tr>
                 <td data-column="Date">Sauvegarde en cours...</td>
                 <td data-column="Heure">Sauvegarde en cours...</td>
               </tr>
             }
             <tr className="hide"></tr>
             {this.state.messages.map(message =>
               <tr>
                 <td data-column="Date">{message.date}</td>
                 <td data-column="Heure">{message.heure}</td>
                  {this.state.isAlive && <td className="restaurer" onClick={() => this.restaurer(message.id)} data-column="Restaurer la sauvegarde">Restaurer</td>}
                  <td className="hide"></td>
                  {this.state.isAlive && <td className="restaurer" onClick={() => this.suppr(message.id)} data-column="Supprimer la sauvegarde">Supprimer</td>}
               </tr>
             )}
             </tbody>
           </table>
          </div>
        </div>
      </div>
    );
  }
}
