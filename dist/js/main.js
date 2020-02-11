$(document).ready(function () {
    var sliderProducts = new Swiper('.js-slider-products', {
        navigation: {
            nextEl: '.js-slider-products-next',
            prevEl: '.js-slider-products-prev',
        },
        speed: 700
    });

    $('.n-file').on('click', function () {
        $(this).find('input')[0].click();
    });

    document.querySelectorAll('[data-phone]').forEach(function (el) {
        IMask(el, {
            mask: '+{7}(000)000-00-00'
        })
    });

    $('.n-popup').on('click', closePopup)
    $('.n-popup__content').on('click', function(e) {
        e.stopPropagation();
    });
    function closePopup(e) {
        e.stopPropagation();
        $('.n-popup').hide();
    }

    $('.js-close-popup').on('click', closePopup);

    $('.js-open-popup').on('click', function(e) {
        e.preventDefault();

        var popupType = $(this).attr('data-popup-type');

        $('.n-popup--'+popupType).css({
            display: 'flex'
        });
    });

    $('.js-form-success').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.n-popup__content').hide().siblings().show();
    });
})