
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});


$(document).ready(function() {


    dinamicMenu();
    customTooltip();

                // chat

                //chat




                $('ol li').each(function() {
                    var index = $(this).index();
                    $(this).append('<text>' + ++index + '.</text>');
                });

                $('[data-toggle="tooltip"]').tooltip();

                $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function() {
                    if ($(window).width() < 1024) {
                        $('.tooltip-inner').append("<button class='hide-tooltip'>+</button>");
                    }
                });

                $('.hide-tooltip').on('click', function() {
                    $('[data-toggle="tooltip"]').tooltip('hide');
                });

                $(".show-btn").click(function() {
                    $(this).toggleClass("hide-btn");
                    $('.wrap-english-content').toggleClass("wrap-english-content-open");
                });

                $('.wrap-table-colapse').on("scroll", function() {
                    $('[data-toggle="tooltip"]').tooltip('hide');
                });

                // produckt();
                foorterHeight();

                $(".cursor-pointer>span").on('mouseover', function() {
                    $('.text-change').text('Soddisfatto...');
                });
                $(".cursor-pointer>span").on('mouseleave', function() {
                    $('.text-change').text('Cosa ne pensi ?');
                });

                var heightShare = $('.footer').height();
                $('#shareAffix').affix({
                    offset: {
                        bottom: heightShare - 20
                    }
                });

                $('.one-slide > h2').on('click', function() {
                    var elementDrop = $(this).closest('.one-slide');
                    if (elementDrop.hasClass('active')) {
                        elementDrop.removeClass('active');
                    } else {
                        elementDrop.addClass('active');
                    }
                });

                $(".bx-next").addClass('active');
                $(".bx-controls-direction > a").on('click', function() {
                    $(this).parent().find('a').removeClass('active');
                    $(this).addClass('active');
                });

                if ($('.bxslider').length) {
                    bx_slider();
                }
    if ($(".fancybox-button").size() > 0) {
        $(".fancybox-button").fancybox({

            groupAttr: 'data-rel',
            prevEffect: true,
            nextEffect: true,
            fitToView: false,
            beforeShow: function () {
                this.width = $(window).width() * 0.8;
                this.height = $(window).width() * 0.6;
            },
            closeBtn: true,
            helpers: {
                title: {
                    type: 'inside'
                }
            }
        });
    }
    /*/$('.bxslider').show();
    if ($(window).width() <= 550) {
        $('.slider').bxSlider({
            pager: false,
            maxSlides: 1,
            moveSliders:1,
            slideWidth:300
        });
    } else */
    if ($(window).width() <= 767) {
        $('.slider').bxSlider({
            pager: false,
            maxSlides: 1
        });
    } else if ($(window).width() <= 1024) {
        $('.slider').bxSlider({
            minSlides: 2,
            maxSlides: 2,
            slideWidth: 250,
            slideMargin: 7,
            moveSlides: 1,
            pager: false
        });

    } else {
        $('.slider').bxSlider({
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 220,
            slideMargin: 7,
            moveSlides: 1,
            pager: false,
            controls:true
        });
    }

    $('.blogslider').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 280,
        slideMargin: 20,
        moveSlides: 1,
        pager: false
    });

    $('.open-btn').on('click', function(){
        $(this).css('display', 'none');
        $('.close-btn').css('display', 'block');
        $('.main-menu-item').slideDown();

    });
    $('.close-btn').on('click', function(){
        $(this).css('display', 'none');
        $('.open-btn').css('display', 'block');
        $('.main-menu-item').slideUp();
    });



});
$(window).resize(function() {
    dinamicMenu();
    customTooltip();
    foorterHeight();
    if ($('.bxslider').length) {
        bx_slider();
    }
});

function customTooltip() {
    $('[data-target="tooltip"]').hover(
        function() {
            $(this).closest('body').find('.tooltip-custom').remove();

            var elTitle = $(this).data('title'),
            elPosition = $(this).data('position'),
            elDescription = $(this).data('description'),
            elHeight = $(this).height(),
            elWidth = $(this).width(),
            innerItemLeft = $(this).offset().left,
            innerItemTop = $(this).offset().top,
                            /*tooltipPosition = {
                                "top": 0,
                                "left": 0
                            },*/
                            arrowPosition = {
                                "left": 0
                            };

                        //Adding a tooltip layout
                        $(this).closest('body').append(
                            '<div class="tooltip-custom ' + elPosition + '">' +
                            '<div class="tooltip-custom-arrow"></div>' +
                            '<div class="tooltip-custom-body">' +
                            '<div class="tooltip-close"></div>' +
                            '<h4>' + elTitle + '</h4>' +
                            '<p>' + elDescription + '</p>' +
                            '</div>' +
                            '</div>'
                            );

                        // Center tooltip
                        var elTooltip = $('.tooltip-custom'),
                        halfTooltip = elTooltip.width() / 2;

                        // I pass variables to the function (indentationCheck).
                        var cssObj = indentationCheck(innerItemLeft, innerItemTop, arrowPosition, halfTooltip, elHeight, elWidth);

                        //I find the tooltip and arrow and apply the position to them
                        elTooltip.offset({
                            top: cssObj.innerItemTop,
                            left: cssObj.innerItemLeft
                        });
                        elTooltip.find('.tooltip-custom-arrow').css(cssObj.arrowPosition);

                    },
                    function() {
                        $(this).closest('body').find('.tooltip-custom').remove();
                    });
}

function indentationCheck(innerItemLeft, innerItemTop, arrowPosition, halfTooltip, elHeight, elWidth) {
    var halfEl = elWidth / 2,
    offsetTooltip = (elWidth / 2) + innerItemLeft + halfTooltip,
    tooltipOffsetRight = $(window).width() - offsetTooltip;

                if (tooltipOffsetRight <= 0) { // checking tooltip is it right
                    tooltipOffsetRight = tooltipOffsetRight * -1;

                    // position tooltip top and right
                    innerItemTop = innerItemTop + elHeight + 8; // 8 - высота стрелочки на тултипе
                    innerItemLeft = offsetTooltip - halfTooltip * 2 - tooltipOffsetRight - 15;

                    // position top arrow
                    arrowPosition.left = halfTooltip + tooltipOffsetRight + 8; //  8 - половина ширины стрелочки

                } else if (innerItemLeft <= halfTooltip) { //Проверка уходит ли тултип за границы екрана слева

                    // I learn how far the tooltip goes beyond the boundaries of the screen
                    var elWidthDifference = innerItemLeft - halfTooltip;

                    //I position the tooltip with respect to the top and left edges
                    innerItemTop = innerItemTop + elHeight + 8; // 8 - высота стрелочки на тултипе
                    innerItemLeft = innerItemLeft - halfTooltip + halfEl - elWidthDifference;

                    //I position the arrow from the top
                    arrowPosition.left = halfTooltip + elWidthDifference - 8; // 8 - половина ширины стрелочки

                } else {
                    //Default showing
                    innerItemTop = innerItemTop + elHeight + 8;
                    innerItemLeft = innerItemLeft - halfTooltip + halfEl;

                    arrowPosition.left = halfTooltip - 8; // 8 - половина ширины стрелочки
                }

                var cssObj = {
                    'innerItemTop': innerItemTop,
                    'innerItemLeft': innerItemLeft,
                    'arrowPosition': arrowPosition
                };

                return cssObj;
            }

            // function dinamicMenu() {
            //     var target = $('.menu-nav > li'),
            //     value = 100 / (target.length - 1),
            //     windowCenter = $(window).width() / 2;

            //     if ($(window).width() > 1023) {
            //         target.css('width', value + '%');
            //         target.each(function() {
            //             var innerLeft = $(this).offset().left + 150;
            //             if (windowCenter >= innerLeft) {
            //                 var cssValLeft = {
            //                     "right": "auto",
            //                     "left": "3px"
            //                 };
            //                 $(this).find('.dropdown-menu').css(cssValLeft);
            //             } else {
            //                 var cssValRight = {
            //                     "right": "3px",
            //                     "left": "auto"
            //                 };
            //                 $(this).find('.dropdown-menu').css(cssValRight);
            //             }
            //         });
            //     }
            //     else {
            //         target.css('width', '100%');
            //     }
            // }
            function dinamicMenu() {

                var target = $('.menu-nav > li'),
                value = 100 / (target.length - 1),
                windowCenter = (window.innerWidth || $(window).width()) / 2;

                var menu_nav_width = ($('.menu-nav').width());

                if ((window.innerWidth || $(window).width()) > 1023) {

                    target.css('width', value + '%');
                    target.on('click', function() {

                        var innerLeft = $(this).offset().left + 150,
                        posMenuItem = $(this).position().left,
                        widthMenu = $(this).parent().width(),
                        widthDropMenu = $(this).find('.dropdown-menu').width(),
                        differenceValues = Math.round(widthMenu - (posMenuItem + widthDropMenu));

                        if (windowCenter >= innerLeft) {

                            if (differenceValues <= 0) {
                                $(this).find('.dropdown-menu').css({
                                    "right": "auto",
                                    "left": differenceValues
                                });
                            } else {
                                $(this).find('.dropdown-menu').css({
                                    "right": "auto",
                                    "left": "3px",
                                });
                            }
                        } else {

                            if (differenceValues <= 0 && differenceValues > -838) {
                                $(this).find('.dropdown-menu').css({
                                    "left": differenceValues,
                                    "right": "auto"
                                });
                            } else {
                                $(this).find('.dropdown-menu').css({
                                    "right": "3px",
                                    "left": "auto"
                                });
                            }
                        }
                    });
                } else {
                    target.css('width', '100%');
                }
            }



            var popupAlert = 0,
            popupAlertTimeout = 6000;

            function popupAlertOpen(id) {
                var new_id = 'popupalertclone' + popupAlert;
                $(id).clone(false).attr('id', new_id).appendTo('#popupalerts').slideDown();
                setTimeout(function(new_id) {
                    $('#' + new_id).slideUp(function() {
                        $(this).remove();
                    });
                }, popupAlertTimeout, new_id);
                popupAlert++;
            }

            $(function() {
                $('body').on('click', '.popup-alert .pa-close', function() {
                    $(this).parents('.popup-alert').slideUp(function() {
                        $(this).remove();
                    });
                    return false;
                });
                $('body').on('click', '.show_popup_alert', function() {
                    popupAlertOpen($(this).attr('href'));
                    return false;
                });
            });

            function foorterHeight() {
                var height = $('.footer').height();
                $('.footer').css('margin-top', -height);
                $('.content').css('padding-bottom', height);

                $('.affix-menu').data('offset-bottom', height + 100);
            }

            function ww() {
                var ww = $(window).width();
                if (ww < 550) {
                    $('.navbar-collapse').addClass('in');
                } else {
                    $('.navbar-collapse').removeClass('in');
                }
            }

            // function produckt() {
            //     $('.group-button > li > button').on('click', function() {
            //         var element = $(this).parent();
            //         var indexElement = $(this).parent().index();
            //         var toggleElement = $(this).closest('.accordion-tab-block').find('.group-contents > li');

            //         toggleElement.slideUp('fast', function() {
            //             $(this).parent().removeClass('open');
            //         });
            //         if (element.hasClass('open')) {
            //             toggleElement.eq(indexElement).slideUp('fast', function() {
            //                 element.removeClass('open');
            //             });
            //         } else {
            //             toggleElement.eq(indexElement).slideDown('fast', function() {
            //                 element.addClass('open');
            //             });
            //         }
            //     });
            // }

            function bx_slider() {
                if ($(window).width() <= 550) {
                    $('.bxslider').bxSlider({
                        pager: false,
                        maxSlides: 1
                    });
                } else if ($(window).width() <= 767) {
                    $('.bxslider').bxSlider({
                        minSlides: 3,
                        maxSlides: 3,
                        slideWidth: 250,
                        slideMargin: 7,
                        moveSlides: 1,
                        pager: false
                    });
                } else if ($(window).width() <= 900) {
                    $('.bxslider').bxSlider({
                        minSlides: 4,
                        maxSlides: 4,
                        slideWidth: 220,
                        slideMargin: 7,
                        moveSlides: 1,
                        pager: false
                    });

                } else {
                    $('.bxslider').bxSlider({
                        minSlides: 4,
                        maxSlides: 4,
                        slideWidth: 220,
                        slideMargin: 7,
                        moveSlides: 1,
                        pager: false,
                        controls:false
                    });
                }
            }

$(document).ready(function() {
  $('#bs-example-navbar-collapse-1 ul.navbar-nav li.dropdown').mouseover(function() {
    $('#bs-example-navbar-collapse-1 ul.navbar-nav li.dropdown ul.dropdown-menu').css('display', 'block');
  }).mouseleave(function() {
    $('#bs-example-navbar-collapse-1 ul.navbar-nav li.dropdown ul.dropdown-menu').css('display', 'none');
  });

  $('.sr-only').click(function() {
    $(this).css('display', 'none');
    $('.navbar-toggle .close').css('display', 'block');
  })

    $('.play-control').on('click', function(){
        $(this).css('display', 'none');
        $('.pause-control').css('display', 'block');
        $(this).parent().find('video').get(0).play();
    });
    $('.pause-control').on('click', function(){
        $(this).css('display', 'none');
        $('.play-control').css('display', 'block');
        $(this).parent().find('video').get(0).pause();
    });

    $('.scroll-down').on('click', function(event){

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash


        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $('#section-gallery').offset().top
        }, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = $('#section-gallery');
        });

    });
});