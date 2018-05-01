
var rawData = [],
    height = $(window).height()/1.10, 
    width = $(window).width(), 
    margin=50,
    data=[],
    padding = 2,
    numbX,
    numbY,
    x, y,
    mass = {},
    info,
    radio = $('.radio');




var init = function (numbOfFun) {
    data = [];
    $('body').css('background', '#fff');
    $('svg').remove();
    
    if ($('.openTable').html() == 'Open') {
        readFile($('#file')[0]);
    }
    else {
        table();
    }
    
    switch (numbOfFun) {
        case 1:
            chart1();
            break;
        case 2:
            chart2();
            break;
        case 3:
            chart3();
            break;
        case 4:
            chart4();
            break;
        case 5:
            chart5();
            break;
        case 6:
            chart6();
            break;
        case 7:
            chart7();
            break;
        case 8:
            chart8();
            break;
        case 9:
            mainAxis();
            break;
    }

    console.log(rawData);

    $('.dot').appendTo($('.axis:eq(1)'));
}

$('.chart').click(function (){
    var numbOfFun = $(this).index()+1;
    init(numbOfFun);
});
