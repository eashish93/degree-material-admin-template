;(function() {
    'use strict';

    angular.module('app.tables.ctrls', [])

    .controller('TableDemoCtrl', ['$scope', '$q', '$http', '$timeout', function($scope, $q, $http, $timeout) {

        $scope.staticData = [
            {
    			post: "My First Blog",
    			author: "Johnny",
    			categories: "WebDesign",
    			tags: ["wordpress", "blog"],
    			date: "20-3-2004",
                tagColor: 'green-500'
    		},
    		{
    			post: "How to Design",
    			author: "Jenifer",
    			categories: "design",
    			tags: ["photoshop", "illustrator"],
    			date: "2-4-2012",
                tagColor: 'blue-500'
    		},
    		{
    			post: "Something is missing",
    			author: "Joe",
    			categories: "uncategorized",
    			tags: ["abc", "def", "ghi"],
    			date: "20-5-2013",
                tagColor: 'red-500'
    		},
    		{
    			post: "Learn a new language",
    			author: "Rinky",
    			categories: "language",
    			tags: ["C++", "Java", "PHP"],
    			date: "10-5-2014",
                tagColor: 'brown-500'
    		},
    		{
    			post: "I love singing. Do you?",
    			author: "AJ",
    			categories: "singing",
    			tags: ["music"],
    			date: "2-10-2014",
                tagColor: 'orange-500'
    		}
        ];

        // data table via json
        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];
        $scope.query = {
            order: 'name', limit: 5, page: 1
        };
        $scope.columns = [
            {name: 'Dessert', orderBy: 'name', unit: '100g serving'},
            {descendFirst: true, name: 'Type', orderBy: 'type'},
            {name: 'Calories', numeric: true, orderBy: 'calories.value'},
            {name: 'Fat', numeric: true, orderBy: 'fat.value', unit: 'g'},
            {name: 'Protein', numeric: true, orderBy: 'protein.value', trim: true, unit: 'g'},
            {name: 'Iron', numeric: true, orderBy: 'iron.value', unit: '%'}
        ];

        $http.get('scripts/tables/sample.json').then(function(desserts) {
            $scope.desserts = desserts.data;
        });

        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };

        $scope.getTypes = function () {
            return ['Candy', 'Ice cream', 'Other', 'Pastry'];
        };

        $scope.onPaginate = function(page, limit) {
            console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
            console.log('Page: ' + page + ' Limit: ' + limit);

            $scope.promise = $timeout(function () {

            }, 2000);
        };


    }])


}())
