import React, { useEffect } from "react";
import { Chart } from "react-charts";
import { connect } from "react-redux";
import { getChartOrders } from "../../Actions/orderAction";
import { useState } from "react";
import { Placeholder } from "rsuite";
function ChartReport(props) {
  const [weekOne, setWeekOne] = useState([]);
  const [showChart, setShowChart] = useState(false);
  useEffect(() => {
    props.getChartOrders();
  }, []);
  useEffect(() => {
    const week = [
      { x: "Monday", y: 0 },
      { x: "Tuesday", y: 0 },
      { x: "Wednesday", y: 0 },
      { x: "Thursday", y: 0 },
      { x: "Friday", y: 0 },
      { x: "Saturday", y: 0 },
      { x: "Sunday", y: 0 },
    ];
    week.map((day) => {
      let totalCost = 0;
      props.c_orders[day.x] &&
        props.c_orders[day.x].map((order) => {
          totalCost += Number(order.item_price);
        });
      day.y = totalCost;
    });
    setWeekOne(week);
    setShowChart(weekOne.length > 0 ? true : false);
  }, [props.c_orders]);
  const data = [
    /**
     * x-axis represents week i.e 1 => Monday, 2 => Tuesday etc
     * y-axis is the amount of product sold
     */
    {
      label: "Week 1",
      data: weekOne,
    },
    {
      label: "Week 2",
      data: [
        { x: "Monday", y: 0 },
        { x: "Tuesday", y: 0 },
        { x: "Wednesday", y: 0 },
        { x: "Thursday", y: 0 },
        { x: "Friday", y: 0 },
        { x: "Saturday", y: 0 },
        { x: "Sunday", y: 0 },
      ],
    },
    {
      label: "Week 3",
      data: [
        { x: "Monday", y: 0 },
        { x: "Tuesday", y: 0 },
        { x: "Wednesday", y: 0 },
        { x: "Thursday", y: 0 },
        { x: "Friday", y: 0 },
        { x: "Saturday", y: 0 },
        { x: "Sunday", y: 0 },
      ],
    },
  ];

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  const getLabel = React.useCallback((series) => series.label, []);

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      {showChart ? (
        <Chart data={data} axes={axes} getLabel={getLabel} tooltip redraw />
      ) : (
        <Placeholder.Graph active />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  c_orders: state.order.c_orders,
  c_orderError: state.order.c_orderError,
  C_gettingOrders: state.order.C_gettingOrders,
});

const mapDispatchToProps = {
  getChartOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartReport);
