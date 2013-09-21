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

		function init(_this) {
			var buttonUp = $('<div />');		
			var buttonDown = $('<div />');
			var content = $('<div/>');
			var mainImage = $('<div/>')

			buttonUp.attr('id', 'up')
				.attr('class', 'nav')
				.append('UP');
			
			buttonDown.attr('id', 'down')
				.attr('class', 'nav')
				.append('DOWN');

			mainImage.attr('id', 'main-image');

			_this.append(buttonUp);

			var images = _this.children('img');

			images.each (function (i, e) {
				var elem = $(e);				
				var boxThumb = $('<div />')
				var textThumb = $('<div />')
				var divThumb = $('<div />');			

				divThumb.append(elem)
					.attr('class', 'thumb');

				textThumb.append(elem.attr('title'))
					.attr('class', 'text-thumb');

				boxThumb.append(divThumb)
					.append(textThumb)
					.attr('class', 'box-thumb')
					.attr('id', 'scroll-' + i);

				if (i >= _options.items) {
					boxThumb.attr('class', 'hide');
				}

				_this.append(boxThumb);

				_maxImage++;
				
			});
					
			_this.append(buttonDown);
			_this.append(mainImage);
		}

		$('#up').on('click', function () {
			if (_actualImage > 0) {
				_actualImage--;

				var first = _actualImage;
				var last = _actualImage + _options.items;

				$('#scroll-' + first).attr('class', 'box-thumb');
				$('#scroll-' + last).attr('class', 'hide');
			}
		});

		$('#down').on('click', function() {						
			if (_actualImage + _options.items < _maxImage) {				
				var first = _actualImage;
				var last = _actualImage + _options.items;
				
				$('#scroll-' + first).attr('class', 'hide');
				$('#scroll-' + last).attr('class', 'box-thumb');

				_actualImage++;
			}
		});

		$('.box-thumb').on('click', function() {
			var id = $(this).attr('id');
			var img = $('#' + id + ' > div > img');
			var bigImage = $('<img/>');

			bigImage.attr('src', img.attr('src'))
				.attr('title', img.attr('title'))
				.attr('alt', img.attr('alt'));

			$('#main-image').append(bigImage);
		});

	};
}(jQuery));