(function ($) {
	$.fn.ImageScroll = function (userOptions) {
		var _defaults = {};
		var _options = $.extend(_defaults, userOptions);
		var _this = $(this);
		var _images = {};

		this.each(function () {
			init(_this);
		});

		function init(_this) {
			var buttonUp = $('<div />');		
			var buttonDown = $('<div />');
			var content = $('<div/>');

			buttonUp.attr('id', 'up').attr('class', 'nav').append('UP');
			buttonDown.attr('id', 'down').attr('class', 'nav').append('DOWN');

			var images = _this.children('img');

			images.each (function (i, e) {
				var elem = $(e);				
				var item = $('<div />');
				var boxThumb = $('<div />');
				var imgThumb = $('img');

				_images[i] = elem;

				item.attr('href', elem.attr('src'))
					.attr('class', 'ImageScroll')
					.append(elem.attr('title') + '<br>');

				imgThumb.attr('src', elem.attr('src'));

				boxImg.attr('class', 'square-thumb')
					.append(imgThumb);

				if (i >= _options.items)
					item.attr('class', 'hide');

				content.append(item);
			});		

			_this.text('');
			_this.append(buttonUp);			
			_this.append(content);
			_this.append(buttonDown);
		}

		function show(i) {

		}

	};
}(jQuery));