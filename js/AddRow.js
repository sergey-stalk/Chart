function AddRow () {
    var ind = $('tr:last').index();
    $('.hide').clone().appendTo('table').addClass('row').removeClass('hide');
    $('tr:last>td:nth-child(2)>input').addClass('x');
    $('tr:last>td:nth-child(3)>input').addClass('y');
    $('tr:last>td:first').text(ind);
};

$('.addRow').on('click', AddRow);