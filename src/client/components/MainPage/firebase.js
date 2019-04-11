import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDfwvEbmvdqx1bVagD1KKbbed7hDXngHy8",
    authDomain: "websolea.firebaseapp.com",
    databaseURL: "https://websolea.firebaseio.com",
    projectId: "websolea",
    storageBucket: "websolea.appspot.com",
    messagingSenderId: "49774079202"
  };

firebase.initializeApp(config);

const database = firebase.database();

export {
  database,
};
