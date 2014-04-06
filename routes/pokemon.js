var request = require('request');
/*	
 * This file is dedicated to all pokemon related calls
 */

 function getPokemonData(id,callback){
 	//make the 2 calls async but wait until both are done.

 	request('http://pokeapi.co/api/v1/pokemon/'+id,function(err,basicResponse,basicData){
 		if(err) throw err;
 		if(!err && basicResponse.statusCode == 200){
 			var pokemonBasicData = JSON.parse(basicData);
 			callback(err,pokemonBasicData);
 		}
 		
 	})
 }

 exports.getPokemon = function(req,res){

 	getPokemonData(req.params.id,function(err,pokemon){
 		res.json(pokemon);
 	})
 	
 }