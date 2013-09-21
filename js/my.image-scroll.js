(function ($) {
	$.fn.ImageScroll = function (userOptions) {
		var _defaults = {};
		var _options = $.extend(_defaults, userOptions);
		var _this = $(this);
		var _actualImage = 0;
		var _maxImage = 0;

		this.each(function () {
			init(_this);
		});

		$('.thumb').nailthumb({
			width:_options.width_thumb,
			height:_options.height_thumb
		});

		function init(_this) {
			var divNav = $('<div />');
			var buttonUp = $('<div />');		
			var buttonDown = $('<div />');
			var content = $('<div/>');
			var mainImage = $('<div/>');

			divNav.attr('id', 'scroll-nav');
			buttonUp.attr('id', 'up').attr('class', 'nav');			
			buttonDown.attr('id', 'down').attr('class', 'nav');
			mainImage.attr('id', 'scroll-image');
			divNav.append(buttonUp);

			var images = _this.children('img');

			images.each (function (i, e) {
				var elem = $(e);				
				var boxThumb = $('<div />')
				var textThumb = $('<div />')
				var divThumb = $('<div />');			

				divThumb.append(elem)
					.attr('class', 'thumb');

				textThumb.append(elem.attr('title'))
					.attr('class', 'thumb-text');

				boxThumb.append(divThumb)
					.append(textThumb)					
					.attr('id', 'scroll-' + i)
					boxThumb.attr('class', 'thumb-box');

				if (i >= _options.items)
					boxThumb.hide();

				divNav.append(boxThumb);

				_maxImage++;
				
			});
					
			divNav.append(buttonDown);

			_this.append(divNav);
			_this.append(mainImage);
		}

		$('#up').on('click', function () {
			if (_actualImage > 0) {
				_actualImage--;

				var first = _actualImage;
				var last = _actualImage + _options.items;

				$('#scroll-' + first).show();
				$('#scroll-' + last).hide();
			}
		});

		$('#down').on('click', function() {						
			if (_actualImage + _options.items < _maxImage) {				
				var first = _actualImage;
				var last = _actualImage + _options.items;
				
				$('#scroll-' + first).hide()
				$('#scroll-' + last).show();

				_actualImage++;
			}
		});

		$('.thumb-box').on('click', function() {
			var id = $(this).attr('id');
			var img = $('#' + id + ' > div > img');
			var mainImage = $('<img/>');

			mainImage.attr('src', img.attr('src'))
				.attr('title', img.attr('title'))
				.attr('alt', img.attr('alt'));

			$('#scroll-image').html(mainImage);
		});

	};
}(jQuery));