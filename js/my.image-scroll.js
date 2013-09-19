(function ($) {
	$.fn.ImageScroll = function (userOptions) {
		var _defaults = {}
		var _options = $.extend(_defaults, userOptions);
		var _this = $(this);

		this.each(function () {
			init(_this);
		});

		function init(_this) {
			var buttonUp = $('<a />');		
			var buttonDown = $('<a />');
			var content = $('<div/>');

			buttonUp.attr('href', '#up').attr('class', 'nav').append('UP');
			buttonDown.attr('href', '#down').attr('class', 'nav').append('DOWN');

			var images = _this.children('img');

			images.each (function (i, e) {
				var elem = $(e);
				var item = $('<a />');
				item.attr('href', elem.attr('src'))
					.append(elem.attr('title') + '<br>');


				content.append(item);
			});		

			_this.text('');
			_this.append(buttonUp);			
			_this.append(content);
			_this.append(buttonDown);
		}

	};
}(jQuery));