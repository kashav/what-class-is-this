import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './containers/Home';
import Class from './containers/Class';
import Course from './containers/Course';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="/course/:id" component={Course} />
          <Route path="/class" component={Class} />
          <Route path="*" component={Home} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
