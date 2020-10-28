import React, { Component, Fragment } from "react";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "react-component-countdown-timer/lib/styles.css";

import "./style.css";
import Promotion from "./Promotion";

export default class PromotionSlick extends Component {
  
  render() {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
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
      <Carousel responsive={responsive}>
        {this.props.products && this.props.products.length > 0
          ? this.props.products.map(
              (product) =>
                product.advertisement &&
                product.advertisement.id && <Promotion {...product} />
            )
          : []}
      </Carousel>
    );
  }
}
