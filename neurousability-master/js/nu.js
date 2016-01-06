var airport_departure_selected = false;
var airport_arrival_selected = false;

$('.departure-airports .airport').click(function() {
	$('.airport-default-departure').html($(this).html());
	airport_departure_selected = true;
});

$('.arrival-airports .airport').click(function() {
	$('.airport-default-arrival').html($(this).html());
	airport_arrival_selected = true;
});

$('.departures .progress-arrow').click(function() {
	if (airport_departure_selected)
		PageTransitions.nextPage(3);
});

$('.arrival .progress-arrow').click(function() {
	if (airport_arrival_selected)
		PageTransitions.nextPage(3);
});

$('.date .progress-arrow').click(function() {
	$('.date-selected').html($('#datetimepicker').data("DateTimePicker").date()._i);
	PageTransitions.nextPage(3);
	loadingInterface(5);
});

$(document).ready(function() {

    var sc = $('#seat-map').seatCharts({
        map: [
            'aaa_abb',
            'abb_aaa',
            'aaa_aaa',
            'aaa_aba',
            'aaa_aaa',
            'aaa_bab',
            'aaa_aaa',
        ],
        seats: {
            a: {
                price   : 99.99,
                classes : 'front-seat' //your custom CSS class
            },
            b: {
            	classes: 'unavailable'
            }

        },
        click: function () {
            if (this.status() == 'available') {
                //do some stuff, i.e. add to the cart
                return 'selected';
            } else if (this.status() == 'selected') {
                //seat has been vacated
                return 'available';
            } else if (this.status() == 'unavailable') {
                //seat has been already booked
                return 'unavailable';
            } else {
                return this.style();
            }
        }
    });

    //Make all available 'c' seats unavailable
    sc.find('c.available').status('unavailable');

});


function loadingInterface(index) {
	setTimeout(
		function() {
			$('.pt-page-' + index + ' .loading-page').css({"opacity" : "0"}).delay(500).css({"visibility" : "hidden"});
		}
	,10000);
}