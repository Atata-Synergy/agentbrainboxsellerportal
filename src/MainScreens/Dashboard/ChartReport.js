import React from "react";
import { Chart } from "react-charts";

export default function ChartReport() {
  const data = React.useMemo(
    () => [
      /**
       * x-axis represents week i.e 1 => Monday, 2 => Tuesday etc
       * y-axis is the amount of product sold
       */
      {
        label: "Week 1",
        data: [
          { x: "Mon", y: 12 },
          { x: "Tues", y: 2 },
          { x: "Weds", y: 30 },
          { x: "Thurs", y: 25 },
          { x: "Fri", y: 0 },
          { x: "Sat", y: 4 },
          { x: "Sun", y: 1 },
        ],
      },
      {
        label: "Week 2",
        data: [
          { x: "Mon", y: 2 },
          { x: "Tues", y: 0 },
          { x: "Weds", y: 0 },
          { x: "Thurs", y: 25 },
          { x: "Fri", y: 10 },
          { x: "Sat", y: 40 },
          { x: "Sun", y: 1 },
        ],
      },
      {
        label: "Week 3",
        data: [
          { x: "Mon", y: 0 },
          { x: "Tues", y: 2 },
          { x: "Weds", y: 30 },
          { x: "Thurs", y: 20 },
          { x: "Fri", y: 0 },
          { x: "Sat", y: 14 },
          { x: "Sun", y: 11 },
        ],
      },
    ],
    []
  );

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
      <Chart data={data} axes={axes} getLabel={getLabel} tooltip />
    </div>
  );
}
