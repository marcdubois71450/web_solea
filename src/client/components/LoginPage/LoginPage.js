import React, { Component } from 'react';
import './LoginPage.css';
import { render } from 'react-dom';
import Admin from './../Admin';
import md5 from 'md5';



export default class LoginPage extends Component {
  constructor(props) {
        super(props);
        this.state = {
            Password:""
        };
        this.onChangePassword = this.onChangePassword.bind(this);
    }

onChangePassword (event) {
  fetch('/api/' + md5(event.target.value))
    .then(res => res.json())
    .then(pass => this.setState({ Password: pass.password }));
   ;
 }


 render() {
   const { Password } = this.state;

    return (
      <div>
      {Password ?
      <div>
        <Admin />
      </div>
      :
      <div className="LoginPage">
        <div className="Formulaire">
            <p className="TitleLogin">WebSoléa</p>
            <input onChange={this.onChangePassword} className="Form" placeholder="Mot de passe" type="password" name="password" />
        </div>
      </div>
      }
      </div>
    );
  }
}
