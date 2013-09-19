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

		var time = {
			_months: 0,
			_days: 0,
			_hours: 0,
			_minutes: 0,
			_seconds: 0,
			_miliseconds: 0,		
		};

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
			var box = $('<div/>')
				.attr('class', 'countdown-box');
			var box2 = $('<div/>')
				.attr('class', 'countdown-box');
			var divMonths = $('<div/>')
				.attr('id', 'countdown-months')
				.attr('class', 'hide');
			var divDays = $('<div/>')
				.attr('id', 'countdown-days')
				.attr('class', 'hide');
			var divHours = $('<div/>')
				.attr('id', 'countdown-hours')
				.attr('class', 'hide');
			var divMinutes = $('<div/>')
				.attr('id', 'countdown-minutes')
				.attr('class', 'hide');
			var divSeconds = $('<div/>')
				.attr('id', 'countdown-seconds')
				.attr('class', 'hide');
			var divMiliseconds = $('<div/>')
				.attr('id', 'countdown-miliseconds')
				.attr('class', 'hide');

			var spanMonths = $('<div/>')
				.attr('id', 'countdown-title-months')
				.attr('class', 'hide')
				.append('Months');
			var spanDays = $('<div/>')
				.attr('id', 'countdown-title-days')
				.attr('class', 'hide')
				.append('Days');
			var spanHours = $('<div/>')
				.attr('id', 'countdown-title-hours')
				.attr('class', 'hide')
				.append('Hours');
			var spanMinutes = $('<div/>')
				.attr('id', 'countdown-title-minutes')
				.attr('class', 'hide')
				.append('Minutes');
			var spanSeconds = $('<div/>')
				.attr('id', 'countdown-title-seconds')
				.attr('class', 'hide')
				.append('Seconds');
			var spanMiliseconds = $('<div/>')
				.attr('id', 'countdown-title-miliseconds')
				.attr('class', 'hide')
				.append('Miliseconds');

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
				time._months = 0
					._days = 0
					._hours = 0
					._minutes = 0
					._seconds = 0
					._miliseconds = 0;
			}
			else {
				time._miliseconds = count;

				time._months = Math.floor(time._miliseconds / getFactor(5));
				time._miliseconds -= time._months * getFactor(5);

				time._days = Math.floor(time._miliseconds / getFactor(4));
				time._miliseconds -= time._days * getFactor(4);

				time._hours = Math.floor(time._miliseconds / getFactor(3));
				time._miliseconds -= time._hours * getFactor(3);

				time._minutes = Math.floor(time._miliseconds / getFactor(2));
				time._miliseconds -= time._minutes * getFactor(2);

				time._seconds = Math.floor(time._miliseconds / getFactor(1));
				time._miliseconds -= time._seconds * getFactor(1);
			}

			obj.find('#countdown-months').html(time._months);
			obj.find('#countdown-days').html(time._days);
			obj.find('#countdown-hours').html(time._hours);
			obj.find('#countdown-minutes').html(time._minutes);
			obj.find('#countdown-seconds').html(time._seconds);
			obj.find('#countdown-miliseconds').html(time._miliseconds);

			showTime(obj);
		}

		function showTime(obj) {
			// 0 => Month, days, hours             1...
			// 1 => Days, hours, minutes           01..
			// 2 => Hours, minutes, seconds        001.
			// 3 => Minutes, seconds, miliseconds  0001
			var show = -1;

			if (time._months > 0) {
				show = 0;

				obj.find('#countdown-months').attr('class', 'countdown-values');
				obj.find('#countdown-title-months').attr('class', 'countdown-titles');

				obj.find('#countdown-days').attr('class', 'countdown-values');
				obj.find('#countdown-title-days').attr('class', 'countdown-titles');				
				
				obj.find('#countdown-hours').attr('class', 'countdown-values');
				obj.find('#countdown-title-hours').attr('class', 'countdown-titles');
			}
				
			if (show == -1 && time._days > 0) {
				show = 1;

				obj.find('#countdown-days').attr('class', 'countdown-values');
				obj.find('#countdown-title-days').attr('class', 'countdown-titles');				
			
				obj.find('#countdown-hours').attr('class', 'countdown-values');
				obj.find('#countdown-title-hours').attr('class', 'countdown-titles');

				obj.find('#countdown-minutes').attr('class', 'countdown-values');				
				obj.find('#countdown-title-minutes').attr('class', 'countdown-titles');

				obj.find('#countdown-months').attr('class', 'hide');
				obj.find('#countdown-title-months').attr('class', 'hide');

			}
				
			if (show == -1 && time._hours > 0) {
				show = 2;

				obj.find('#countdown-hours').attr('class', 'countdown-values');
				obj.find('#countdown-title-hours').attr('class', 'countdown-titles');

				obj.find('#countdown-minutes').attr('class', 'countdown-values');				
				obj.find('#countdown-title-minutes').attr('class', 'countdown-titles');

				obj.find('#countdown-seconds').attr('class', 'countdown-values');
				obj.find('#countdown-title-seconds').attr('class', 'countdown-titles');

				obj.find('#countdown-days').attr('class', 'hide');
				obj.find('#countdown-title-days').attr('class', 'hide');
			}
				
			if (show == -1) {
				show = 3;
				
				obj.find('#countdown-minutes').attr('class', 'countdown-values');				
				obj.find('#countdown-title-minutes').attr('class', 'countdown-titles');

				obj.find('#countdown-seconds').attr('class', 'countdown-values');
				obj.find('#countdown-title-seconds').attr('class', 'countdown-titles');

				obj.find('#countdown-miliseconds').attr('class', 'countdown-values');
				obj.find('#countdown-title-miliseconds').attr('class', 'countdown-titles');

				obj.find('#countdown-hours').attr('class', 'hide');
				obj.find('#countdown-title-hours').attr('class', 'hide');
			}
		}
	};	

}(jQuery));