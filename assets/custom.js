document.addEventListener("DOMContentLoaded", function () {
  $('.grid-slick').slick({
    speed: 30000, // Even slower transition
    autoplay: true,
    autoplaySpeed: 0,
    centerMode: true,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 1,
    arrows: false,
    buttons: false
  });
});