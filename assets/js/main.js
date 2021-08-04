"use strict";
// Navbar
var nav = document.querySelector('.nav');
var navItems = document.querySelector(".nav__list");
var navBurger = document.querySelector('.js-nav-burger')
var navOverlay = document.querySelector('.nav__overlay')

// Unless we're at the top of page, use the sticky nav
function switchToStickyNav() {
  nav.classList.add("nav__colored");
  if (window.scrollY === 0 && !navOverlay.classList.contains('active')) { 
    nav.classList.remove("nav__colored")
  }
}
window.onscroll = function () {
  switchToStickyNav()
}
window.onload = function () {
  switchToStickyNav()
}

// Toggle burger menu 
navBurger.addEventListener('click', function(e) {
  navItems.classList.toggle('d_flex')
  navOverlay.classList.toggle('active')
  nav.classList.add("nav__colored");
})

// Carousel config
var swiper = new Swiper(".clientSwiper", {
  spaceBetween: 15,
  slidesPerView: "auto",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Send Mail
function submitNewsletterForm() {
  var emailAddr = document.getElementById("email").value;
  var errorMsg = document.querySelector(".signup__form_error");
  var successMsg = document.querySelector(".signup__form_success");
  var submitBtn = document.getElementById("newsletterSubmit");
  var emailInput = document.getElementById("email");
  var xhttp = new XMLHttpRequest();

  xhttp.open(
    "POST",
    "https://frontend-trial-api.qa.parallax.dev/api/newsletter",
    true
  );

  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.send(
    JSON.stringify({
      email: emailAddr,
    })
  );

  xhttp.onload = function () {
    var res = JSON.parse(this.responseText);
    if (res.success) {
      successMsg.innerHTML = "Thanks for signing up!";
      errorMsg.classList.remove("d_block");
      successMsg.classList.add("d_block");
      submitBtn.disabled = true;
      emailInput.disabled = true;
    } else {
      errorMsg.innerHTML = res.errors.email
        ? res.errors.email
        : "There was an unexpected failure";
      successMsg.classList.remove("d_block");
      errorMsg.classList.add("d_block");
    }
  };

  xhttp.onerror = function (e) {
    console.log(e.target.status);
    errorMsg.innerHTML = "There was an issue submitting the form (check that the API is up!)";
    successMsg.classList.remove("d_block");
    errorMsg.classList.add("d_block");
  };
}

// Attach newsletter form submission handler
window.addEventListener("load", function () {
  document
    .querySelector(".signup__form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      submitNewsletterForm();
    });

  // Open hero video in modal
  MediaBox(".mediabox");
});

