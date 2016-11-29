import React, { Component } from 'react';
import './style.css';

class Result extends Component {
  render() {
    let { course } = this.props;

    return (
      <div>
        <a href={`/course/${course.id}`}>{course.name}</a>
        <div>{course.code}, {course.department}</div>
      </div>
    );
  }
}

export default Result;
