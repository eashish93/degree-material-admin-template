// --- sparkline directive
;(function() {

	var app = angular.module("app.directives");

	// sparline chart directive, simple directive 
	// all options must be given directly in html.
	// For stacked bar chart, you have to specify options in an array in html like this:
	// [0, 2], [2, 4], [4, 2], [4, 1]
	app.directive("sparkline", [function() {
		return {
			restrict: "EA",
			link: function(scope, el, attrs) {
				var model = attrs.values || el.text();
				var opts = {};

				if(attrs.opts) angular.extend(opts, angular.fromJson(attrs.opts));
				else {
					angular.extend(opts, attrs);
				}			

				// The following options have to be converted to array from string
				// Type 		Options
				// ====			========
				// Bar 			stackedBarColor
				// Bullet		rangeColors
				// Pie 			sliceColors
				// NOte: when sepcifying multiple colors for above attributes, don't put spaces between them
				// Eg: [#4CAF50,#38B4EE,#eee]  // right
				// 	[#4CAF50, #38B4EE, #eee]	// wrong

				// for bar
				if(attrs.stackedBarColor) {
					opts.stackedBarColor = attrs.stackedBarColor.replace("[", "").replace("]", "").split(",");
				}
				// for bullet
				if(attrs.rangeColors) {
					opts.rangeColors = attrs.rangeColors.replace("[", "").replace("]", "").split(",");
				}
				// for pie
				if(attrs.sliceColors) {
					opts.sliceColors = attrs.sliceColors.replace("[", "").replace("]", "").split(",");
					
				}



				if(angular.isString(model))
					model = JSON.parse("[" + model + "]");

				el.sparkline(model, opts);		

			}
		}
	}])

//=== #end
})()