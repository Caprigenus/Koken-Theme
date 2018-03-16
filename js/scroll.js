$(function() {
	var backToTop = $("#back-to-top"),
		s = 0;

	// Scroll Down Button in Set and Album
	$(document).on("click", "#scroll-down", function(e) {
		e.preventDefault();
		var o = $("#pillar").offset(),
			n = $("nav").height();
		$("html, body").animate({scrollTop: o.top - n}, 500);
		return false;
	});
		
	// Back to the Top Button
	backToTop.click(function(e) {
		e.preventDefault();
		$("html, body").animate({scrollTop: 0}, 500);
		return false;
	});
	
	// Hide Back to the Top Button
	$(document).on("touchstart", function(e) {
		clearTimeout(t);
		backToTop.addClass("show");
		t = setTimeout(function() {
			backToTop.removeClass("show");
			t = null;
		}, 3750);
	});
	
	// Hide Back to the Top Button after mousemove
	$(document).mousemove(function(e) {
		// hack to ignore single occurrence of mousemove
		y = $(window).scrollTop();
		h = $(window).height();
		if (y > h) {
			if (++s < 2) {
				console.log($(this).scrollTop());
				t = setTimeout(function() {
					t = null;
					s = 0;
				}, 3750);
			} else {
				clearTimeout(t);
				backToTop.addClass("show");
				t = setTimeout(function() {
					backToTop.removeClass("show");
					t = null;
					s = 0;
				}, 3750);
			}
		}
	});
});