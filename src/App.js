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
    }
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({isSignedIn: false})
    } else if (route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render () {

    const {isSignedIn, route} = this.state;

    return(
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>  
          {
            (route === 'home' && <Home />) ||
            (route === 'register' && <Register onRouteChange={this.onRouteChange} />) ||
            (<SignIn onRouteChange={this.onRouteChange} />)
          }       
        </div>
      )
  }
}

export default App;
