import React, { Component } from 'react';
var ReactDOM = require('react-dom');
import './Dns.css';
import { render } from 'react-dom';
import openSocket from 'socket.io-client';
import { database } from '../firebase';
import dateFromNum from 'date-from-num';
import Modal from 'react-responsive-modal';
import "xterm/dist/xterm.css"
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';

const socket = openSocket('http://'+window.location.hostname+':8081');

var myDevice = "dns";



export default class Dns extends Component {

  constructor() {
    super();
    this.state = {
        messages: [],
        chargementSauv: false,
        isAlive: true,
        IP: "",
        MAC: "",
        domaineName: "",
        domaineValue: "undefined",
        reponse: "",
        firstDNS: true,
        open: false,
        term: null
    };
    this.onChangeDNS = this.onChangeDNS.bind(this);
    this.onClickDNS = this.onClickDNS.bind(this);
}







// ------------------------------------------------------------------------------
// ---------------------------------React Function-------------------------------
// ------------------------------------------------------------------------------

componentDidMount() {
  socket.on("dnsReponse", data => this.setState({ reponse: data }));
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
//Fonction appeller pour traité les donnée de l'api
setStateApi(obj) {
    this.setState({
        isAlive: eval("obj."+myDevice)
    });
    this.setState({
        domaineName: eval("obj.domaine_"+myDevice)
    });
    this.setState({
        MAC: eval("obj."+myDevice+"Mac")
    });
    this.setState({
        IP: eval("obj."+myDevice+"IP")
    });
}

//Fonction pour formater la date
formatDate(date) {
    var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

//Fonction pour formater l'heure
formatHeure(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
        var minutes = '0' + minutes;
    }
    return hours + 'h' + minutes;
}

//Fonction appeller lorsque que l'on clique sur "Tester ce DNS"
onClickDNS () {
  this.setState({ reponse: "" });
  this.setState({ firstDNS: false });
  socket.emit('dns', this.state.domaineValue);
 }

 // Fonction appeller lorsque le modal text du input domaine Name Value change
 onChangeDNS (event) {
   this.setState({ domaineValue: event.target.value });
  }

  // Fonction activer lorsque le modal ClientSSH est ouvert
  onOpenModal() {
    this.setState({
        open: true
    });
    setTimeout(() => {
      Terminal.applyAddon(fit);
      this.term = new Terminal();
      this.term.open(ReactDOM.findDOMNode(this.refs.term));
      this.term.fit();
      this.createServer1();
    }, 50);
  };

  // Fonction activer lorsque le modal ClientSSH est fermer
  onCloseModal() {
    this.setState({ open: false });
    window.location.reload();

  };
  // Creation serveur ClientSSH
  createServer1() {
      const sshSrv = {msgId: 'term', ip: this.state.domaineName, username: "root", password: "root"};
      socket.emit("createNewServer", sshSrv);
      const myTerm = this.term;
      myTerm.on("data", function(data) {
          socket.emit('term', data);
      })
      socket.on("term", function (data) {
          console.log(data);
          myTerm.write(data);
      })
  };












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
    console.log("Je demande la restauration de : " + date + " " + myDevice);
    socket.emit('restaurer', restoration);
};

sauvegarder = () => {
    this.setState({
        chargementSauv: true
    });
    console.log("Je demande la sauvegarde via socket io de " + myDevice);
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
    console.log("Je demande la suppression de : " + date + " " +  myDevice );
    socket.emit('suppr', suppression);
};













// ------------------------------------------------------------------------------
// ---------------------------------Rendu JSX------------------------------------
// ------------------------------------------------------------------------------

render() {
  var confLink = "http://"+this.state.domaineName+":8080";
  var consoleLink = "https://vwmare.solea.fr/ui/#/console/4";
  const { open, modale} = this.state;

    return (
      <div>
      <Modal open={open}  onClose={() => this.onCloseModal()} blockScroll={!open} center>
      <div id="term" ref="term"></div>
      </Modal>
        <div>
          <h1 className="MainPageTitle">Serveur DNS</h1>
        </div>
        <div className="device">
        {this.state.isAlive ?
          <div className="more">
            <a onClick={() => this.onOpenModal()} target="_blank" className="bouton">Controler le serveur</a>            <a href={confLink} target="_blank" className="bouton">Configurer le serveur</a>
            <p className="ip">Adresse IP : {this.state.IP}</p>
            <p className="domaine">Nom de domaine : {this.state.domaineName}</p>
            <p className="domaine">Adresse MAC : {this.state.MAC}</p>
            <input className="dnsinput" onChange={this.onChangeDNS} placeholder="www.example.com" type="text" />
            <a className="bouton" onClick={this.onClickDNS}>Tester ce DNS</a>
            <div>
              <div>
                {this.state.firstDNS !== true && this.state.reponse !== ""  && this.state.reponse !== "error" && <div className="mac">Reponse : {this.state.reponse}</div>}
              </div>
              <div>
                {this.state.reponse == "error" && <div className="mac">Erreur adresse introuvable.</div>}
              </div>
            </div>
          </div>
          :
          <div className="more">
            <p className="ip">La machine est actuellement hors ligne.</p>
            <p className="mac">Nom de domaine : {this.state.domaineName}</p>
          </div>
        }

          <div className="save">
            {this.state.isAlive ?
               <a className="bouton" onClick={() => this.sauvegarder()}>Effectuer une sauvegarde</a>
               :
                <div className="list-save"><div className="list-save2">Liste des sauvegardes :</div></div>
             }

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
                  {this.state.isAlive && <td className="supprimer" onClick={() => this.suppr(message.id)} data-column="Supprimer la sauvegarde">Supprimer</td>}
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
