import React, { Component } from 'react';
import firebase from 'firebase';
import './login.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido de la sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton() {
    // si el usuario está logeado
    if (this.state.user) {
      return (
        <nav>
          <ul className="user">
            <img className="rounded-circle prolife" width="100" src={this.state.user.photoURL} alt={this.state.user.displayName} />
            <li className="name">{this.state.user.displayName}</li>
            <button className="btn btn-info btn-lg logout" onClick={this.handleLogout}>Logout</button>
          </ul>
        </nav>
      );
    } else {
      return (
        // si no lo está
        <button className="btn btn-info btn-lg login" onClick={this.handleAuth}>Inicia sesión</button>
      );
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*         <h2>EVENTLAB</h2> */}
        </div>
        <p className="App-intro">
          {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default Login;
