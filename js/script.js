
//Добавления строки таблицы

$('.addRow').click(function () {
    var ind = $('tr:last').index();
    $('.hide').clone().appendTo('table').addClass('row').removeClass('hide');
    $('tr:last>td:nth-child(2)>input').addClass('x');
    $('tr:last>td:nth-child(3)>input').addClass('y');
    $('tr:last>td:first').text(ind);
    data = [];
});

var rawData = [];
var height = 500, 
    width = 500, 
    margin=50,
    data=[],
    padding = 2,
    numb,
    x, y,
    mass = {},
    info,
    radio = $('.radio');
    
//функция построения сетки координат

var osi = function () {
    var cur = 0;

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
        if (cur < rawData[i].x) {
            cur = rawData[i].x
        }
        if (cur < rawData[i].y) {
            cur = rawData[i].y
        }
    }
    var sizePlus = cur/100*10;
    numb = cur + sizePlus;

    // функция интерполяции значений на ось Х  
    var scaleX = d3.scale.linear()
        .domain([0, numb])
        .range([0, xAxisLength]);
             
    // функция интерполяции значений на ось Y
    var scaleY = d3.scale.linear()
        .domain([numb, 0])
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

}

//функция которая читает значение переменных и записывает из в масив. 

var inputToMass = function () {
    data = [];
    var inpx = $('.x');
    var inpy = $('.y');
    var massx = [];
    var massy = [];
    for (i = 0; i < inpx.length; i++) {
        mass = {};
        x = inpx[i].value;
        x = parseInt(x);
        mass.x = x;
        y = inpy[i].value;
        y = parseInt(y);
        mass.y = y;
        rawData[i] = mass;
    }
    for (i = 0; inpx.length > i; i++) {
        x = inpx[i].value;
        x = parseInt(x);
        massx[i] = x;
        y = inpy[i].value;
        y = parseInt(y);
        massy[i] = y;
    }
}

function readFile(object) {
  var file = object.files[0]
  var reader = new FileReader()
  data = [];
  reader.onload = function() {
    rawData = JSON.parse(reader.result);
  }
  reader.readAsText(file)
  $('svg').remove();
}

$('#file').change(function () {
   readFile($('#file')[0]); 
});

$('.change').change(function () {
    if ($('.change').is(':checked')) {
        $('.fchart').css('display', 'flex');
        $('.chart').hide();
        $('.table').hide();
        $('.addRow').hide();
        $('#file').show();
    }
    else {
        $('.fchart').hide();
        $('#file').hide();
        $('.chart').show();
        $('.table').show();
        $('.addRow').show();
        data = [];
    }
});


//функция построения графика #1

var chart1 = function () {
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

//функция построения графика #2

var chart2 = function () {

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

//функция построения графика #3

var chart3 = function () {
    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);

    var line = d3.svg.line().interpolate("basis")
            .x(function(d){return d.x;})
            .y(function(d){return d.y;});
             
    var area = d3.svg.area().interpolate("basis")
        .x(function(d) { return d.x; })
        .y0(height - margin)
        .y1(function(d) { return d.y; });
     
    var g = svg.append("g");
        g.append("path")
            .attr("d", area(data))
            .style("fill", "lightblue"); //lightblue
        g.append("path")
            .attr("d", line(data))
            .style("stroke", "steelblue") //steelblue
            .style("stroke-width", 2)
            .style("fill","none");
}

var chart4 = function () {
    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);

    var line = d3.svg.line().interpolate("step-after")
        .x(function(d){return d.x;})
        .y(function(d){return d.y;});
             
    var area = d3.svg.area().interpolate("step-after")
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

var chart5 = function () {
    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);

    var line = d3.svg.line().interpolate("linear-closed")
        .x(function(d){return d.x;})
        .y(function(d){return d.y;});
             
    var area = d3.svg.area().interpolate("linear-closed")
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

var chart6 = function () {
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

var chart7 = function () {
    var svg = d3.select("body").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);

    var line = d3.svg.line().interpolate("basis-closed")
        .x(function(d){return d.x;})
        .y(function(d){return d.y;});
             
    var area = d3.svg.area().interpolate("basis-closed")
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

// общая функция которая при нажатии на кнопку вызывает остальные функции

$('.chart1').click(function () {
    $('svg').remove();
    inputToMass();
    osi();
    chart1();
});

$('.chart2').click(function () {
    $('svg').remove();
    inputToMass();
    osi();
    chart2();
});

$('.chart3').click(function () {
    $('svg').remove();
    inputToMass();
    osi();
    chart3();
});

$('.chart4').click(function () {
    $('svg').remove();
    inputToMass();
    osi();
    chart4();
});

$('.chart5').click(function () {
    $('svg').remove();
    inputToMass();
    osi();
    chart5();
});

$('.chart6').click(function () {
    $('svg').remove();
    inputToMass();
    osi();
    chart6();
});

$('.chart7').click(function () {
    $('svg').remove();
    inputToMass();
    osi();
    chart7();
});


//Функци построения графиков по данным из файла

$('.fchart1').click(function () {
    $('svg').remove();
    readFile($('#file')[0]);
    osi();
    chart1();
});

$('.fchart2').click(function () {
    $('svg').remove();
    readFile($('#file')[0]);
    osi();
    chart2();
});

$('.fchart3').click(function () {
    $('svg').remove();
    readFile($('#file')[0]);
    osi();
    chart3();
});

$('.fchart4').click(function () {
    $('svg').remove();
    readFile($('#file')[0]);
    osi();
    chart4();
});

$('.fchart5').click(function () {
    $('svg').remove();
    readFile($('#file')[0]);
    osi();
    chart5();
});

$('.fchart6').click(function () {
    $('svg').remove();
    readFile($('#file')[0]);
    osi();
    chart6();
});

$('.fchart7').click(function () {
    $('svg').remove();
    readFile($('#file')[0]);
    osi();
    chart7();
});






