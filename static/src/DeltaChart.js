function deltaChart(
  selector,
  dataset,
  width,
  height,
  xMetric1,
  xMetric2,
  yMetric,
  axisLabelText
) {
  const lightGreen = "rgba(60, 117, 100, 0.6)"; // "#3C7564";
  const lightRed = "rgba(194, 56, 42, 0.6)"; // "#c0392b";

  const hoverGreen = "rgba(60, 117, 100, 0.8)"; // "#3C7564";
  const hoverRed = "rgba(194, 56, 42, 0.8)"; // "#c0392b";

  const green = "#3C7564";
  const red = "#c0392b";

  const circleColor = "#2e3034";

  // create chart dimensions
  let dimensions = {
    width: width,
    height: height,
    margin: {
      top: 20,
      right: 80,
      bottom: 50,
      left: 130,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const x1Accessor = (d) => d[xMetric1];
  const x2Accessor = (d) => d[xMetric2];
  const xDeltaAccessor = (d) => d["delta"];
  const yAccessor = (d) => d[yMetric];

  // draw canvas

  const wrapper = d3
    .select(selector)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const bounds = wrapper
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  // create scales

  const xScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max([d3.max(dataset, x1Accessor), d3.max(dataset, x2Accessor)]),
    ])
    .rangeRound([0, dimensions.boundedWidth / 2])
    .nice();

  const xScaleLeft = d3
    .scaleLinear()
    .domain([
      0,
      d3.max([d3.max(dataset, x1Accessor), d3.max(dataset, x2Accessor)]),
    ])
    .rangeRound([dimensions.boundedWidth / 2, 0])
    .nice();

  const xScalePoints = d3
    .scaleLinear()
    .domain([
      -d3.max([d3.max(dataset, x1Accessor), d3.max(dataset, x2Accessor)]),
      d3.max([d3.max(dataset, x1Accessor), d3.max(dataset, x2Accessor)]),
    ])
    .rangeRound([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3
    .scaleBand()
    .domain(dataset.map((d) => d[yMetric]))
    .range([0, dimensions.boundedHeight])
    .padding(0.4);

  // draw data

  const chart = bounds.selectAll("g").data(dataset).enter().append("g");

  // add left side bars

  const leftBarGroup = chart.append("g");
  const leftBars = leftBarGroup
    .append("rect")
    .attr("x", (d) => dimensions.boundedWidth / 2)
    .attr("y", (d) => yScale(yAccessor(d)))
    .attr("width", xScale(0))
    .attr("height", yScale.bandwidth())
    .attr("fill", lightRed)
    .on("mouseover", function () {
      d3.select(this).attr("fill", hoverRed);
      d3.select(this).style("cursor", "pointer");
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", lightRed);
      d3.select(this).style("cursor", "default");
    });

  // add right side bars

  const rightBarGroup = chart.append("g");
  const rightBars = rightBarGroup
    .append("rect")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", (d) => yScale(yAccessor(d)))
    .attr("width", xScale(0))
    .attr("height", yScale.bandwidth())
    .attr("fill", lightGreen)
    .on("mouseover", function () {
      d3.select(this).attr("fill", hoverGreen);
      d3.select(this).style("cursor", "pointer");
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", lightGreen);
      d3.select(this).style("cursor", "default");
    });

  // add points
  const pointsGroup = chart.append("g");
  const pointCircles = pointsGroup
    .append("circle")
    // .attr("cx", (d) => xScalePoints(xDeltaAccessor(d)))
    .attr("cx", xScalePoints(0))
    .attr("cy", (d) => yScale(yAccessor(d)) + yScale.bandwidth() / 2)
    .attr("r", yScale.bandwidth() / 2 - 4)
    .style("fill", circleColor);

  // draw peripherals

  const xAxisRightGenerator = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat((x) => formatAbbreviation(x));

  const xAxisRight = bounds
    .append("g")
    .call(xAxisRightGenerator)
    .attr(
      "transform",
      `translate(${dimensions.boundedWidth / 2}, ${dimensions.boundedHeight})`
    );

  const xAxisLeftGenerator = d3
    .axisBottom()
    .scale(xScaleLeft)
    .tickFormat((x) => formatAbbreviation(x));

  const xAxisLeft = bounds
    .append("g")
    .call(xAxisLeftGenerator)
    .attr("transform", `translate(0, ${dimensions.boundedHeight})`);

  const yAxisGenerator = d3.axisLeft().scale(yScale);
  const yAxis = bounds.append("g").call(yAxisGenerator);

  const xAxisLabel = xAxisLeft
    .append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text(axisLabelText)
    .style("text-transform", "capitalize");

  const xAxisLabelRight = xAxisLeft
    .append("text")
    .attr("x", dimensions.boundedWidth - 25)
    .attr("y", dimensions.margin.bottom - 10)
    .style("fill", "#1a1c1e")
    .style("font-size", "1.1em")
    .text("Exports")
    .style("text-transform", "uppercase")
    .style("text-transform", "italics");

  const xAxisLabelLeft = xAxisLeft
    .append("text")
    .attr("x", 25)
    .attr("y", dimensions.margin.bottom - 10)
    .style("fill", "#1a1c1e")
    .style("font-size", "1.1em")
    .text("Imports")
    .style("text-transform", "uppercase")
    .style("text-transform", "italics");

  // animations
  leftBarGroup
    .selectAll("rect")
    .transition()
    .duration(1600)
    .attr("x", (d) => dimensions.boundedWidth / 2 - xScale(x2Accessor(d)))
    .attr("width", (d) => xScale(x2Accessor(d)));

  rightBarGroup
    .selectAll("rect")
    .transition()
    .duration(1600)
    .attr("x", dimensions.boundedWidth / 2)
    .attr("width", (d) => xScale(x1Accessor(d)));

  pointsGroup
    .selectAll("circle")
    .transition()
    .duration(1600)
    .attr("cx", (d) => xScalePoints(xDeltaAccessor(d)));
}
