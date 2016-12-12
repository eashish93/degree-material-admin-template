// --- fullcalendar controller
;(function() {

	var app = angular.module("app.ctrls");
	app.controller("CalendarDemoCtrl", ["$scope", "uiCalendarConfig", "$compile", function($scope, uiCalendarConfig, $compile) {
		var cc = uiCalendarConfig.calendars,
			date = new Date(),
			d = date.getDate(),
			m = date.getMonth(),
			y = date.getFullYear();


		// event colors
		var eventColors = {
			primary: "#3F51B5",
			success: "#4CAF50",
			info: "#38B4EE",
			warning: "#FDD835",
			danger: "#f44336"
		};

		// list of events
		$scope.events = [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1)
			},
			{
				title: 'Very Long Event',
				start: new Date(y, m, d + 10, 11, 22),
				end: new Date(y, m, d + 13),
				className: "bg-primary",
				description: "Short description about event"
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d - 3, 16, 33),
				allDay: false,
				className: "bg-danger",
			},
			{
				title: 'Repeating Event',
				start: new Date(y, m, d + 4, 13, 45),
				className: "bg-warning",
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d + 1, 19, 0),
				end: new Date(y, m, d + 1, 22, 30),
				allDay: false,
				description: "Come to my birthday.",
				className: "bg-info",
			},
			{
				title: 'Click for Google',
	            start: new Date(y, m, 28),
	            end: new Date(y, m, 29),
	            url: 'http://google.com/',
	            className: "bg-success",
			}
		];

		// add human redable date in above events for html
		$scope.events.forEach(function(a, i) {
			a.humanDate = moment(a.start).format("MMM DD") + " - " + moment(a.end).format("MMM DD");
		});

		$scope.eventSources = [$scope.events];	// this is the event sources.

		// generating tooltips.
		$scope.eventRender = function(event, elem, view) {
			elem.attr(
				{'tooltip': "Start Time: " + moment(event.start).format("MMM DD hh:mm"), 'tooltip-append-to-body': true}
			);
			$compile(elem)($scope);
		};


		// event options
		$scope.uiConfig = {
			calendar: {
				height: 500,
				editable: true,
				defaultView: "month",
				header: false, 	// remove default toolbar
				eventRender: $scope.eventRender
			}
		}

		$scope.currentDate = moment().format("MMMM YYYY");

		// add event
		$scope.addEvent = function() {
			var start = new Date(y, m, d);
			$scope.events.push({
				title: "New Event",
				start: start,
				humanDate: moment(start).format("MMM DD") + " - "
			});
		};

		// remove event
		$scope.removeEvent = function(index) {
	      	$scope.events.splice(index,1);
	    };

	    $scope.changeEventColor = function(index, name) {
	    	$scope.events[index].className = name;	// don't use `color` because angular directive doesn't watch for it.
	    };


	    // event functions (for navigation)
		$scope.changeView = function(view,calendar) {
			cc[calendar].fullCalendar('changeView',view);
			$scope.currentDate = cc[calendar].fullCalendar("getView").title;
		};


		$scope.prev = function(calendar) {
			cc[calendar].fullCalendar("prev");
			$scope.currentDate = cc[calendar].fullCalendar("getView").title;
		};

		$scope.next = function(calendar) {
			cc[calendar].fullCalendar("next");
			$scope.currentDate = cc[calendar].fullCalendar("getView").title;
		};

		$scope.today = function(calendar) {
			cc[calendar].fullCalendar("today");
			$scope.currentDate = cc[calendar].fullCalendar("getView").title;
		};

	}])

//=== #end
})()
