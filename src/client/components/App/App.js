import React, { Component } from 'react';
import './App.css';
import Header from './../Header';
export default class App extends Component {


  state = { OsType: null };

   componentDidMount() {
     fetch('/api/serverinfo')
       .then(res => res.json())
       .then(os => this.setState({ OsType: os.OsType }));
   }

  render() {
    const { OsType } = this.state;

    return (

      <div>
      {OsType ? <h1>{`Hello ${OsType}`}</h1> : <h1>Loading.. please wait!</h1>}
      <Header />
      </div>
    );
  }
}
