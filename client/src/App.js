import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './containers/Home';
import Result from './containers/Result';
import Course from './containers/Course';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="/course/:id" component={Course} />
          <Route path="/result" component={Result} />
          <Route path="*" component={Home} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
