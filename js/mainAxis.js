//функция построения сетки координат

var mainAxis = function () {
    var curX = 0,
        curY = 0;


    // создание объекта svg
    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);
 
    // длина оси X= ширина контейнера svg - отступ слева и справа
    var xAxisLength = width - 2 * margin;     
  
    // длина оси Y = высота контейнера svg - отступ сверху и снизу
    var yAxisLength = height - 2 * margin;

    for (var i = 0; i < rawData.length; i++) {
        if (curX < rawData[i].x) {
            curX = rawData[i].x
        }
        if (curY < rawData[i].y) {
            curY = rawData[i].y
        }
    }
    var sizePlusX = curX/100*10;
    var sizePlusY = curY/100*10;

    numbX = curX + sizePlusX;
    numbY = curY + sizePlusY;

    // функция интерполяции значений на ось Х  
    var scaleX = d3.scale.linear()
        .domain([0, numbX])
        .range([0, xAxisLength]);
             
    // функция интерполяции значений на ось Y
    var scaleY = d3.scale.linear()
        .domain([numbY, 0])
        .range([0, yAxisLength]);

    // масштабирование реальных данных в данные для нашей координатной системы
    for (i = 0; i < rawData.length; i++)
    data.push({
      x: scaleX(rawData[i].x) + margin,
      y: scaleY(rawData[i].y) + margin
    });

    // создаем ось X   
    var xAxis = d3.svg.axis()
        .scale(scaleX)
        .orient("bottom");
    // создаем ось Y             
    var yAxis = d3.svg.axis()
        .scale(scaleY)
        .orient("left");
              
    // отрисовка оси Х             
    svg.append("g")       
        .attr("class", "x-axis")
        .attr("transform",  // сдвиг оси вниз и вправо
        "translate(" + margin + "," + (height - margin) + ")")
        .call(xAxis);
 
    // отрисовка оси Y 
    svg.append("g")       
        .attr("class", "y-axis")
        .attr("transform", // сдвиг оси вниз и вправо на margin
            "translate(" + margin + "," + margin + ")")
        .call(yAxis);
 
    // создаем набор вертикальных линий для сетки   
    d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLength));
     
    // рисуем горизонтальные линии координатной сетки
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLength)
        .attr("y2", 0);


    // добавляем отметки к точкам
    svg.selectAll(".dot")
        .data(rawData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return scaleX(d.x)+margin; })
        .attr("cy", function(d) { return scaleY(d.y)+margin; });

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .style("stroke", "steelblue")
        .style("fill", "white")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return scaleX(d.date)+margin; })
        .attr("cy", function(d) { return scaleY(d.rate)+margin; });
};


