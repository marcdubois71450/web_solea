import React, { Component } from 'react';
import './LoginPage.css';
import { render } from 'react-dom';
import Admin from './../Admin';
import md5 from 'md5';



export default class LoginPage extends Component {
  constructor(props) {
        super(props);
        this.state = {
            HashPassword: ""
        };
        this.onChangePassword = this.onChangePassword.bind(this);
    }

onChangePassword (event) {
   this.setState({ HashPassword: event.target.value });
 }


 render() {
    const HashPassword = this.state.HashPassword;

    return (
      <div>
      {HashPassword == "admin" ?
      <div>
        <Admin />
      </div>
      :
      <div className="LoginPage">
        <div className="Formulaire">
            <p className="TitleLogin">WebSoléa</p>
            <input value={this.state.HashPassword} onChange={this.onChangePassword} className="Form" placeholder="Mot de passe" type="password" name="password" />
        </div>
      </div>

      }
      </div>
    );
  }
}
