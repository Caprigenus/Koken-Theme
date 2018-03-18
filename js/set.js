$(function() {
	if ($('body').hasClass('k-source-set')) {

		$(window).keydown(function(e) {
			if (e.keyCode == 40) {
				$('a#scroll-down').click();
			};
		});

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
	}
});
