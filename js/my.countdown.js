/* Countdown 
Months, days, hours left. 6
Days, hours, minutes left. 5
Hours, minutes, seconds left. 4
Minutes, seconds, milliseconds left. 3
*/

(function ($) {

	$.fn.Countdown = function (userOptions) {
		var options = {
			steps: 60
		};

		var _beginDate = new Date(),			
			_multiple = new Array(1000, 60, 60, 24, 30);

		var time = {
			_months: 0,
			_days: 0,
			_hours: 0,
			_minutes: 0,
			_seconds: 0,
			_miliseconds: 0,		
		};

		var getFactor = function (index) {
			var mult = 1;

			if (index > _multiple.length)
				index = _multiple.length;

			for (var i = 0; i < index; i++) {
				mult = mult * _multiple[i];
			}

			return mult;
		};

		var self = this;

		return this.each(function()
        {
            var $this = $(this);
            var it = $this;
            //$this.onclick(function(){
                self.start(it);
            //});
        });

		var start = function ($this) {
			setInterval(function() {
				update($this);
			}, 1000);
		}

		function update($this) {		
			time._miliseconds = userOptions.endDate - _beginDate;

			//alert(time._miliseconds);


			time._months = Math.floor (time._miliseconds / getFactor(5));
			time._miliseconds -= time._months * getFactor(5);

			time._days = Math.floor(time._miliseconds / getFactor(4));
			time._miliseconds -= time._days * getFactor(4);

			time._hours = Math.floor(time._miliseconds / getFactor(3));
			time._miliseconds -= time._hours * getFactor(3);

			time._minutes = Math.floor(time._miliseconds / getFactor(2));
			time._miliseconds -= time._minutes * getFactor(2);

			time._seconds = Math.floor(time._miliseconds / getFactor(1));
			time._miliseconds -= time._seconds * getFactor(1);

			var elem = '<div id="countdown-wrapper">' + userOptions.endDate + '<br>' + _beginDate;
			elem += '<div class="countdown-values">' + time._months + '<div class="countdown-titles">Months</div></div>';
			elem += '<div class="countdown-values">' + time._days + '<div class="countdown-titles">Days</div></div>';
			elem += '<div class="countdown-values">' + time._hours + '<div class="countdown-titles">Hours</div></div>';
			elem += '<div class="countdown-values">' + time._minutes + '<div class="countdown-titles">Minutes</div></div>';
			elem += '<div class="countdown-values">' + time._seconds + '<div class="countdown-titles">Seconds</div></div>';
			elem += '<div class="countdown-values">' + time._miliseconds + '<div class="countdown-titles">Miliseconds</div></div></div>';

			$this.html(elem);			
		}

  		$.extend(options, userOptions);
	};	

}(jQuery));