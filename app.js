(function(){
	'use strict'

	function MainController($scope){
		$scope.items = [];

		$scope.parse = function() {
			parse().then(function(data){
				$scope.items = data;
			});
		}
	}

	angular.module('parser', [])
	.controller('MainController', ['$scope', MainController]);
})();