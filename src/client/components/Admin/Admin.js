import React, { Component } from 'react';
import './Admin.css';
import { render } from 'react-dom';
import ServerInfo from './../ServerInfo';
import Home from './../MainPage/Home';
import Cisco from './../MainPage/Cisco';
import Vmware from './../MainPage/Vmware';
import Dhcp from './../MainPage/Dhcp';
import Dns from './../MainPage/Dns';
import Web from './../MainPage/Web';
import Asterisk from './../MainPage/Asterisk';
import Ldap from './../MainPage/Ldap';
import File from './../MainPage/File';
import Fortigate from './../MainPage/Fortigate';
import { scaleRotate as Menu } from 'react-burger-menu'

export default class Admin extends Component {
  constructor(props) {
        super(props);
        this.state = {
            selected: 'home',
            OpenMenu: false
        };
    }

onSelection(event) {
  console.log(event);
  this.setState({ selected: event });
  this.setState({ OpenMenu: false });
}

  render() {
    let MainPage;
    if (this.state.selected == "home") {
      MainPage = <Home />;
    } else if (this.state.selected == "cisco") {
      MainPage = <Cisco />;
    }else if (this.state.selected == "vmware") {
      MainPage = <Vmware />;
    }else if (this.state.selected == "dhcp") {
      MainPage = <Dhcp />;
    }else if (this.state.selected == "dns") {
      MainPage = <Dns />;
    }else if (this.state.selected == "web") {
      MainPage = <Web />;
    }else if (this.state.selected == "asterisk") {
      MainPage = <Asterisk />;
    }else if (this.state.selected == "ldap") {
      MainPage = <Ldap />;
    } else if (this.state.selected == "file") {
      MainPage = <File />;
    } else if (this.state.selected == "fortigate") {
      MainPage = <Fortigate />;
    } else {
      MainPage = <Home />;
    }

    return (
      <div>
          <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} isOpen={this.state.OpenMenu}>
            <p className="menu-title">WebSolea</p>
            <a onClick={() => this.onSelection("home")} className="menu-item">Accueil</a>
            <h2 className="menu-small-title">Aix-Les-Bains</h2>
            <a onClick={() => this.onSelection("cisco")} className="menu-item">Routeur/Switch Cisco</a>
            <a onClick={() => this.onSelection("vmware")} className="menu-item">Serveur HP VMware</a>
            <a onClick={() => this.onSelection("dhcp")} className="menu-item">Serveur DHCP</a>
            <a onClick={() => this.onSelection("dns")} className="menu-item">Serveur DNS</a>
            <a onClick={() => this.onSelection("web")} className="menu-item">Serveur WEB</a>
            <a onClick={() => this.onSelection("asterisk")} className="menu-item">Serveur Asterisk</a>
            <a onClick={() => this.onSelection("ldap")} className="menu-item">Serveur LDAP</a>
            <a onClick={() => this.onSelection("file")} className="menu-item">Serveur de fichier</a>
            <h2 className="menu-small-title">Valence</h2>
            <a onClick={() => this.onSelection("fortigate")} className="menu-item">Routeur Fortigate</a>
          </Menu>
          <div id="outer-container">
            <main className="page-wrap" id="page-wrap">
              {MainPage}
            </main>
          </div>
      </div>
    );
  }
}
