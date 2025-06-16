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
          settings: { slidesToShow: 2 }
        }
      ]
    });
  });


window.addEventListener('load', function () {
    const loader = document.querySelector('.loader, .loading, .preloader, #loader');
    if (loader) loader.style.display = 'none';
});

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("no-result-contact-form");
    const successMsg = document.getElementById("form-success-message");

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("/contact", {
          method: "POST",
          body: formData,
        })
        .then(response => {
          if (response.ok) {
            form.style.display = "none";
            successMsg.style.display = "block";
          } else {
            alert("Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.");
          }
        })
        .catch(error => {
          console.error("Fehler beim Senden:", error);
          alert("Es gab ein Problem beim Senden.");
        });
      });
    }
  });




