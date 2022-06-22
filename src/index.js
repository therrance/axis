import React from "react";
import { render } from "react-dom";
import { TimeSeries, Index } from "pondjs";
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  AreaChart,
  styler
} from "react-timeseries-charts";
import data from "./data";

class SimpleChart extends React.Component {
  render() {
    const inB = data.values.map((x) => [x[x.length - 1], x[0]]);
    const outB = data.values.map((x) => [x[x.length - 1], x[1]]);
    console.log("inB: ", inB);
    console.log("outB: ", outB);

    const trafficIn = new TimeSeries({
      name: `in`,
      columns: ["time", "in"],
      points: inB
    });

    const trafficOut = new TimeSeries({
      name: `out`,
      columns: ["time", "out"],
      points: outB
    });

    const trafficSeries = TimeSeries.timeSeriesListMerge({
      name: "traffic",
      seriesList: [trafficIn, trafficOut]
    });

    // const series = new TimeSeries({
    //   name: "hilo_rainfall",
    //   columns: ["index", "precip"],
    //   points: data.values.map(([d, value]) => [
    //     Index.getIndexString("1h", new Date(d)),
    //     value
    //   ])
    // });

    console.log("series is ", trafficSeries);
    console.log("trafficSeries.range() is ", trafficSeries.range().begin());
    const upDownStyle = styler([
      { key: "in", color: "#C8D5B8" },
      { key: "out", color: "#9BB8D7" }
    ]);

    return (
      <Resizable>
        <ChartContainer
          timeRange={trafficSeries.range()}
          maxTime={trafficSeries.range().end()}
          minTime={trafficSeries.range().begin()}
        >
          <ChartRow height="150">
            <YAxis
              id="traffic"
              label="Traffic (bps)"
              labelOffset={0}
              // min={-max}
              // max={max}
              absolute={true}
              width="60"
              type={"linear"}
            />
            <Charts>
              <AreaChart
                axis="traffic"
                series={trafficSeries}
                columns={{
                  up: ["in"],
                  down: ["out"]
                }}
                style={upDownStyle}
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
}

class App extends React.Component {
  state = {};

  render() {
    return (
      <div className="p-3 m-4 border border-muted">
        <SimpleChart />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
