import React, { Component } from 'react';
import './Dns.css';
import { render } from 'react-dom';
import openSocket from 'socket.io-client';

const socket = openSocket('http://'+window.location.hostname+':8080');

export default class Dns extends Component {

  constructor(props) {
        super(props);
        this.state = {
            domaineValue: "undefined",
            reponse: "",
            firstDNS: true
        };
        this.onChangeDNS = this.onChangeDNS.bind(this);
        this.onClickDNS = this.onClickDNS.bind(this);

    }
    componentDidMount() {
        socket.on("dnsReponse", data => this.setState({ reponse: data }));
      }

  onClickDNS () {
    this.setState({ reponse: "" });
    this.setState({ firstDNS: false });
    socket.emit('dns', this.state.domaineValue);
   }

   onChangeDNS (event) {
     this.setState({ domaineValue: event.target.value });
    }





  render() {
    return (
      <div>
        <h1 className="MainPageTitle">Serveur DNS</h1>
        <input onChange={this.onChangeDNS} placeholder="www.example.com" type="text" />
        <input onClick={this.onClickDNS} value="Tester" type="submit" />
        <div>
          <div>
            {this.state.firstDNS !== true && this.state.reponse !== ""  && this.state.reponse !== "error" && <div>Reponse : {this.state.reponse}</div>}
          </div>
          <div>
            {this.state.reponse == "error" && <div>Erreur adresse introuvable.</div>}
          </div>
        </div>
      </div>
    );
  }
}
