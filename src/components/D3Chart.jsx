import  { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
//import './D3Chart.css'; // Import any necessary CSS styles

const D3Chart = () => {
  const [year, setYear] = useState(1980);
  const [count, setCount] = useState(0);
  const duration = 250;
  const chartRef = useRef();
  const tooltipRef = useRef();

  const margin = { top: 35, right: 45, bottom: 40, left: 25 };
  const width = 565 - margin.left - margin.right;
  const height = 460 - margin.top - margin.bottom;
  const timerWidth = 200;
  const radius = 7;
  const increment = (timerWidth - 20) / 30;
  
  // Initialize the chart
  useEffect(() => {
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Define scales and axes
    const x = d3.scale.linear().range([0, width]);
    const y = d3.scale.linear().range([height, 0]);
    const xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format(",.1f"));
    const yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(",.1f")).tickSize(-width);

    // Render x and y axes
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .append("text")
      .attr("dy", "2.8em")
      .attr("dx", width / 1.6)
      .style("text-anchor", "end")
      .attr("class", "xlabel")
      .text("GDP per capita, log");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    // Tooltip setup
    d3.select(tooltipRef.current)
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Function to load data and draw the chart
    d3.csv("data.csv", function (data) {
      data.forEach(d => {
        d.loggdppc1980 = +d.loggdppc1980;
        d.logco2pc1980 = +d.logco2pc1980;
      });

      x.domain([5.3, 11.5]);
      y.domain([-1.3, 4.3]);

      svg.selectAll(".group")
        .data(data)
        .enter().append("g")
        .attr("class", "group")
        .append("circle")
        .attr("class", d => d.region)
        .classed("scatter", true)
        .attr("r", d => 20 * Math.sqrt(d.co21980 / 1000000 / 3.14))
        .attr("cx", d => x(d.loggdppc1980))
        .attr("cy", d => y(d.logco2pc1980))
        .on("mouseover", (event, d) => handleMouseOver(event, d))
        .on("mouseout", handleMouseOut);
    });

    // Handle tooltip on mouseover
    const handleMouseOver = (event, d) => {
      const tooltip = d3.select(tooltipRef.current);
      tooltip.html(`
        <p><strong>${d.country}, ${year}</strong></p>
        <p>CO<sub>2</sub> emissions: <strong>${d3.format(",.1f")(d["co2" + year] / 1000000)} million kilotons</strong></p>
        <p>GDP per capita: <strong>$${d3.format(",.0f")(d["gdppc" + year])}</strong></p>
        <p>CO<sub>2</sub> per capita: <strong>${d3.format(",.1f")(d["co2pc" + year])} metric tons</strong></p>
      `)
        .style("left", (event.pageX - 15) + "px")
        .style("top", (event.pageY - 100) + "px")
        .transition()
        .duration(250)
        .style("opacity", 1);
    };

    const handleMouseOut = () => {
      d3.select(tooltipRef.current).transition().duration(250).style("opacity", 0);
    };

    const updateChart = () => {
      // Increment year and update chart
      if (year < 2010) {
        setYear(year + 1);
        setCount(count + 1);
      } else {
        setYear(1980);
        setCount(0);
      }
      // Update circle positions and tooltip
      d3.selectAll(".scatter")
        .transition()
        .duration(duration)
        .ease("linear")
        .attr("cx", d => x(d["loggdppc" + year]))
        .attr("cy", d => y(d["logco2pc" + year]));
    };

    const timer = setInterval(updateChart, duration);
    return () => clearInterval(timer);

  }, [count, height, margin.bottom, margin.left, margin.right, margin.top, width, year]);

  return (
    <div className="d3-chart">
      <div ref={chartRef} id="chart" />
      <div ref={tooltipRef} className="tooltip" />
      <div id="slider">
        <svg width="250" height="23">
          <rect width={timerWidth} height="5" x="12" y="12" />
          <circle
            className="timerCircle"
            cx={12 + count * increment}
            cy="12"
            r={radius}
          />
        </svg>
      </div>
    </div>
  );
};

export default D3Chart;
