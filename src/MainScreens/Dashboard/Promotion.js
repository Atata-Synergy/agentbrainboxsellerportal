import React, { Component } from "react";
import { Placeholder, Button } from "rsuite";

export default class Promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      hour: 0,
      Min: 0,
      seconds: 0,
      countDownDate: new Date(
        props.advertisement && props.advertisement.ElapseDate
      ).getTime(),
    };
  }

  render() {
    // Set the date we're counting down to
    const { countDownDate } = this.state;
    var app = this;
    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get todays date and time
      var now = new Date().getTime(); // Find the distance between now and the count down date

      var distance = countDownDate - now; // Time calculations for days, hours, minutes and seconds

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days < 10) {
        days = "0" + days;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      app.setState({
        days: days > 0 ? days : "00",
        hours: hours > 0 ? hours : "00",
        seconds: seconds > 0 ? seconds : "00",
        minutes: minutes > 0 ? minutes : "00",
      });
    }, 1000);
    const { hours, minutes, seconds } = this.state;
    return (
      <div className="card m-4">
        <div
          className="card-header"
          style={{ textAlign: "center", backgroundColor: "#474747" }}
        >
          <div>
            <p style={{ color: "#fff" }}>Advert expires in </p>
            <h4 style={{ color: "#fff" }}>
              {hours}:{minutes}:{seconds}
            </h4>
          </div>
        </div>
        <div className="card-img">
          {/* <img src={this.props.media[0].path} /> */}
        </div>
        <hr className="my-4"/>
        <div className="card-body">
          <div className="mx-auto text-center">
            <h4>{this.props.name}</h4>
            <p>{this.props.model}</p>
            <p>{this.props.price}</p>
          </div>
        </div>
      </div>
    );
  }
}
