$(function () {

    $('.seat').hover(
        function () {
            $(this).children('p').css('display', 'none');
        },
        function () {
            $(this).children('p').css('display', 'block');
        });

    let reservedSeats = [];
    $('.places-row__seat').click(function () {
        if ($(this).hasClass('seat')){
            $(this).css('background', 'rgba(255, 255, 0, 0.75)').removeClass('seat').addClass('seat_reserved').html($(this).children('p').html());
            reservedSeats.push($(this).attr('id'));
            $('.basket__ticket-count').html($('.basket-tickets').children('div').length+1).css('display', 'block');
            $('.basket').css('background-color', 'rgba(255, 255, 0, 0.75)');
            let basketElemId = reservedSeats[reservedSeats.length-1];
            basketElemId = basketElemId.split('-');
            let basketElem = "" +
                "<div class='basket-ticket col-md-3 seat-"+basketElemId[1]+'-'+basketElemId[2]+"'>" +
                "<p class='basket-ticket__txt'>Ряд: " + basketElemId[1]+"</p>"+
                "<p class='basket-ticket__txt'>Место: " + basketElemId[2]+"</p>"+
                "<div class='basket-ticket__remove'><img src='images/close.png' alt=''></div>"+
                "</div>";
            $('.basket-tickets').append(basketElem);
        }else{
            return;
        }

    });

    $('.basket').click(function () {
        if ($('.basket-tickets').children('div').length > 0){
            $('.basket-tickets').css('display', 'flex');
        }

    });

    $('.basket-tickets').on('click', '.basket-ticket__remove', function () {

        let basketItemClassNames = $(this).parent('.basket-ticket').attr('class');
        basketItemClassNames = basketItemClassNames.split(' ');
        let basketItemClassName = basketItemClassNames[basketItemClassNames.length - 1];
        let basketItemClassNameArr = basketItemClassName.split('-');
        $('#'+basketItemClassName).removeAttr('style').removeClass('seat_reserved').addClass('seat').html("<p>"+basketItemClassNameArr[basketItemClassNameArr.length-1]+"</p>");
        $('.basket__ticket-count').html($('.basket__ticket-count').html() - 1);
        $(this).parent('.basket-ticket').remove();
        if ($('.basket-tickets').children('div').length == 0){
            $('.basket-tickets').css('display', 'none');
            $('.basket__ticket-count').css('display', 'none');
            $('.basket').removeAttr('style');
        }
    });

    $('.seat_sold').html("");

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $('.places-row__row').each(function () {
        let rowNumber = $(this).children('.places-row__number').eq(0).html();
        let rowSeats = $(this).children('.places-row__seats').children('.places-row__seat');
        for (let i = 0; i < rowSeats.length; i++){
            $(rowSeats[i]).attr('id', 'seat-'+rowNumber+'-'+(i+1));
        }
    });

    let soldNumber = getRandomInRange(0, 800);
    let i = 0;
    let soldIndexes = [];
    while (i < soldNumber){
        let soldIndex = getRandomInRange(0, 799);
        soldIndexes.push(soldIndex);
        i++;
    }

    let seats = $('.places-row__seat');
    for (let i = 0; i < soldIndexes.length; i++){
        $(seats[soldIndexes[i]]).removeClass('seat').addClass('seat_sold').html("");
    }

    $('.buy-btn').click(function () {
        let numberOfTicketsToBuy = $('.basket-tickets').children('.basket-ticket').length;
        for (let i = 0; i < numberOfTicketsToBuy; i++){
            let basketItemClassNames = $('.basket-tickets').children('.basket-ticket').eq(i).attr('class');
            basketItemClassNames = basketItemClassNames.split(' ');
            let basketItemClassName = basketItemClassNames[basketItemClassNames.length - 1];
            $('#'+basketItemClassName).removeAttr('style').removeClass('seat_reserved').addClass('seat_sold sold-to-you').html("");
        }
        $('.basket-tickets').css('display', 'none');
        $('.basket-tickets').children('.basket-ticket').remove();
        $('.basket__ticket-count').html("").css('display', 'none');
        $('.basket').removeAttr('style');

    });
});




