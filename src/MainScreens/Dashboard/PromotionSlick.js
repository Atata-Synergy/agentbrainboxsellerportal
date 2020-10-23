import React, { Component, Fragment } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Panel, Placeholder, FlexboxGrid, Button } from "rsuite";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";

import "./style.css";
import Promotion from "./Promotion";

export default class PromotionSlick extends Component {
  render() {
    const { Paragraph } = Placeholder;
    var settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    
    var panelStyle = {
      display: "inline-block",
      width: "95%",
      marginTop: 20,
      margin: 5,
    };

    return (
      <Slider {...settings} style={{ marginTop: 40 }}>
        <Promotion />
        <Promotion />
        <Promotion />
        <Promotion />
        </Slider>
    );
  }
}
