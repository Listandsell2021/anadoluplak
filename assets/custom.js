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
  function loadAjaxContent(url, updateHistory = true) {
    const finalUrl = url.includes('view=ajax')
      ? url
      : url.includes('?')
        ? url + '&view=ajax'
        : url + '?view=ajax';

    $.ajax({
      url: finalUrl,
      type: 'GET',
      beforeSend: function () {
        $('#product-grid').html('<li>Loading...</li>');
      },
      success: function (data) {
        const tempDom = $('<div>').append($.parseHTML(data));
        const newGrid = tempDom.find('#product-grid');

        if (newGrid.length) {
          $('#product-grid').html(newGrid.html());

          // Update the URL in browser
          if (updateHistory) {
            const newUrl = finalUrl.replace('&view=ajax', '').replace('?view=ajax', '');
            history.pushState(null, '', newUrl);
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

  // ✅ Handle collection link clicks
  $('.collection-list__link').on('click', function (e) {
    e.preventDefault();
    const handle = $(this).data('handle');
    const url = '/collections/' + handle + window.location.search;

    $('.collection-list__item').removeClass('active');
    $(this).parent().addClass('active');

    loadAjaxContent(url);
  });

  // ✅ Handle pagination link clicks (even if content is dynamically loaded)
  $(document).on('click', '.pagination__item.link, .pagination__item-arrow.link', function (e) {
    e.preventDefault();

    const pageUrl = $(this).attr('href');

    if (!pageUrl) return;

    // Combine with current query parameters
    const currentParams = new URLSearchParams(window.location.search);
    const clickedUrl = new URL(pageUrl, window.location.origin);

    clickedUrl.searchParams.forEach((value, key) => {
      currentParams.set(key, value);
    });

    const finalUrl = clickedUrl.pathname + '?' + currentParams.toString();

    loadAjaxContent(finalUrl, false); // false: don't update history for pagination
  });
});






