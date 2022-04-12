import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Home from './components/Home/Home';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      route: 'signin',
      user: {
        id: '',
        name: "",
        email: "",
        entries: 0,
        joined: "",
      }
    }
  }

  loadUser = (data) => {
    console.log(">>>>>>>>>>>", data);
    this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined,
        }}
    );
  }

  updateEntriesForUser = (entries) => {
    this.setState({user: {...this.state.user, entries}});
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({isSignedIn: false})
    } else if (route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  componentDidMount() {

    fetch('http://localhost:3100')
      .then(resp => resp.json())
      .then(console.log);
  }

  render () {

    const {isSignedIn, route, user} = this.state;

    return(
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>  
          {
            (route === 'home' && <Home user={user} updateEntriesForUser={this.updateEntriesForUser}/>) ||
            (route === 'register' && <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />) ||
            (<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
          }       
        </div>
      )
  }
}

export default App;
