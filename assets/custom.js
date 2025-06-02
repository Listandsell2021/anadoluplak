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
$(document).ready(function () {
  function loadCollectionContent(url, updateHistory = true) {
    $.ajax({
      url: url.includes('?') ? url + '&view=ajax' : url + '?view=ajax',
      type: 'GET',
      beforeSend: function () {
        $('#product-grid').html('<li>Loading...</li>');
      },
      success: function (data) {
        const tempDom = $('<div>').append($.parseHTML(data));
        const newContent = tempDom.find('#product-grid').html();

        if (newContent) {
          $('#product-grid').html(newContent);
          if (updateHistory) {
            const cleanUrl = url.split('?')[0];
            history.pushState(null, '', cleanUrl);
          }
        } else {
          $('#product-grid').html('<li>No products found.</li>');
        }
      },
      error: function () {
        $('#product-grid').html('<li>Error loading products.</li>');
      }
    });
  }

  // ✅ Collection links (sidebar)
  $('.collection-list__link').on('click', function (e) {
    e.preventDefault();
    const handle = $(this).data('handle');
    const url = '/collections/' + handle;

    $('.collection-list__item').removeClass('active');
    $(this).parent().addClass('active');

    loadCollectionContent(url);
  });

  // ✅ Pagination links (inside #product-grid)
  $(document).on('click', '.pagination__item.link, .pagination__item-arrow.link', function (e) {
    e.preventDefault();
    const url = $(this).attr('href');
    if (url) loadCollectionContent(url, false); // Don't push history for pagination
  });
});





