async function multiplesChart(selector, dataset, width, height) {
  // create chart dimensions

  let dimensions = {
    width: width,
    height: height,
    margin: {
      top: 40,
      right: 10,
      bottom: 30,
      left: 10,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

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


//   const drawLines = (metric) => {
//     const metricAccessor = (d) => d[metric];
//     const xAccessor = (d) => d.year;
//     const yAccessor = (d) => d.import_tusd;

    // 3. Draw canvas

    // const wrapper = d3
    //   .select(selector)
    //   .append("svg")
    //   .attr("width", dimensions.width)
    //   .attr("height", dimensions.height);

    // const bounds = wrapper
    //   .append("g")
    //   .style(
    //     "transform",
    //     `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    //   );

    // 4. Create scales

    // var xScale = d3
    //   .scaleTime()
    //   .domain(d3.extent(dataset, metricAccessor))
    //   .range([0, dimensions.boundedWidth])
    //   .nice();

    // const yScale = d3
    //   .scaleLinear()
    //   .domain([0, d3.max(dataset, yAccessor)])
    //   .range([dimensions.boundedHeight, 0])
    //   .nice();

    // draw data

    // const binGroups = bounds.selectAll("g").data(bins).enter().append("g");

    // bounds
    //   .append("path")
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 1.5)
    //   .attr(
    //     "d",
    //     d3
    //       .line()
    //       .x((d) => xScale(xAccessor(d)))
    //       .y((d) => yScale(yAccessor(d)))
    //   );

    // 6. Draw peripherals

    // const xAxisGenerator = d3.axisBottom();

    // const xAxis = bounds
    //   .append("g")
    //   .call(xAxisGenerator)
    //   .style("transform", `translateY(${dimensions.boundedHeight}px)`);

    // const xAxisLabel = xAxis
    //   .append("text")
    //   .attr("x", dimensions.boundedWidth / 2)
    //   .attr("y", dimensions.margin.bottom - 10)
    //   .attr("fill", "black")
    //   .style("font-size", "1.4em")
    //   .text(metric)
    //   .style("text-transform", "capitalize");
  };

  //   const metrics = ["China", "France"];

  //   const metrics = [
  //     "Austria",
  //     "Belgium",
  //     "Bulgaria",
  //     "China",
  //     "Croatia",
  //     "Czechia",
  //     "Denmark",
  //     "Estonia",
  //     "Finland",
  //     "France",
  //     "Greece",
  //     "Hungary",
  //     "Ireland",
  //     "Italy",
  //     "Japan",
  //     "Luxembourg",
  //     "Netherlands",
  //     "Norway",
  //     "Poland",
  //     "Portugal",
  //     "Romania",
  //     "Russia",
  //     "Spain",
  //     "Sweden",
  //     "Switzerland",
  //     "United Kingdom",
  //     "United States",
  //   ];

  //   metrics.forEach(drawLines);
}
