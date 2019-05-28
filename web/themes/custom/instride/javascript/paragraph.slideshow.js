/**
 * @file
 * Extends the Drupal AJAX functionality to integrate the dialog API.
 */

(($, Drupal) => {
  Drupal.behaviors.slideShow = {
    attach() {
      $(".paragraph-slideshow").slick({
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  };
})(jQuery, Drupal);
