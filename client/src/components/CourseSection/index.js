import React, { Component } from 'react';
import { daySorter } from './../../utils/sort';
import './style.css';

class CourseSection extends Component {
  constructor(props) {
    super();
    this.state = { ...props.data }
  }

  normalizeTime(tSeconds) {
    let tHours = Math.round(tSeconds / ( 60 * 60 ));
    let tMinutes = Math.round((tSeconds / 60) - (tHours * 60));
    return `${tHours - (tHours > 12 ? 12 : 0)}:${tMinutes === 0 ? '00' : tMinutes} ${tHours < 12 ? 'AM' : 'PM'}`;
  }

  mergeSections(times) {
    let o = {};

    times.forEach(time => {
      let k = `${time.start} ${time.end} ${time.location}`.replace(/ /g, '_');

      if (!o.hasOwnProperty(k)) {
        o[k] = {
          location: time.location,
          days: [],
          start: time.start,
          end: time.end
        };
      }

      o[k].days.push(time.day);
    });

    return Object.values(o);
  }

  render() {
    let { code, instructors, times, size, enrolment } = this.state;
    return (
      <div className="section">
        <div className="section__name">
          <div className="section__code">{code}</div>, <div className="section_instructors">{instructors.join(', ')}</div>
        </div>
        <div className="section__times">
          {this.mergeSections(times).map((time, i) => (
            <div key={i} className="section__time">
              <div className="time__day">{time.days.sort(daySorter).join(', ')}</div>
              <div className="time__start">{this.normalizeTime(time.start)}</div>&nbsp;–&nbsp;<div className="time__end">{this.normalizeTime(time.end)}</div>
              <div className="time__location">{time.location}</div>
            </div>
          ))}
        </div>
        <div className="section__numbers">
          <div className="section__enrolment">{enrolment}</div> / <div className="section__size">{size}</div>
        </div>
      </div>
    );
  }
}

export default CourseSection;
