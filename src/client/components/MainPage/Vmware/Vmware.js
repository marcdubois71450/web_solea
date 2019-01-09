import React, { Component } from 'react';
import './Vmware.css';
import { render } from 'react-dom';



export default class Vmware extends Component {

  state = { ping: false };

   componentDidMount() {
     fetch('/api/ping/vmware')
       .then(res => res.json())
       .then(ping => this.setState({ ping: ping }));
   }

render() {
  const { ping } = this.state;

    return (
      <div>
        <h1 className="MainPageTitle">Serveur HP VMware</h1>
        {ping ?
          <div className="ip">IP : 192.168.141.3 UP</div>

          :
          <div className="ip">IP : 192.168.141.3 DOWN</div>

        }
        <div className="ip">  192.168.141.3</div>
      </div>
    );
  }
}
