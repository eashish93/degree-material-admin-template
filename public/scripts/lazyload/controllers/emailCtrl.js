// --- email Demo Controller
;(function() {

	var app = angular.module("app.ctrls");
	// email Ctrl
	app.controller("EmailCtrl", ["$scope", '$mdDialog', function($scope, $mdDialog) {
        // email tags
        $scope.tags = [
            {name: 'Work', color: 'red-500'},
            {name: 'Reciept', color: 'blue-500'},
            {name: 'My Data', color: 'green-500'}
        ];


        // List of mails for demo. (usually you want it from database)
    	$scope.emailLists = [
    		{
    			subject: "Some nice subject here.",
    			content: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself...",	// this will contain full content with html markup and added by database.
    			read: true,	// mail read/unread
    			sender: "Jonathan Doe",	// sender name
    			date: "3 mins ago",
    			attachment: true, 	// has attachment or not
    			active: false
    		},
    		{
    			subject: "Meetup at C.P, New Delhi",
    			content: "Lorem ipsum dolar sit amet...",
    			read: false,
    			sender: "Organizer.com",
    			date: "12th Feb",
    			attachment: false,
    			active: true
    		},
    		{
    			subject: "Calling all android developers to join me",
    			content: "Pellentesque habitant morbi tristique senectus et netus...",
    			read: true,
    			sender: "android.io",
    			date: "11th Jan",
    			attachment: true,
    			active: false
    		},
    		{
    			subject: "Meetup at C.P, New Delhi",
    			content: "Lorem ipsum dolar sit amet...",
    			read: false,
    			sender: "Organizer.com",
    			date: "22nd Dec",
    			attachment: false,
    			active: false
    		},
    		{
    			subject: "RE: Question about account information V334RE99e: s3ss",
    			content: "Hi, Thanks for the reply, I want to know something....",
    			read: false,
    			sender: "trigger.io",
    			date: "12 Dec",
    			attachment: true,
    			active: false
    		},
    	];

		// compose email
		$scope.composeEmail = function($event) {
			$mdDialog.show({
				targetEvent: $event,
				templateUrl: 'views/email/compose.html',
				clickOutsideToClose: true,
				escapeToClose: true,
				controller: 'EmailCtrl'
			});

		};


	}])

//=== #end
})()
