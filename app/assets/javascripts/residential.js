function makePie() {
  var width = 960,
     height = 500,
     radius = Math.min(width, height) / 2,
     totals = {},
     color  = d3.scale.category20c();

  var arc = d3.svg.arc()
                  .outerRadius(radius - 10)
                  .innerRadius(0);

  var pie = d3.layout.pie()
                     .sort(null)
                     .value(function(d) { return totals[d]; });

  var svg = d3.select("body").append("svg")
                              .attr("width", width)
                              .attr("height", height)
                             .append("g")
                              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  $.getJSON('/residential/data', function(data) {
    totals = data.totals;

    var g = svg.selectAll(".arc")
               .data(pie(d3.keys(totals)))
               .enter().append("g")
                         .attr("class", "arc")
                         .on("mouseover", function(d) {
                          d3.select(this).select("text").style("font-weight", "bold")
                          d3.select(this).select("text").style("font-size", "1.25em")
                         })
                         .on("mouseout", function(d) {
                          d3.select(this).select("text").style("font-weight", "normal")
                          d3.select(this).select("text").style("font-size", "1em")
                         })
                         ;

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data); });

    var pos = d3.svg.arc()
                 .outerRadius(radius + 20)
                 .innerRadius(radius + 20);

    g.append("text")
      .attr("transform", function(d) { return "translate(" + pos.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data; });
  });
}
