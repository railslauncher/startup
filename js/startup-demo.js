/*
 This JS file is just to demonstrate the themes of Solo. This should be removed from your site.
 */

$(document).ready(function() {
  $('.settings-btn').on('click', function() {
    var settingsPanel = $(this).parent();

    if(settingsPanel.hasClass('hided')) {
      settingsPanel.animate({right: 0});
      settingsPanel.removeClass('hided');
    } else {
      settingsPanel.animate({right: -162});
      settingsPanel.addClass('hided');
    }
  });

  $('.settings-item').click(function() {
    var theme = $(this).data('theme');
    var stylesheet = $('#theme-styles');
    
    if(theme == 'default') {
      stylesheet.attr('href', 'css/startup.min.css');
    } else {
      stylesheet.attr('href', 'css/startup-'+theme+'.min.css');
    }
  });
});
