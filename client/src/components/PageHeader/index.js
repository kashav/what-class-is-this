import React, { Component } from 'react';
import './style.css';

class PageHeader extends Component {
  constructor(props) {
    super();

    this.state = { ...props }
  }

  render() {
    let { title, subtitle } = this.state;

    if (!title) {
      return <div></div>;
    }


    return (
      <div className="header__container">
        <h3>{ title }</h3>
        <h5>{ subtitle }</h5>
      </div>
    );
  }
}

export default PageHeader;
