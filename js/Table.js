//функция которая читает значение переменных и записывает из в масив. 

var table = function () {
    data = [];
    var inpx = $('.x');
    var inpy = $('.y');
    var massx = [];
    var massy = [];
    for (i = 0; i < inpx.length; i++) {
        mass = {};
        x = inpx[i].value;
        x = Number(x);
        console.log(x)
        mass.x = x;
        y = inpy[i].value;
        y = Number(y);
        mass.y = y;
        rawData[i] = mass;
    }
    for (i = 0; inpx.length > i; i++) {
        x = inpx[i].value;
        x = Number(x);
        massx[i] = x;
        y = inpy[i].value;
        y = Number(y);
        massy[i] = y;
    }
}
