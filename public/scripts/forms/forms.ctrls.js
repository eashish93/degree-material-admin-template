;(function() {
    'use strict';

    angular.module('app.forms.ctrls', [])

    .controller('FormElementsDemo', ['$scope', function($scope) {
        $scope.inputdemo = {
            address: 'B-44/2, Street Park, New Delhi',
            skills: 'PHP, Nodejs, Android',
            textarea: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.\n\nIf you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
            state: 'MA',
            states: ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function(state) {
                return {abbrev: state};
            }),
            toppings: [
                { category: 'meat', name: 'Pepperoni' },
                { category: 'meat', name: 'Sausage' },
                { category: 'meat', name: 'Ground Beef' },
                { category: 'meat', name: 'Bacon' },
                { category: 'veg', name: 'Mushrooms' },
                { category: 'veg', name: 'Onion' },
                { category: 'veg', name: 'Green Pepper' },
                { category: 'veg', name: 'Green Olives' }
            ],
            selectedToppings: [],
            name: 'John Doe',
            donation: 45.32
        };

        $scope.chips = {
            fruitNames: ['Apple', 'Banana', 'Orange']

        };
        $scope.chips.roFruitNames = angular.copy($scope.chips.fruitNames);


        // Date picker
        $scope.myDate = new Date();

        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate()
        );

        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate()
        );

        $scope.onlyWeekendsPredicate = function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        };


        // Custom Sliders
        $scope.sliderColor = {
            red: Math.floor(Math.random() * 255),
            green: Math.floor(Math.random() * 255),
            blue: Math.floor(Math.random() * 255)
        };

        $scope.sliderRating1 = 3;
        $scope.sliderRating2 = 2;
        $scope.sliderRating3 = 4;

        // vertical
        $scope.verticalSlider = {
            vol: Math.floor(Math.random() * 100),
            bass: Math.floor(Math.random() * 100),
            master: Math.floor(Math.random() * 100)
        };

        $scope.sliderDisabled = Math.floor(Math.random() * 10);

        /*** Checkbox Demo ***/
        $scope.check = {
            cb1: true, cb2: false, cb3: true, cb4: false
        };
        /** Radio group **/
        $scope.radio = {
            group: 'Apple'
        };
        // Switches
        $scope.switch = {
            cb1: true, cb2: false, cb3: true, cb4: true
        };

    }])

    .controller('ContactChipsDemoCtrl', ['$scope', '$q', '$timeout', function($scope, $q, $timeout) {
        var self = this;
        var pendingSearch, cancelSearch = angular.noop;
        var cachedQuery, lastSearch;

        self.allContacts = loadContacts();
        self.contacts = [self.allContacts[1]];
        self.asyncContacts = [];
        self.filterSelected = true;

        self.querySearch = querySearch;
        self.delayedQuerySearch = delayedQuerySearch;

        /**
        * Search for contacts; use a random delay to simulate a remote call
        */
        function querySearch (criteria) {
            cachedQuery = cachedQuery || criteria;
            return cachedQuery ? self.allContacts.filter(createFilterFor(cachedQuery)) : [];
        }

        /**
        * Async search for contacts
        * Also debounce the queries; since the md-contact-chips does not support this
        */
        function delayedQuerySearch(criteria) {
            cachedQuery = criteria;
            if ( !pendingSearch || !debounceSearch() )  {
                cancelSearch();

                return pendingSearch = $q(function(resolve, reject) {
                    // Simulate async search... (after debouncing)
                    cancelSearch = reject;
                    $timeout(function() {

                        resolve( self.querySearch() );

                        refreshDebounce();
                    }, Math.random() * 500, true)
                });
            }

            return pendingSearch;
        }

        function refreshDebounce() {
            lastSearch = 0;
            pendingSearch = null;
            cancelSearch = angular.noop;
        }

        /**
        * Debounce if querying faster than 300ms
        */
        function debounceSearch() {
            var now = new Date().getMilliseconds();
            lastSearch = lastSearch || now;

            return ((now - lastSearch) < 300);
        }

        /**
        * Create filter function for a query string
        */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(contact) {
                return (contact._lowername.indexOf(lowercaseQuery) != -1);;
            };

        }

        function loadContacts() {
            var contacts = [
                'Marina Augustine',
                'Oddr Sarno',
                'Nick Giannopoulos',
                'Narayana Garner',
                'Anita Gros',

            ];

            return contacts.map(function (c, index) {
                var cParts = c.split(' ');
                var contact = {
                    name: c,
                    email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
                    image: 'http://lorempixel.com/50/50/people?' + index
                };
                contact._lowername = contact.name.toLowerCase();
                return contact;
            });
        }

    }])

    .controller('FormValidationDemo', ['$scope', function($scope) {
        $scope.validDemo = {
            email: '',
            pass: 'example',
            num: 23
        };
    }])


})()
