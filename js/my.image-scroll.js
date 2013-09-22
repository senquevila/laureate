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
					.attr('class', 'thumb-box')
					.attr('tag', i);

				if (i >= _options.items)
					boxThumb.hide();

				divNav.append(boxThumb);

				_maxImage++;				
			});
					
			divNav.append(buttonDown);

			_this.append(divNav);
			_this.append(mainImage);

			showImage(0);
		}

		function showImage(index) {
			var obj = _this.find('#scroll-' + index + ' > div > img');			
			var div = _this.find('#scroll-' + index + ' > div.thumb-text');
			var img = $('<img/>');

			for (var i = 0; i < _maxImage; i++) {
				var elem = _this.find('#scroll-' + i + ' > div.thumb-text');
				elem.css('color', '#000000').css('text-decoration', 'none');
			}

			div.css('color', '#ff0000').css('text-decoration', 'underline');

			img.attr('src', obj.attr('src'))
				.attr('title', obj.attr('title'))
				.attr('alt', obj.attr('alt'));

			$('#scroll-image').html(img);
		}

		$('#up').on('click', function () {
			if (_actualImage > 0) {
				_actualImage--;

				showImage(_actualImage);

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

				$('#scroll-' + first).hide();
				$('#scroll-' + last).show();
			}
				
			if (_actualImage < _maxImage - 1) {
				_actualImage++;
				showImage(_actualImage);
			}
		});

		$('.nav').on('click', function() {
			if (_actualImage == 0 || _actualImage == _maxImage - 1)
				$(this).css('background-color', '#000000');
			else			
				$('.nav').css('background-color', '#666666');
		});

		$('.thumb-box').on('click', function() {
			var index = $(this).attr('tag');
			showImage(index);
		});

	};
}(jQuery));