;(function(c3){
  'use strict';
  // directly taken from https://github.com/maseh87/c3-chart
  angular.module('angular-c3', [])
  .factory('c3Factory', ['$q', '$timeout', function($q, $timeout) {
    var defer = $q.defer();
    var chart = {};
    var allCharts = {};
    var decorateChart = function(chart) {};

    chart.get = function(id) {
        var chart;
        return $timeout(function() {
        //time out to wait for the chart to be compiled
    }, 100).then(function() {
        chart = allCharts[id];
        return chart;
    });
};

chart.getAll = function() {
  return $timeout(function() {
    return allCharts;
}, 100);
};

chart.register = function(id, chart) {
  decorateChart(chart);
  allCharts[id] = chart;
};

return chart;
}])
  .directive('c3Chart', ['c3Factory', function(c3Factory) {

    //color patterns for chart coloring
    var patterns = {
      light: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896'],
      dark: ['#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7'],
      material: ['#e51c23', '#673ab7', '#5677fc', '#03a9f4', '#00bcd4', '#259b24', '#ffeb3b', '#ff9800']
  };

  return {
      restrict: 'EAC',
      scope: {
        config: '='
    },
    template: '<div></div>',
    replace: true,
    link: function(scope, element, attrs) {
        //available option to show gridlines for chart
        //assign a type of line if undefined
        if(!scope.config.type) scope.config.type = 'line';

        //generate c3 chart data
        var chartData = scope.config;
        chartData.bindto = '#' + attrs.id;

        //Generating the chart
        var chart = c3.generate(chartData);
        c3Factory.register(attrs.id, chart);
        // bind resize event

        scope.$on("c3.resize", function(e, data) {
          chart.resize();
        });
    }
};
}]);
}(c3))
