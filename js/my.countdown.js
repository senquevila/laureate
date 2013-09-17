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
			var box = $(document.createElement('div')).addClass('countdown-box');
			var divMonths = $(document.createElement('div')).addClass('countdown-values');
			var divDays = $(document.createElement('div')).addClass('countdown-values');
			var divHours = $(document.createElement('div')).addClass('countdown-values');
			var divMinutes = $(document.createElement('div')).addClass('countdown-values');
			var divSeconds = $(document.createElement('div')).addClass('countdown-values');
			var divMiliseconds = $(document.createElement('div')).addClass('countdown-values');

			divMonths.attr('id', 'countdown-months');
			divDays.attr('id', 'countdown-days');
			divHours.attr('id', 'countdown-hours');
			divMinutes.attr('id', 'countdown-minutes');
			divSeconds.attr('id', 'countdown-seconds');
			divMiliseconds.attr('id', 'countdown-miliseconds');

			box.append(divMonths)
				.append(divDays)
				.append(divHours)
				.append(divMinutes)
				.append(divSeconds)
				.append(divMiliseconds);

			_this.append(box);

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

 '<div class="countdown-titles">Months</div>'
			obj.find('#countdown-months').html(time._months);
			obj.find('#countdown-days').html(time._days);
			obj.find('#countdown-hours').html(time._hours);
			obj.find('#countdown-minutes').html(time._minutes);
			obj.find('#countdown-seconds').html(time._seconds);
			obj.find('#countdown-miliseconds').html(time._miliseconds);
		}
	};	

}(jQuery));