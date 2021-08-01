!(function () {
  "use strict";
  // Navbar
  const nav = document.querySelector('.nav');
  const navItems = document.querySelector(".nav__list");
  const navBurger = document.querySelector('.js-nav-burger')
  const navOverlay = document.querySelector('.nav__overlay')
  const hero = document.querySelector(".hero");

  // Display nav bg on scroll  
  window.onscroll = function () {
      // if (document.body.scrollTop >= hero.offsetHeight - 40) {
        nav.classList.add("nav-colored");
      // } 
      if (document.body.scrollTop === 0 && !navOverlay.classList.contains('active')) {
        nav.classList.remove("nav-colored")
      }
    }

  // Toggle burger menu 
  navBurger.addEventListener('click', e => {
    navItems.classList.toggle('d-flex')
    navOverlay.classList.toggle('active')
    nav.classList.add("nav-colored");
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

  // Open hero video in modal
  MediaBox(".mediabox");

  // Attach newsletter form submission handler
  window.addEventListener("load", function () {
    document
      .querySelector(".contact-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        submitNewsletterForm();
      });
  });

  // Send Mail
  function submitNewsletterForm() {
    var emailAddr = document.getElementById("email").value;
    var errorMsg = document.querySelector(".contact-form-error");
    var successMsg = document.querySelector(".contact-form-success");
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
        errorMsg.classList.remove("d-block");
        successMsg.classList.add("d-block");
        submitBtn.disabled = true;
        emailInput.disabled = true;
      } else {
        errorMsg.innerHTML = res.errors.email
          ? res.errors.email
          : "There was an unexpected failure";
        successMsg.classList.remove("d-block");
        errorMsg.classList.add("d-block");
      }
    };

    xhttp.onError = function () {
      errorMsg.innerHTML = "There was an issue submitting the form";
      successMsg.classList.remove("d-block");
      errorMsg.classList.add("d-block");
    };
  }
})();
