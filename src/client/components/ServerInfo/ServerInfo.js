import React, { Component } from 'react';
import './ServerInfo.css';

export default class ServerInfo extends Component {


    state = { OsType: null,port: null};

     componentDidMount() {
       fetch('/api/serverinfo')
         .then(res => res.json())
         .then(os => this.setState({ OsType: os.OsType }));
       fetch('/api/serverport')
           .then(res => res.json())
           .then(port => this.setState({ Port: port.Port }));
     }

  render() {
    const { OsType } = this.state;
    const { Port } = this.state;

    return (
      <div className="serverinfo">
      {OsType ? <p>{`OS Serveur : ${OsType}`}</p> : <p>Chargement en cours...</p>}
      {Port ? <p>{`Serveur Port Production : ${Port}`}</p> : <p>Chargement en cours...</p>}

      </div>
    );
  }
}
