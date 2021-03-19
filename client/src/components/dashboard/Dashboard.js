import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { registerEvent } from "../../actions/authActions";
import classnames from "classnames";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      EMail: "",
      EventName: "",
      EventType: "",
      EventStart: "",
      EventEnd: "",
      NoPeople: "",
      EventPlace: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    this.setState({
      EMail: "",
      EventName: "",
      EventType: "",
      EventStart: "",
      EventEnd: "",
      NoPeople: "",
      EventPlace: "",
      errors: {}
    });
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newEvent = {
      EMail: this.props.auth.user.email,
      EventName: this.state.EventName,
      EventType: this.state.EventType,
      EventStart: this.state.EventStart,
      EventEnd: this.state.EventEnd,
      NoPeople: this.state.NoPeople,
      EventPlace: this.state.EventPlace,

    };
    this.props.registerEvent(newEvent, this.props.history);

    console.log(newEvent);
    console.log(this.props.auth);
    this.handleReset();
    //this.props.logoutUser();


  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onAddClick = e => {
    e.preventDefault();
  document.querySelector('#listSpace').style.display = 'none'
  document.querySelector('#formSpace').style.display = 'block'
  document.querySelector('#listEventButton').style.display = 'none'
  document.querySelector('#addEventButton').style.display = 'none'

  }
  onDisplayClick = e => {
    e.preventDefault();
    document.querySelector('#listSpace').style.display = 'block'
    document.querySelector('#formSpace').style.display = 'none'
    document.querySelector('#listEventButton').style.display = 'none'
    document.querySelector('#addEventButton').style.display = 'block'
  
  }
  render() {
    const { errors } = this.state;

    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button id='addEventButton'
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onAddClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Add Event
            </button>
            <br/>
            <button id ='listEventButton'
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                display: 'none'
              }}
              onClick={this.onDisplayClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Show List of Events
            </button>
            <br/>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3"
            >
              Logout
            </button>
          </div>
        </div><div id='listSpace' className="container" style={{ paddingTop: '50px' }}>
          <div className="row">
            <div className="col s8 offset-s1">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>Your Event Details</h4>
              </div>
              {user.events.map((event, index) => (

                <ul className="collection">
                  <li key={index} className="collection-item avtar">
                    <span className="title">{index}. {event.EventName}   Type: {event.EventType}</span>
                    <p>From : {event.EventStart}    To : {event.EventEnd}<br />
             Gathering of {event.NoPeople} people in {event.EventPlace}
                    </p>

                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>

                  </li>
                </ul>

              ))}
            </div>
          </div>
        </div>
        <div id='formSpace' className="container" style={{ paddingTop: '400px', display: 'none' }}>
          <div className="row">
            <div className="col s8 offset-s1">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>Enter Event Details</h4>
              </div>
              <form id='EventForm' style={{ paddingTop: '20px' }} noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={user.email}
                    error={errors.EMail}
                    id="EMail"
                    type="email"
                    className={classnames("", {
                      invalid: errors.EMail
                    })}
                  />
                  <label htmlFor="EMail">Email</label>
                  <span className="red-text">{errors.EMail}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.EventName}
                    error={errors.EventName}
                    id="EventName"
                    type="text"
                    className={classnames("", {
                      invalid: errors.EventName
                    })}
                  />
                  <label htmlFor="EventName">Name of Event</label>
                  <span className="red-text">{errors.EventName}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.EventType}
                    error={errors.EventType}
                    id="EventType"
                    type="text"
                    className={classnames("", {
                      invalid: errors.EventType
                    })}
                  />
                  <label htmlFor="EventType">Type of Event</label>
                  <span className="red-text">{errors.EventType}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.EventStart}
                    error={errors.EventStart}
                    id="EventStart"
                    type="date"
                    className={classnames("", {
                      invalid: errors.EventStart
                    })}
                  />
                  <label htmlFor="EventStart">Starting Date of Event </label>
                  <span className="red-text">{errors.EventStart}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.EventEnd}
                    error={errors.EventEnd}
                    id="EventEnd"
                    type="date"
                    className={classnames("", {
                      invalid: errors.EventEnd
                    })}
                  />
                  <label htmlFor="EventEnd">Ending Date of Event</label>
                  <span className="red-text">{errors.EventEnd}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.NoPeople}
                    error={errors.NoPeople}
                    id="NoPeople"
                    type="number"
                    className={classnames("", {
                      invalid: errors.NoPeople
                    })}
                  />
                  <label htmlFor="NoPeople">Expected Number of People In Event</label>
                  <span className="red-text">{errors.NoPeople}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.EventPlace}
                    error={errors.EventPlace}
                    id="EventPlace"
                    type="text"
                    className={classnames("", {
                      invalid: errors.EventPlace
                    })}
                  />
                  <label htmlFor="EventPlace">Place of Event</label>
                  <span className="red-text">{errors.EventPlace}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                      fontSize: "8px"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Register Event
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  registerEvent: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser, registerEvent }
)(Dashboard);