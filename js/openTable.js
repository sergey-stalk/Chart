$('.openTable').click(function () {  
    $('.tableWrapper').slideToggle();
    if ($('.openTable').html() == 'Close') {
        $('.openTable').html('Open');
    }
    else {
        $('.openTable').html('Close');
    }
});