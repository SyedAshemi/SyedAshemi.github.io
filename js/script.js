(function ($) {

  "use strict";

  // ------------------------------------------------------------------------------ //
  // Overlay Menu Navigation
  // ------------------------------------------------------------------------------ //
  var overlayMenu = function () {

      if (!$('.nav-overlay').length) {
          return false;
      }

      var body = undefined;
      var menu = undefined;
      var menuItems = undefined;
      var init = function init() {
          body = document.querySelector('body');
          menu = document.querySelector('.menu-btn');
          menuItems = document.querySelectorAll('.nav__list-item');
          applyListeners();
      };
      var applyListeners = function applyListeners() {
          menu.addEventListener('click', function () {
              return toggleClass(body, 'nav-active');
          });
      };
      var toggleClass = function toggleClass(element, stringClass) {
          if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
      };
      init();
  }



  // Animate Texts
  var initTextFx = function () {
      $('.txt-fx').each(function () {
          var newstr = '';
          var count = 0;
          var delay = 100;
          var stagger = 10;
          var words = this.textContent.split(/\s/);
          var arrWords = new Array();

          $.each(words, function (key, value) {
              newstr = '<span class="word">';

              for (var i = 0, l = value.length; i < l; i++) {
                  newstr += "<span class='letter' style='transition-delay:" + (delay + stagger * count) + "ms;'>"+ value[i] + "</span>";
                  count++;
              }
              newstr += '</span>';

              arrWords.push(newstr);
              count++;
          });

          this.innerHTML = arrWords.join("<span class='letter' style='transition-delay:" + delay + "ms;'>&nbsp;</span>");
      });
  }

  // init Isotope
  var initIsotope = function () {

      $('.grid').each(function () {

          // $('.grid').imagesLoaded( function() {
          // images have loaded
          var $buttonGroup = $('.button-group');
          var $checked = $buttonGroup.find('.is-checked');
          var filterValue = $checked.attr('data-filter');

          var $grid = $('.grid').isotope({
              itemSelector: '.portfolio-item',
              // layoutMode: 'fitRows',
              filter: filterValue
          });

          // bind filter button click
          $('.button-group').on('click', 'a', function (e) {
              e.preventDefault();
              filterValue = $(this).attr('data-filter');
              $grid.isotope({ filter: filterValue });
          });

          // change is-checked class on buttons
          $('.button-group').each(function (i, buttonGroup) {
              $buttonGroup.on('click', 'a', function () {
                  $buttonGroup.find('.is-checked').removeClass('is-checked');
                  $(this).addClass('is-checked');
              });
          });
          // });

      });
  }

  // init Chocolat light box
  var initChocolat = function () {
      Chocolat(document.querySelectorAll('.image-link'), {
          imageSize: 'contain',
          loop: true,
      })
  }
  

  $(document).ready(function () {

    var swiper = new Swiper(".portfolio-Swiper", {
        slidesPerView: 1,                        // Default 1 slide per view for mobile
        spaceBetween: 30,                        // Space between slides
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            300: {
                slidesPerView: 1,                // 1 slide per view on very small devices
                spaceBetween: 10,                // Smaller space between slides on small screens
            },
            576: {
                slidesPerView: 2,                // 2 slides per view on small devices
                spaceBetween: 15,                // More space between slides on small screens
            },
            768: {
                slidesPerView: 2,                // 2 slides per view on tablets
                spaceBetween: 20,                // More space between slides on tablets
            },
            1024: {
                slidesPerView: 2,                // 2 slides per view on large screens (half desktop mode)
                spaceBetween: 30,                // Space between slides
            },
            1200: {
                slidesPerView: 2,                // 2 slides per view on full desktop mode
                spaceBetween: 30,                // Space between slides on larger screens
            },
        },
    });
    
    
    
      overlayMenu();
      initTextFx();
      initChocolat();

      // mobile menu
      $('.menu-btn').click(function (e) {
          e.preventDefault();
          $('body').toggleClass('nav-active');
      });

      AOS.init({
          duration: 1200,
          // once: true,
      })

      // Handling form submission with success message
    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault();
        var form = this;
        fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { "Accept": "application/json" }
        }).then(response => {
          if (response.ok) {
            // Show the success message and hide the form
            document.getElementById("success-message").style.display = "block";
            form.reset(); // Reset the form
          } else {
            // Show an error message if something goes wrong
            alert("Oops! Something went wrong.");
          }
        });
    });

  });
    


  // window load
  $(window).load(function () {
      $(".preloader").fadeOut("slow");
      initIsotope();
  })


})(jQuery);
