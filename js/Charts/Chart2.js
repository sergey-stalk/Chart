//функция построения графика #2

var chart2 = function () {
    mainAxis();
    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);
    // функция, создающая по массиву точек линии
    var line = d3.svg.line()
        .x(function(d){return d.x;})
        .y(function(d){return d.y;});
// функция, создающая область
    var area = d3.svg.area()
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
            .style("stroke-width", 2)
            .style("fill","none");
}