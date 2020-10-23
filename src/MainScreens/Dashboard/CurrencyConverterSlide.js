import React, { Component, Fragment } from "react";
import { Carousel, Placeholder, Panel } from "rsuite";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

export default class CurrencyConverterSlide extends Component {
  constructor() {
    super();
    this.fetchCurrency = this.fetchCurrency.bind(this);
    // this.convertTo = this.convertTo.bind(this);
    this.state = {
      countries: {},
      baseCurrency: "NGN",
      fetchCountryFail: false,
    };
  }

  // async convertTo(currency) {
  //   axios
  //     .get(
  //       `https://api.currencylayer.com/convert?access_key=f724a5d7091c60861037aa2465e84136&from${this.state.baseCurrency}&to=${currency}&amount=10`
  //     )
  //     .then((response) => {
  //       return response
  //     })
  //     .catch((err) => {
  //       console.log(err);

  //     });
  // }

  fetchCurrency() {
    axios
      .get("https://restcountries.eu/rest/v2/region/africa")
      .then((response) => {
        return response.data;
      })
      .then((data) => this.setState({ countries: data }))
      // .then(() => console.log(this.state.countries))
      .catch((err) => {
        this.setState({ fetchCountryFail: true });
      });
  }
  componentDidMount() {
    this.fetchCurrency();
  }
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 4,
    };
    const { Paragraph } = Placeholder;
    const { countries } = this.state;
    return (
      <div className="mt-4">
        <div className="justify-content-center d-flex m-4">
          <h6> Real time currency Converter </h6>{" "}
          <select name="" id="" className="font-control ml-3">
            <option value="default" disabled>
              Choose currency{" "}
            </option>{" "}
            <option value="NGN"> Nigerian Naira(NGN) </option>{" "}
          </select>{" "}
        </div>{" "}
        {/* https://restcountries.eu/rest/v2/region/europe */}
        <Slider {...settings}>
          {" "}
          {/* <div className="row"> */}
          {countries.length > 0 ? (
            countries.map((data) =>
              data.name ? (
                <div className="tile_stats_count p-3">
                  <span className="count_top">
                    {" "}
                    {console.log(data)} <i className="fa fa-user"> </i>{" "}
                    {data.currencies[0].code}{" "}
                  </span>{" "}
                  <div className="count"> {data.name} </div>{" "}
                  <span className="count_bottom">
                    <i className="green">NGN 0.00 </i>{" "}
                  </span>{" "}
                </div>
              ) : (
                <div className="tile_stats_count p-3  mr-2">
                  <Paragraph rows={3} rowMargin={10} active />
                </div>
              )
            )
          ) : this.state.fetchCountryFail === true ? (
            <div className="tile_stats_count p-3  mr-2">
              <p className="text-danger"> Failed to load Countries </p>{" "}
            </div>
          ) : (
            <div className="tile_stats_count p-3  mr-2">
              <Paragraph rows={3} rowMargin={10} active />
            </div>
          )}{" "}
        </Slider>{" "}
      </div>
      // </div>
    );
  }
}
