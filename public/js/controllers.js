var PokemonTeamRater = angular.module('PPTRControllers',['ui.bootstrap']);

PokemonTeamRater.controller('Pokes',function($scope,$http){
	
	$http({method:'GET',url:'/cache_pokes'})
		.success(function(data,status,header,config){
			$scope.cache_pokes = data;
			
		})
		.error(function(data,status,header,config){
			console.error('Error caching pokes')
		});

	$scope.pokes = [
		{'name':null
		},
		{'name':null

		},
		{'name':null

		},
		{'name':null

		},
		{'name':null

		},
		{'name':null

		},
	]

	

	
	$scope.testing = 'test';

	$scope.testFunc = function(variable){
		console.log($scope.pokes);
	}

	$scope.change = function(index){
		console.log($scope.pokes[index].name);
	}
	$scope.test = function(index){
		console.log('Pokes' + JSON.stringify($scope.pokes[index]));
		
		$http({method:'GET',url:'/pokemon/'+$scope.pokes[index].name})
			.success(function(data,status,header,config){
				if(data!=='not_found'){
					$scope.pokes[index].ajaxReq = data;
					
				}
				else $scope.pokes[index].ajaxReq = 'has-error';
			}).error(function(data,status,header,config){

			})
	}
	$scope.searchForPokeByName = function(pokeName){

	}
}).directive('simulateclick',function($timeout){


	return {
		restrict: 'A',

		link: function($scope,element, attrs){
			console.log($scope);
			console.log(element);
			console.log(attrs);
			element.bind('focus',function(){
				$timeout(function(){
					console.log(element[0].parentNode.className);
					if(element[0].parentNode.className.indexOf('open') == -1)
						element[0].click();	
				},200);
				
			})
		}
	}
});