function barChart(selector, dataset, width, height, xMetric, yMetric) {
  const green = "#3c7564";
  const hoverColor = "#286151";

  // create chart dimensions
  let dimensions = {
    width: width,
    height: height,
    margin: {
      top: 20,
      right: 50,
      bottom: 50,
      left: 80,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const xAccessor = (d) => d[xMetric];
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
    .domain([0, d3.max(dataset, xAccessor)])
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3
    .scaleBand()
    .domain(dataset.map((d) => d[yMetric]))
    .range([0, dimensions.boundedHeight])
    .padding(0.4);

  // draw data

  const bars = bounds
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", xScale(0))
    .attr("y", (d) => yScale(yAccessor(d)))
    .attr("width", xScale(0))
    .attr("height", yScale.bandwidth())
    .attr("fill", green)
    .on("mouseover", function () {
      d3.select(this).attr("fill", hoverColor);
      d3.select(this).style("cursor", "pointer");
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", green);
      d3.select(this).style("cursor", "default");
    });

  // draw peripherals

  const xAxisGenerator = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat((x) => formatAbbreviation(x));

  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dimensions.boundedHeight}px)`);

  const yAxisGenerator = d3.axisLeft().scale(yScale);
  const yAxis = bounds.append("g").call(yAxisGenerator);

  const xAxisLabel = xAxis
    .append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("IMPORTS IN T-USD")
    .style("text-transform", "capitalize");

  // animation

  bounds
    .selectAll("rect")
    .transition()
    .duration(1600)
    .attr("x", (d) => xScale(0))
    .attr("width", (d) => xScale(xAccessor(d)));
}
