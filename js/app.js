import './graphql/articles';
import './graphql/login';

/* global $ */

$(document).ready(function() {
    let menu = $('nav > ul'),
        link = $('#mobileMenu');
    
    link.on('click', function() {
        if (menu.hasClass('closed')) {
            menu.removeClass('closed');
            menu.addClass('open');
        } else {
            menu.removeClass('open');
            menu.addClass('closed');
        }
    });
});

// flipping gallery plug in code
$(".gallery").flipping_gallery({
    direction: "forward",
    selector: "> a",
    spacing: 15,
    showMaximum: 10,
    enableScroll: true,
    flipDirection: "bottom",
    autoplay: false
});