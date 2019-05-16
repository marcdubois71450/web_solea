import React, { Component } from 'react';
var ReactDOM = require('react-dom');
import './Vmware.css';
import { render } from 'react-dom';
import openSocket from 'socket.io-client';
import { database } from '../firebase';
import dateFromNum from 'date-from-num';
import Modal from 'react-responsive-modal';
import "xterm/dist/xterm.css"
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';

const socket = openSocket('https://'+window.location.hostname+':8081');

var myDevice = "vmware";



export default class Vmware extends Component {

  constructor() {
    super();
    this.state = {
        messages: [],
        chargementSauv: false,
        isAlive: true,
        IP: "",
        MAC: "",
        domaineName: "",
        open: false,
        term: null,
        firstterm: true,
        socketUse: false
    };

}





// ------------------------------------------------------------------------------
// ---------------------------------React Function-------------------------------
// ------------------------------------------------------------------------------

componentDidMount() {
  Terminal.applyAddon(fit);

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

onOpenModal() {
  this.setState({
      open: true
  });
this.term = new Terminal();
  setTimeout( () => {
    this.term.open(ReactDOM.findDOMNode(this.refs.term));
    this.term.fit();
    this.createServer1();
  }, 1000);



};

onCloseModal() {
  console.log("Closeee modal");
  this.setState({ open: false });
  window.location.reload();

};
createServer1 = () => {
    const sshSrv = {msgId: 'term', ip: this.state.domaineName, username: "root", password: "root"};
    socket.emit("createNewServer", sshSrv);
    this.term.on("data", function(data) {
        console.log("Emition : "+ data);
        socket.emit('term', data);
    })
    console.log(this.state.socketUse);
      console.log("Je me cree" + this.state.socketUse);
      socket.on("term", data => {
        this.setState({ socketUse: true });
        console.log("Reception : "+ data);
          this.term.write(data);
      })

    socket.on("end", function () {
        socket.disconnect();
        this.term.destroy();
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
  var confLink = "https://"+this.state.domaineName+"/";
  const { open, modale} = this.state;
    return (
      <div>
      <Modal open={open} onAfterOpen={this.afterOpenModal}  onClose={() => this.onCloseModal()} blockScroll={!open} center="true">
        <div id="term" ref="term"></div>
      </Modal>
        <div>
          <h1 className="MainPageTitle">Serveur HP Vmware</h1>
        </div>
        <div className="device">
        {this.state.isAlive ?
          <div className="more">
            <a href={confLink} target="_blank" className="bouton">Configurer le serveur</a>
            <p className="ip">Adresse IP : {this.state.IP}</p>
            <p className="domaine">Nom de domaine : {this.state.domaineName}</p>
            <p className="mac">Adresse MAC : {this.state.MAC}</p>
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
                  <td className="hide"></td>
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
