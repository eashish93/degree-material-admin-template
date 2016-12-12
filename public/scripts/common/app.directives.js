;(function() {
    'use strict';

    angular.module('app.directives', [])

    .directive('highlightSidenav', [function() {
    	return {
    		restrict: 'A',
    		link: function(scope, el, attrs) {
                var lists = el.find('ul.inner-drop').parent('li'), // target li which has sub ul.
                    a = lists.children('a'),
                    listsRest = el.find('ul.nav').children('li'),
                    aRest = listsRest.children('a'),
                    stopClick = 0;


                a.on('click', function(e) {
                    if(e.timeStamp - stopClick > 300) {
                        var self = $(this),
                            selfLi = self.parent('li');
                    	lists.not(selfLi).removeClass('open');
                        selfLi.toggleClass('open');
                        stopClick = e.timeStamp;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                });

				// slide up nested nav when clicked on aRest
				aRest.on('click', function(e) {
					lists.removeClass('open');
					e.stopPropagation();
					e.stopImmediatePropagation();
				});

    		}
    	}
    }])


    // highlight active nav
    .directive('highlightActive', ['$location', '$rootScope',  function($location, $rs) {
    	return {
    		restrict: 'A',
    		link: function(scope, el, attrs) {
    			var links = el.find('a'),
    				path = function() {return $location.path()},
    				highlightActive = function(links, path) {
    					var path = '#' + path,
                            tmp = path.split('/');
                        $rs.headTitle = tmp[tmp.length -1];
    					angular.forEach(links, function(link) {
    						var link = angular.element(link),
    							li = link.parent('li'),
    							href = link.attr('href');

    						if(li.hasClass('active'))
    							li.removeClass('active');
    						if(path.indexOf(href) == 0)
    							li.addClass('active');
    					})
    				};

    			highlightActive(links, $location.path());
    			scope.$watch(path, function(newVal, oldVal) {
    				if(newVal == oldVal) return;
    				highlightActive(links, $location.path());
    			})
    		}
    	}
    }])

    // custom full page
    .directive("customPage", ["$location",function($location) {
    	return {
    		restrict: "A",
    		link: function(scope, element, attrs) {

    			var path = function() {return $location.path()};
    			var addBg = function(path) {
    				scope.bodyFull = false;
                    console.log(path);
    				switch(path) {
    					case "/404": case "/pages/404" : case "/pages/signin" :
    					case "/pages/register" : case "/pages/forget-pass" :
    					case "/pages/lock-screen":
    						scope.bodyFull = true;
    				}

    			};
    			addBg(path());

    			scope.$watch(path, function(newVal, oldVal) {
    				if(angular.equals(newVal, oldVal)) return;
    				addBg(path());
    			});

    		}
    	}

    }])






}())
