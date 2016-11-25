import React, { Component } from 'react';
import { DAYS_OF_WEEK } from './../../utils/constants';
import './style.css';

class ClassForm extends Component {
  constructor() {
    super();

    this.state = {
      room: '',
      day: this.getCurrentDay(),
      time: this.getCurrentHour(),
      formError: {}
    }
  }

  getCurrentDay() {
    let day = DAYS_OF_WEEK[new Date().getDay()];
    return `${day.charAt(0).toUpperCase()}${day.slice(1).toLowerCase()}`;
  }

  getCurrentHour() {
    let now = new Date().getHours();
    let after12 = now >= 12;

    if (now > 12)
      now -= 12
    else if (now === 0)
      now += 12

    return `${now}:00 ${after12 ? 'PM' : 'AM'}`;
  }

  prepareTime() {
    let { time } = this.state;

    let match = time.match(/^(\d+)(:(\d\d))?\s*((a|(p))m?)?$/i);

    let hr = parseInt(match[1], 10);
    let mi = parseInt(match[3], 10);
    let pd = match[4];

    if (hr === 12 && pd === 'AM')
      return mi * 60;

    if (pd === 'PM')
      hr += 12

    return hr * 60 * 60 + mi * 60;
  }

  validate(cb) {
    this.setState({ formError: {} }, () => {
      let { formError } = this.state;

      if (!this.state.room)
        formError.room = 'Required';

      if (!this.state.day)
        formError.day = 'Required';

      if (!this.state.time)
        formError.time = 'Required';

      if (!formError.hasOwnProperty('day')) {
        if (DAYS_OF_WEEK.indexOf(this.state.day.toUpperCase()) === -1) {
          formError.day = 'Invalid day';
        }
      }

      if (!formError.hasOwnProperty('time')) {
        try {
          let time = this.prepareTime()
        } catch (e) {
          formError.time = 'Invalid format';
        }
      }

      if (Object.keys(formError).length !== 0) {
        this.setState({ formError });
        return cb(false);
      }

      return cb(true);
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.validate(isValid => {
      if (!isValid)
        return

      window.location = `/result?location=${this.state.room}&day=${this.state.day}&start=${this.prepareTime()}`;
    });
  }

  render() {
    let { formError } = this.state;

    return (
      <form className="form">
        <div className="room">
          <label>Room {formError.room && <span className="error">{ formError.room }</span>}</label>
          <input
            placeholder="Room"
            value={this.state.room}
            onChange={(e) => this.setState({ 'room' : e.target.value })}
          />
        </div>
        <div className="day">
          <label>Day {formError.day && <span className="error">{ formError.day }</span>}</label>
          <input
            placeholder="Day"
            value={this.state.day}
            onChange={(e) => this.setState({ 'day' : e.target.value })}
          />
        </div>
        <div className="time">
          <label>Start time {formError.time && <span className="error">{ formError.time }</span>}</label>
          <input
            placeholder="Time"
            value={this.state.time}
            onChange={(e) => this.setState({ 'time' : e.target.value })}
          />
        </div>
        <div className="submit">
          <input type="submit" onClick={this.handleSubmit.bind(this)}/>
        </div>
      </form>
    );
  }
}

export default ClassForm;
