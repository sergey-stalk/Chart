$('.btnOpen').click(function () {
    $('.btns').slideToggle();
    if ($('.btnOpen').html() == 'Close') {
        $('.btnOpen').html('Open');
    }
    else {
        $('.btnOpen').html('Close');
    }
});