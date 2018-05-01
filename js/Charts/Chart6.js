var chart6 = function () {
    mainAxis();
    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);

    var line = d3.svg.line().interpolate("cardinal-closed")
        .x(function(d){return d.x;})
        .y(function(d){return d.y;});
             
    var area = d3.svg.area().interpolate("cardinal-closed")
        .x(function(d) { return d.x; })
        .y0(height - margin)
        .y1(function(d) { return d.y; });
     
    var g = svg.append("g");
    g.append("path")
        .attr("d", area(data))
        .style("fill", "lightblue");
    g.append("path")
        .attr("d", line(data))
        .style("stroke", "steelblue")
        .style("stroke-width", 2);
}