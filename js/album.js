$(function() {
	if ($('body').hasClass('k-source-album') || $('body').hasClass('k-source-tag')) {

		var doc = $(document),
			body = $("body"),
			slideshowNavigation = $(".slideshow-navigation"),
			slideshow = $("#slideshow"),
			cover = $("#cover"),
			music = $("audio");

		$(window).keydown(function(e) {
			if (e.keyCode == 40) {
				$('a#scroll-down').click();
			};
		});

		/* Order Images in Columns */
		var s = 0,
			t = null,
			p = null;
		$(function() {
			$('#pillar').pillar({
				items: '.pillar-item',
				spacing: 20,
				gutter: 0,
				columns: {
					'1019': 1,
					'1519': 2,
					'2019': 3,
					'max': 4
				},
				balanceColumns: true
			});
		});

		$('.cover-content h1').boxfit({
			maximum_font_size: $('.cover-content h1').height()
		});

		/*
			Slideshow Stuff
		*/

		/* Assign Background Music */
		pulse_slideshow.on('dataloaded', function(e) {
			music.attr("src", $(location).attr("href").replace("albums", "storage/music").replace(/(\/#|\/)$/, ".mp3"));
		});

		/* Show Image in Pulse Slideshow */
		$('.pillar-item').click(function(e) {
			pulse_slideshow.loadItemAtPosition(e.currentTarget.dataset.id);
			slideshow.addClass("show");
		});

		/* Slideshow Start */
		doc.on("click", "#play", function(e) {
			e.preventDefault();
			$("nav").fadeOut(2000);
			body.addClass("play");
			slideshow.addClass("show");
			if (music.attr('src') !== '' && music.attr('src') !== undefined) {
				music.trigger('play');
			}
			p = setTimeout(function() {
				pulse_slideshow.play();
			}, 8000);
			return false;
		});

		/* Slideshow Stop */
		doc.on("click", "#quit", function() {
			doc.off('mousemove');
			clearTimeout(t);
			clearTimeout(p);
			slideshow.removeClass("show");
			pulse_slideshow.pause();
			$("nav").fadeIn(2000);
			body.removeClass("play");
			return false;
		});

		/* Change Background Color to match next image */
		pulse_slideshow.on('transitionstart', function(e) {
			slideshow.css("background-color", "rgb(" + e.data.caprigenus_background_color + ")");
		});

		pulse_slideshow.on('transitionend', function(e) {
			$("a#download").attr("href", e.data.original.url);
		});

		// Hide and show Navigation bar
		slideshow.on("touchstart", function(e) {
			clearTimeout(t);
			slideshowNavigation.addClass("show");
			body.removeClass("play");
			t = setTimeout(function() {
				slideshowNavigation.removeClass("show");
				body.addClass("play");
				t = null;
			}, 3750);
		});

		// Hide and show slideshow menu bar after mousemove
		pulse_slideshow.on('contentmousemove', function(e) {
			// hack to ignore single occurrence of mousemove
			if (++s < 2) {
				t = setTimeout(function() {
					t = null;
					s = 0;
				}, 3750);
			} else {
				clearTimeout(t);
				slideshowNavigation.addClass("show");
				body.removeClass("play");
				t = setTimeout(function() {
					slideshowNavigation.removeClass("show");
					body.addClass("play");
					t = null;
					s = 0;
				}, 3750);
			}
		});

		// Change Icon and show image grid when paused
		pulse_slideshow.on('playing', function(e) {
			var toggle = $('#toggle i');
			if (e) {
				toggle.removeClass('icon-play-circle').addClass('icon-pause-circle');					
				if (music.attr('src') !== '' && music.attr('src') !== undefined) {
					music.trigger('play');
				}
			} else {
				music.trigger('pause');
				toggle.removeClass('icon-pause-circle').addClass('icon-play-circle');				
			}
		});
	}
});
