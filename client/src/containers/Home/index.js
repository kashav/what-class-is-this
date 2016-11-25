import React, { Component } from 'react';
import PageHeader from './../../components/PageHeader';
import ClassForm from './../../components/ClassForm';
import './style.css';

class Home extends Component {
  render() {
    return (
      <div className="app__body">
        <div className="body__container">
          <div className="body__header">
            <PageHeader title={"What Class is This??"} subtitle={"Find out what class you're sitting in on."}/>
          </div>
          <div className="body__content">
            <div className="content__container">
              <ClassForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
