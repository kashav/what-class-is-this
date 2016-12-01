import React, { Component } from 'react';
import PageHeader from './../../components/PageHeader';
import Result from './../../components/Result';
import fetch from './../../utils/fetch';
import { BASE_URL } from './../../utils/constants';
import loading from './../../static/images/loading-ring.svg';
import './style.css';

class Class extends Component {
  constructor() {
    super();

    this.state = {
      courses: [],
      dataLoaded: false,
      domLoaded: false,
      title: null
    };
  }

  componentDidMount() {
    this.setState({ domLoaded: true }, () => {
      let { query } = this.props.location;

      let url = `${BASE_URL}/course/now?location=${query.location}&day=${query.day}&start=${query.start}`;

      fetch(url)
        .then(res => this.setState({
          courses: res.data,
          title: (res.data.map(o => o.code)).join(', '),
          dataLoaded: true
        }))
        .catch(err => console.error(err));
    });
  }

  get courses() {
    console.log(this.state.courses);

    return (
      <div className="container__results">
        {this.state.courses.map((course, i) => (
          <Result key={i} course={course} />
        ))}
      </div>
    );
  }

  formTime(seconds) {
    while (seconds > 86400)
      seconds -= 86400;

    let hour = seconds / 60 / 60;
    let period = hour >= 12 ? 'PM' : 'AM';
    let minutes = (hour - Math.floor(hour)) * 60;

    if (hour < 1)
      hour = 12;
    else if (hour >= 13)
      hour -= 12;

    hour = hour.toFixed(0);
    minutes = minutes.toFixed(0);

    return `${hour}:${minutes >= 10 ? minutes : '0' + minutes} ${period}`;
  }

  render() {
    let component;

    if (!this.state.domLoaded) {
      component = (
        <div className="body__content--loading">
          <img src={loading} alt="Loading"/>
        </div>
      );
    } else {
      let subcomponent = !this.state.dataLoaded
        ? (
          <div className="body__content--loading">
            <img src={loading} alt="Loading"/>
          </div>
        ) : (
          <div className="content__container">
            {this.courses}
          </div>
        );

      let { query } = this.props.location;

      component = (
        <div>
          <div className="body__header">
            <PageHeader title={this.state.title || 'Loading...'} subtitle={query ? `${query.location}, ${query.day} @ ${this.formTime(query.start)}` : ''}/>
          </div>
          <div className="body__content">{subcomponent}</div>
        </div>
      );
    }

    return (
      <div className="app__body">
        <div className="body__container">{component}</div>
      </div>
    );
  }
}

export default Class
