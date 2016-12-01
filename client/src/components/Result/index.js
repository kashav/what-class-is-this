import React, { Component } from 'react';
import './style.css';

class Result extends Component {
  render() {
    let { course } = this.props;

    return (
      <div className="results__result">
        <a className="result__name" href={`/course/${course.id}`}>{course.name}</a>
        <div className="result__description">{course.code}, {course.department} – {(course.sections.map(s => s.instructors.map(i => i))).join(', ')} </div>
      </div>
    );
  }
}

export default Result;
