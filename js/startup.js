/*! Solo v1.0.0 - Responsive single page theme built on Bootstrap 3.2.0
 *  Copyright 2014 Railslauncher<railslauncher@gmail.com>
 */

$(document).ready(function() {
	// Scrolls to the given selector. The selector can be any valid jQuery selector.
	// Usage: scrollToTarget('#home')
  var scrollToTarget = function(selector) {
    var currentScroll = $(selector).offset().top - $('.navbar-solo').height()+1;

    $('html, body').animate({scrollTop: currentScroll}, 1000);
  };

  // Submits the form to the given path
  var submitForm = function(path, form) {
    // Show loader on sending request
    var loader = $('.loader');
    loader.show();

    // POST contact data to contactPath.
    // On success:
    // 	Show success modal
    //
    // On failure:
    // 	Show failure modal
    //
    // On complete:
    //  Hide Loader
    $.post(path, form.serialize())
      .done(function() {
        $('#success-response').modal('show');
      })
      .fail(function() {
        $('#success-response').modal('show');
        // For demo purpose always success dialog is shown. In live mode comment the above line
        // and uncomment the below line.
        // $('#failure-response').modal('show');
      })
      .always(function() {
        // Reset form
        form.find("input[type='text'], input[type='email'],textarea").val('');
        // Hide loader
        loader.hide();
      });
  };

  setTimeout(function() {
    // Freelancer animation
    $('.hero-snap > img').addClass('animated fadeInRight').removeClass('invisible');
    $('.hero-description').addClass('animated fadeInLeft').removeClass('invisible');
  }, 2000);

  // Collapse nav links on mobile before scrolling to the target.
  $('.nav.navbar-nav a, .navbar-brand').on('click', function(event) {
    event.preventDefault();

    var navbarCollapse =  $('.navbar-solo-collapse');
    var link = $(this);
    var target = link.attr('href');

    if(navbarCollapse.hasClass('in')) {
      navbarCollapse.collapse('hide');

      setTimeout(function() {
        scrollToTarget(target);
      }, 400);
    } else {
      scrollToTarget(target);
    }
  });

  // Hover animation for portfolio item.
  $('.mix').hover(
    function () {
      var mix = $(this);
      var projectHover = mix.find('.project-hover');

      projectHover.show().removeClass('animated zoomOut').addClass('animated zoomIn');
    },

    function () {
      var mix = $(this);
      var projectHover = mix.find('.project-hover');

      if($('html').hasClass('no-csstransitions')) {
        // Fallback for IE9
        projectHover.hide();
      } else {
        projectHover.removeClass('animated zoomIn').addClass('animated zoomOut');
      }
    }
  );

  // Social icons hover animations
  $('.social-icons i').hover(
    function() {
      var icon = $(this);
      icon.addClass('animated rotateIn');
    },
    function() {
      var icon = $(this);
      icon.removeClass('animated rotateIn');
    }
  );

  // Portfolio filtering animation
  var grid = $('#grid');
  grid.shuffle({
    itemSelector: '.mix',
    speed: 500
  });

  $('.project-filter .btn').on('click', function() {
    var button = $(this);
 
    if(!button.hasClass('active')) {
      button.parent().find('.active').removeClass('active');
      grid.shuffle('shuffle', button.data('group'));
      button.addClass('active');
    }
  });

  // Initialize carousel
  $('.carousel').carousel();

	// Handle contact me request
  var form = $('#contact-me-form');
  form.validate({
    submitHandler: function() {
      submitForm(form.attr('action'), form);
    }
  }); 

  // Initiate WOW.js
  new WOW({ mobile: false }).init();

  // Modal open and close animation.
  // Zoom in modal on open
  // Zoom out modal on close
  var modals = $('.modal');
  var closeButtons = modals.find('.close');

  modals.on('show.bs.modal', function() {
    var projectModal = $(this);

    projectModal.css({'overflow-y' : 'hidden'});
    projectModal.removeClass('animated zoomOut').addClass('animated zoomIn');
    setTimeout(function() {
      projectModal.css({'overflow-y' : 'scroll'});
    }, 1000);
  });

  closeButtons.on('click', function() {
    var projectModal = $(this).parents().eq(3);

    projectModal.css({'overflow-y' : 'hidden'});
    projectModal.removeClass('animated zoomIn').addClass('animated zoomOut');
    setTimeout(function() {
      projectModal.modal('hide');
      projectModal.css({'overflow-y' : 'hidden'});
    }, 1000);

    return false;
  });
});
