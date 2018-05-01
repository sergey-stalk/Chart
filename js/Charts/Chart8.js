var chart8 = function () {
    data = rawData;
    var curX = 0,
        curY = 0;

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

var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);
 
// длина оси X= ширина контейнера svg - отступ слева и справа
var xAxisLength = width - 2 * margin;     
  
// длина оси Y = высота контейнера svg - отступ сверху и снизу
var yAxisLength = height - 2 * margin;
    
// функция интерполяции значений на ось Х  
var scaleX = d3.scale.linear()
            .domain([1, numbX])
            .range([0, xAxisLength]);
             
// функция интерполяции значений на ось Y
var scaleY = d3.scale.linear()
            .domain([numbY, 0])
            .range([0, yAxisLength]);
         
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
     
// рисуем горизонтальные линии 
d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLength)
    .attr("y2", 0);
// создаем объект g для прямоугольников
var g =svg.append("g")
    .attr("class", "body")
    .attr("transform",  // сдвиг объекта вправо
         "translate(" + margin + ", 0 )");
// связываем данные с прямоугольниками
g.selectAll("rect.bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar");
// устанавливаем параметры прямоугольников
g.selectAll("rect.bar")
    .data(data)
    .attr("x", function (d) { 
        return scaleX(d.x);
    })
    .attr("y", function (d) { 
        return scaleY(d.y) + margin;
    })
    .attr("height", function (d) { 
        return yAxisLength - scaleY(d.y); 
    })
    .attr("width", function(d) {
         
        return Math.floor(xAxisLength / data.length) - padding - 5;
    });
}