document.addEventListener("DOMContentLoaded", function () {
  // $('.grid-slick').slick({
  //   speed: 30000, // Even slower transition
  //   autoplay: true,
  //   autoplaySpeed: 0,
  //   centerMode: true,
  //   cssEase: 'linear',
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: true,
  //   initialSlide: 1,
  //   arrows: false,
  //   buttons: false
  // });
    $('.bestsellers-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3 }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: 1 }
        }
      ]
    });
  });
$(document).ready(function() {
  $('.collection-list__link').on('click', function(e) {
    e.preventDefault();

    var handle = $(this).data('handle');
    var url = '/collections/' + handle + '?view=ajax';

    $('.collection-list__item').removeClass('active');
    $(this).parent().addClass('active');

    $.ajax({
      url: url,
      type: 'GET',
      beforeSend: function() {
        $('#product-grid').html('<li>Loading...</li>');
      },
      success: function(data) {
        // Create a temporary DOM element to extract #product-grid
        var tempDom = $('<div>').append($.parseHTML(data));
        var newContent = tempDom.find('#product-grid').html();

        if (newContent) {
          $('#product-grid').html(newContent);
        } else {
          $('#product-grid').html('<li>No products found.</li>');
        }

        // Update URL without reloading the page
        history.pushState(null, '', '/collections/' + handle);
      },
      error: function() {
        $('#product-grid').html('<li>Error loading products.</li>');
      }
    });
  });
});




