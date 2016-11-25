import React, { Component } from 'react';
import './style.css';

class PageHeader extends Component {
  constructor(props) {
    super();

    this.state = { ...props }
  }

  get title() {
    if (!this.state.title)
      return <h3></h3>;

    return <h3>{this.state.title}</h3>;
  }

  get subtitle() {
    if (!this.state.subtitle)
      return <h5></h5>;

    return <h5>{this.state.subtitle}</h5>;
  }

  render() {
    return (
      <div className="header__container">
        {this.title}
        {this.subtitle}
      </div>
    );
  }
}

export default PageHeader;
