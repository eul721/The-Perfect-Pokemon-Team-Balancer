var PokemonTeamRater = angular.module('PokemonTeamRater',['ui.bootstrap']);

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

	$scope.delayTimer = 0;

	
	$scope.testing = 'test';

	$scope.testFunc = function(variable){
		console.log(variable);
	}

	$scope.change = function(index){
		console.log($scope.pokes[index].name);
	}
	$scope.test = function(index){
		console.log('name : ' + name);
		
		$http({method:'GET',url:'/pokemon/'+$scope.pokes[index].name})
			.success(function(data,status,header,config){
				if(data!=='not_found'){
					$scope.pokes[index].ajaxReq = data;
					
				}
				else $scope.pokes[index].ajaxReq = 'has-error';
			}).error(function(data,status,header,config){

			})
	}
})