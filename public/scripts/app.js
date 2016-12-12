;(function() {
    'use strict';

    angular.module('app', [
        // Angular Modules
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngAria',
        'ngMessages',
        'ngMaterial',
        'md.data.table',
        'oc.lazyLoad',
        // custom modules
        'app.ctrls',
        'app.directives',
        // ui
        'app.ui.ctrls',
        // forms
        'app.forms.ctrls',
        //tables
        'app.tables.ctrls'

    ])
    .config(['$compileProvider', '$mdThemingProvider', function($cp, $theme) {
        /** Enable this in production **/
        // $cp.debugInfoEnabled(false);
        // $cp.commentDirectivesEnabled(false);
        // $cp.cssClassDirectivesEnabled(false);
        $theme.theme('default')
            .primaryPalette('blue', {
                'default': 'A700',
                'hue-1': 'A400'
            })
            .accentPalette('pink',{
                'default': 'A400'
            })
            .warnPalette('deep-orange', {
                'default': '500',
            })
            .backgroundPalette('grey', {
                'default': '50',
            });


    }])

    // lazyload modules
    .config(['$ocLazyLoadProvider', function($ocp) {
        $ocp.config({
            debug: false,
            modules: [{
                name: 'flow',
                files: ['scripts/lazyload/ng-flow-standalone.min.js']
            },
            {
                name: 'angular-c3',
                files: ['scripts/lazyload/c3.directive.js']
            },
            {
				name: "ui.calendar",
				serie: true,	// load files in series
				files: [
                    "scripts/lazyload/moment.min.js",
					"scripts/lazyload/fullcalendar.min.js",
					"styles/lazyload/fullcalendar.min.css",
					"scripts/lazyload/calendar.js"
				]
			},
            {
                name: 'angularTrix',
                serie: true,
                files: [    // lazy load in series
                    "scripts/lazyload/trix.js",
                    "scripts/lazyload/angular-trix.min.js",
                    "styles/lazyload/trix.css"
                ]
            }

        ]
        })
    }])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        var routes = [
            'dashboard', 'email/inbox', 'calendar',
            'ui/buttons', 'ui/typography', 'ui/cards', 'ui/grids', 'ui/icons', 'ui/tabs', 'ui/modals', 'ui/progress', 'ui/extras',
            'forms/elements', 'forms/validation', 'forms/uploader',
            'tables',
            'charts/c3', 'charts/sparklines',
            'pages/signin', 'pages/register', 'pages/forget-pass', 'pages/404', 'pages/timeline', 'pages/search', 'pages/invoice'
        ];

        function setRoutes(route) {
			var url = '/' + route,
				config = {
					templateUrl: "views/" + route + ".html"
				};

			$routeProvider.when(url, config);
			return $routeProvider;
		}
        routes.forEach(function(route) {
			setRoutes(route);
		});

        $routeProvider
            .when('/', {redirectTo: '/dashboard'})
            .when('/404', {templateUrl: 'views/pages/404.html'})
            .otherwise({redirectTo: '/404'})



        // for lazyload modules
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            resolve: {
                deps: ["$ocLazyLoad", '$rootScope', '$timeout', function(a, $rootScope, $timeout) {
					return a.load(['scripts/lazyload/jquery.sparkline.min.js'])
					.then(function() {
						return a.load({
							name: "app.directives",
							files: ["scripts/lazyload/sparkline.directive.js"]
						})
					})
                    .then(function() {
                        return a.load(["scripts/lazyload/d3.min.js", "scripts/lazyload/c3.min.js", "styles/lazyload/c3.min.css"])
                    })
                    .then(function() {
                        return a.load('angular-c3');
                    })
                    .then(function() {
						$timeout(function() {
							$rootScope.$broadcast("c3.resize");
						}, 100);
					})

				}]
            }
        })

        // email
        $routeProvider.when('/email/inbox', {
            templateUrl: 'views/email/inbox.html',
            resolve: {
                deps: ['$ocLazyLoad', function(a) {
                    return a.load(['styles/lazyload/email.css', 'scripts/lazyload/controllers/emailCtrl.js'])
                    .then(function() {
                        return a.load('angularTrix');
                    })
                }]
            }
        })


        $routeProvider.when("/calendar", {
            templateUrl: "views/calendar.html",
            resolve: {
                deps: ["$ocLazyLoad", function(a) {
                    return a.load("ui.calendar")
                    .then(function() {
                        return a.load({
                            name: "app.ctrls",
                            files: ["scripts/lazyload/controllers/calendarCtrl.js"]
                        })
                    })
                }]
            }
        })

        $routeProvider.when('/forms/uploader', {
            templateUrl: 'views/forms/uploader.html',
            resolve: {
                deps: ['$ocLazyLoad', function($oc) {
                    return $oc.load('flow');
                }]
            }
        })

        // charts - c3
        $routeProvider.when('/charts/c3', {
            templateUrl: 'views/charts/c3.html',
            resolve: {
                deps: ["$ocLazyLoad", "$rootScope", "$timeout", function(a, $rootScope, $timeout) {
					return a.load(["scripts/lazyload/d3.min.js", "scripts/lazyload/c3.min.js", "styles/lazyload/c3.min.css"])
					.then(function() {
						return a.load("angular-c3");
					})
					.then(function() {
						return a.load({
							name: "app.ctrls",
							files: ["scripts/lazyload/controllers/c3ChartCtrl.js"]
						})
					})
					.then(function() {
						$timeout(function() {
							$rootScope.$broadcast("c3.resize");
						}, 100);
					})

				}]
            }
        })

        // charts - sparklines
        $routeProvider.when('/charts/sparklines', {
            templateUrl: 'views/charts/sparklines.html',
            resolve: {
                deps: ["$ocLazyLoad", function(a) {
					return a.load(['scripts/lazyload/jquery.sparkline.min.js'])
					.then(function() {
						return a.load({
							name: "app.directives",
							files: ["scripts/lazyload/sparkline.directive.js"]
						})
					})
				}]
            }
        })
    }])



    // END
}());
