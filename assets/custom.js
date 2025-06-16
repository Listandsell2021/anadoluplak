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
      document.getElementById('no-result-contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const successMessage = document.getElementById('form-success-message');
        
        // Get form data
        const formData = new FormData(form);
        
        // Add Shopify AJAX form requirements
        formData.append('return_to', window.location.pathname + '?contact_posted=true');
        
        // Submit via AJAX
        fetch('/contact', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            // Show success message
            successMessage.style.display = 'block';
            form.reset();
            
            // Optionally scroll to show the message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Update URL to show success message on refresh
            window.history.replaceState({}, '', window.location.pathname + '?contact_posted=true');
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          alert('An error occurred. Please try again.');
          console.error(error);
        });
      });
  





