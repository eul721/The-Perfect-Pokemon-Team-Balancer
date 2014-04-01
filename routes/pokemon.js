var request = require('request');
/*	
 * This file is dedicated to all pokemon related calls
 */

 function getBasicAndDexData(id,callback){
 	//make the 2 calls async but wait until both are done.

 	request('http://pokeapi.co/api/v1/pokemon/'+id,function(err,basicResponse,basicData){
 		if(err) throw err;
 		if(!err && basicResponse.statusCode == 200){
 			var pokemonBasicData = JSON.parse(basicData);
 			request('http://pokeapi.co/api/v1/pokedex/'+id,function(err,dexResponse,dexData){
 				if(err) throw err;
 				if(!err && dexResponse.statusCode == 200){
 					var pokemonDexData = JSON.parse(dexData);
 					var pokemon = {
 						"id" : id,
 						"basicData" : pokemonBasicData,
 						"dexData" : pokemonDexData

 					};
 					callback(err,pokemon);
 				}
 			})
 		}
 		
 	})
 }

 exports.getPokemon = function(req,res){

 	getBasicAndDexData(req.params.id,function(err,pokemon){
 		res.json(pokemon);
 	})
 	
 }