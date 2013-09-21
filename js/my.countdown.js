/* Countdown 
Months, days, hours left. 6
Days, hours, minutes left. 5
Hours, minutes, seconds left. 4
Minutes, seconds, milliseconds left. 3
*/

(function ($) {

	$.fn.Countdown = function (userOptions) {
		var _defaults = {
			speed: 1000
		};

		var _options = $.extend(_defaults, userOptions);

		var _times = {
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			miliseconds: 0,		
		};

		var _datePart = new Array('months', 'days', 'hours', 'minutes', 'seconds', 'miliseconds');

		var _this = $(this);

		var getFactor = function (index) {
			var mult = 1;
			var multiple = new Array(1000, 60, 60, 24, 30);

			if (index > multiple.length)
				index = multiple.length;

			for (var i = 0; i < index; i++) {
				mult = mult * multiple[i];
			}

			return mult;
		};

		this.each(function(){
			var box = $('<div/>').attr('class', 'countdown-box');
			var box2 = $('<div/>').attr('class', 'countdown-box');
			
			var divMonths = $('<div/>').attr('id', 'countdown-months');
			var divDays = $('<div/>').attr('id', 'countdown-days');
			var divHours = $('<div/>').attr('id', 'countdown-hours');
			var divMinutes = $('<div/>').attr('id', 'countdown-minutes');
			var divSeconds = $('<div/>').attr('id', 'countdown-seconds');
			var divMiliseconds = $('<div/>').attr('id', 'countdown-miliseconds');

			var spanMonths = $('<div>Months<div/>').attr('id', 'countdown-title-months');
			var spanDays = $('<div>Days<div/>').attr('id', 'countdown-title-days');
			var spanHours = $('<div>Hours<div/>').attr('id', 'countdown-title-hours');
			var spanMinutes = $('<div>Minutes<div/>').attr('id', 'countdown-title-minutes');
			var spanSeconds = $('<div>Seconds<div/>').attr('id', 'countdown-title-seconds');
			var spanMiliseconds = $('<div>Miliseconds<div/>').attr('id', 'countdown-title-miliseconds');

			box.append(divMonths)
				.append(divDays)
				.append(divHours)
				.append(divMinutes)
				.append(divSeconds)
				.append(divMiliseconds);

			box2.append(spanMonths)
				.append(spanDays)
				.append(spanHours)
				.append(spanMinutes)
				.append(spanSeconds)
				.append(spanMiliseconds)

			box.children().attr('class', 'countdown-values');			
			box.children().hide();

			box2.children().attr('class', 'countdown-titles');			
			box2.children().hide();

			_this.append(box);
			_this.append(box2);

			init(_this);
		});

		function init (_this) {
			var beginDate = new Date();
			var count = _options.endDate - beginDate;

			setTimeout(function() {
				update(_this, count);
				init(_this);
			}, _options.speed);
		}
	
		function update(obj, count) {
			if (count <= 0) {
				_times.months = 0;
				_times.days = 0;
				_times.hours = 0;
				_times.minutes = 0;
				_times.seconds = 0;	
				_times.miliseconds = 0;
			}
			else {
				_times.miliseconds = count;

				_times.months = Math.floor(_times.miliseconds / getFactor(5));
				_times.miliseconds -= _times.months * getFactor(5);

				_times.days = Math.floor(_times.miliseconds / getFactor(4));
				_times.miliseconds -= _times.days * getFactor(4);

				_times.hours = Math.floor(_times.miliseconds / getFactor(3));
				_times.miliseconds -= _times.hours * getFactor(3);

				_times.minutes = Math.floor(_times.miliseconds / getFactor(2));
				_times.miliseconds -= _times.minutes * getFactor(2);

				_times.seconds = Math.floor(_times.miliseconds / getFactor(1));
				_times.miliseconds -= _times.seconds * getFactor(1);
			}

			obj.find('#countdown-months').html(_times.months);
			obj.find('#countdown-days').html(_times.days);
			obj.find('#countdown-hours').html(_times.hours);
			obj.find('#countdown-minutes').html(_times.minutes);
			obj.find('#countdown-seconds').html(_times.seconds);
			obj.find('#countdown-miliseconds').html(_times.miliseconds);

			show_times(obj);
		}

		function show_times(obj) {
			var firstPart, lastPart;

			firstPart = 3;

			if (_times.months > 0)
				firstPart = 0;
			else if (_times.days > 0)
				firstPart = 1;
			else if (_times.hours > 0)
				firstPart = 2;

			lastPart = firstPart + 2;

			$('.countdown-values').each(function(i, e) {
				var elem = $(e);
				
				if (i >= firstPart && i <= lastPart)
					elem.show();
				else
					elem.hide();
			});

			$('.countdown-titles').each(function(i, e) {
				var elem = $(e);

				if (i >= firstPart && i <= lastPart)
					elem.show();
				else
					elem.hide();
			});
		}
	};	

}(jQuery));