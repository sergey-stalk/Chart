//функция построения графика #1

var chart1 = function () {
    mainAxis();
    // создание объекта svg
    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);

    // функция, создающая по массиву точек линии
    var line = d3.svg.line()
        .x(function(d){return d.x;})
        .y(function(d){return d.y;});

    // добавляем путь
    svg.append("g").append("path")
    .attr("d", line(data))
    .style("stroke", "steelblue")
    .style("stroke-width", 2)
    .style("fill","none");
} 
