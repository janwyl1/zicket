'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($nav) {
    console.log("click:", $nav);
    var $navBurger = $nav.querySelector('.js-nav-burger');
    if ($navBurger) {
        $navBurger.addEventListener('click', function (e) {
            $nav.classList.toggle('d-flex');
        });
    }
};