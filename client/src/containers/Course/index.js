import React, { Component } from 'react';

import PageHeader from './../../components/PageHeader';
import CourseSection from './../../components/CourseSection';

import fetch from './../../utils/fetch';
import { BASE_URL } from './../../utils/constants';

import loading from './../../static/images/loading-ring.svg';
import './style.css';

class Course extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      courseData: {}
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.params.id
    }, () => {
      let url = `${BASE_URL}/course/single/${this.state.id}`;
      fetch(url)
        .then(res => this.setState({ courseData: res.data }))
        .catch(err => console.error(err))
    })
  }

  get pageHeader() {
    let { id } = this.state;

    if (!id) {
      return (
        <div></div>
      );
    }

    return (
      <PageHeader title={id} subtitle={"course sections"}/>
    );
  }

  get courseData() {
    let { courseData } = this.state;

    if (Object.keys(courseData).length === 0) {
      return (
        <span className="body__content--loading">
          <img src={loading} alt="Loading"/>
        </span>
      );
    }

    console.log(courseData)

    return (
      <div className="course">
        <div className="course__title">{ courseData.name }, <em>{ courseData.term }</em></div>
        <div className="course__sections">{ courseData.sections.map((section, i) => {
          return (
            <CourseSection key={i} data={section}/>
          );
        })}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="app__body">
        <div className="body__container">
          <div className="body__header">{this.pageHeader}</div>
          <div className="body__content">{this.courseData}</div>
        </div>
      </div>
    )
  }
}

export default Course
