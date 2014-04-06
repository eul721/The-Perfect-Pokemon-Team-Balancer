var PokemonTeamRater = angular.module('PokemonTeamRater',[]);

PokemonTeamRater.controller('Pokes',function($scope,$http){
	$http({method:'GET',url:'/pokemon/1'})
		.success(function(data,status,header,config	){
			/*console.log('data' + JSON.stringify(data));
			console.log('status' + JSON.stringify(status));
			console.log('header' + JSON.stringify(header));
			console.log('config' + JSON.stringify(config));*/

		})
		.error(function(data,status,header,config){

		})
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

	$scope.change = function(index){
		console.log($scope.pokes[index].name);
	}
	$scope.test = function(index){
		
		
		$http({method:'GET',url:'/pokemon/1'})
			.success(function(data,status,header,config){
				console.log(index);
				console.log($scope.pokes);
				$scope.pokes[index].ajaxReq = data;
			}).error(function(data,status,header,config){

			})
	}
})