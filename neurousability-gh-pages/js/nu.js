var airport_departure_selected = false;
var airport_arrival_selected = false;

var waiting_time;
var participant_number;
var test_type;

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
    var pick_date = $('#datetimepicker').data("DateTimePicker").date()._d;
	$('.date-selected').html(pick_date.getDate() + " / " + (pick_date.getMonth() + 1) + " / " + pick_date.getFullYear());
	PageTransitions.nextPage(3);
	loadingInterface(5);
});

$(document).ready(function() {

    // set the random waiting time between 12 and 18 seconds 
    waiting_time = parseInt((Math.random() * 7) + 12) * 1000;
    console.log(waiting_time);

    // get the participant number
    participant_number = gup('participant', document.location.search);

    test_type = gup('type', document.location.search);

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

/*
    this function displays and hides the loading interface!
*/
function loadingInterface(index) {
	if (owl != null) {
		owl.jumpTo(0);
	}
    // trigger storytelling
    changeStorytelling();
    // record epoch time here - uncommento once function recordTime() is ready
    recordTime();
	setTimeout(
		function() {
			$('.pt-page-' + index + ' .loading-page').css({"opacity" : "0"}).delay(500).css({"visibility" : "hidden"});
		}
	,waiting_time);
}

/*
 this function controls the different storytelling images
 */
function changeStorytelling() {
    var counter = 0;
    $('#camera').css({"left" : "0px", "top" : "0px"});
    $('#snapshots').css({"display" : "none"});
    $('#camera-buttons').css({"display" : "none"});
    setInterval(function(){
        counter = (counter + 1) ;        
        $('#storypic').attr('src', 'img/story0' + counter + '.png');
        // place the camera at the right place
        if (counter == 0) {   //ready?                   
            $('#camera').css({"left" : "0px", "top" : "0px"});
            $('#snapshots').css({"display" : "none"});
            $('#camera-buttons').css({"display" : "none"});
        }
        else if (counter == 1) {  //taking you to there now
            $('#storypic').attr('src', 'img/story0' + counter + '.gif');
            $('#camera').css({"left" : "0px", "top" : "0px"});
        }
        else if (counter == 2) {  //first pic
           $('#camera').css({"left" : "120px", "top" : "190px"});
           $('#snapshots').css({"display" : "block"});
           $('#camera-buttons').css({"display" : "block"});
        } 
        else if (counter == 3) { //second pic
            $('#camera').css({"left" : "167px", "top" : "184px"});
        }
        else if (counter == 4) { // third pic
            $('#camera').css({"left" : "495px", "top" : "70px"});
        }
    }, waiting_time / 3);
}

/*
 this function record the time epoch of the start of the loading interfaces 
 and the end of it (simply adding 15 seconds)
*/
// var CLIENT_ID = "554374579670-9nsr0i1g5hkkdb4c3dm2tv8qnshmk5s7.apps.googleusercontent.com";
// var google_client_secret = "o_5ydrD9EpexJR-KAP-9fGSg";
// var SCOPES = ['https://www.googleapis.com/auth/drive'];
function recordTime() {
    var d = new Date();
    var formatDate = "participant: \t" + participant_number;
    formatDate = formatDate + "\n" + "test type: \t" + test_type;
    formatDate = formatDate + "\n" + "start time: \t" + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + "_" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
    formatDate = formatDate + "\n" + "end time: \t"+ d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + "_" + d.getHours() + ":" + d.getMinutes() + ":" + (d.getSeconds()+ (waiting_time/1000)) + "." + d.getMilliseconds();
    var blob = new Blob([formatDate], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "NU-test-" + d + ".txt");
}

/* utility function that returns url query params */
function gup( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}