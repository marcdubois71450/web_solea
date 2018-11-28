import React, { Component } from 'react';
import './LoginPage.css';
import { render } from 'react-dom';
import Admin from './../Admin';



export default class LoginPage extends Component {
  constructor(props) {
        super(props);
        this.state = {
            HashPassword: ''
        };
        this.onChangePassword = this.onChangePassword.bind(this);
    }

onChangePassword (event) {
   this.setState({ HashPassword: event.target.value });
   var HashPassword = md5(md5(event.target.value));
 }


 static getDerivedStateFromProps(nextProps) {
   if(nextProps.HashPassword) {
     return {
       HashPassword: nextProps.HashPassword,
     };
   }
   return null;
 }

  render() {
    const { HashPassword } = this.state;

    return (
      <div>
      {HashPassword =='c3284d0f94606de1fd2af172aba15bf3' ?
                  <div className="LoginPage">
                    <div>
                      <form>
                        <p className="TitleLogin">WebSoléa</p>
                        <input value={this.state.HashPassword} onChange={this.onChangePassword} className="Form" placeholder="Mot de passe" type="password" name="password" /><br />
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
