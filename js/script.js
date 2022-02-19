$(document).ready(function ($) {
  $('.popup-with-form').magnificPopup({
		mainClass: 'mfp-zoom-in',
		removalDelay: 500
	})

});

$(document).ready(function(){
   $('.header-menu-mobile').click(function(event) {
      $('.header, .head').toggleClass('active');
      $('body').toggleClass('lock');
   });
});