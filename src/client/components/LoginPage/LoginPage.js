import React, { Component } from 'react';
import './LoginPage.css';
import { render } from 'react-dom';
import Admin from './../Admin';



export default class LoginPage extends Component {
  state = { Auth: 0 };



  render() {
    const { Auth } = this.state;

    return (
      <div>
      {Auth==1 ?
                  <div className="LoginPage">
                    <div>
                      <form>
                        <p className="TitleLogin">WebSoléa</p>
                        <input className="Form" placeholder="Mot de passe" type="password" name="password" /><br />
                        <input className="FormSubmit" type="submit" value="Connexion" />
                      </form>
                    </div>
                  </div>
      :
                  <div>
                    <Admin />
                  </div>
      }






      </div>
    );
  }
}
