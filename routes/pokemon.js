var fs = require('fs');
var request = require('request');
var sqlite = require('sqlite3').verbose();
var path = require('path');
var db = new sqlite.Database(path.join(__dirname , '../libs/pokedex.sqlite'));

var Pokemon = require(__dirname + '/../models/pokemon.js');

var IMGPATH = path.join(__dirname , '../assets/images/pokemon_icons');

//TODO: Require Settings File

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

 	var eevee = new Pokemon({'identifier':req.params.id.toLowerCase()}).fetch().then(function(model){
 		if (!model) res.send('not_found');
 		else model.load(['abilities','hiddenAbility','nonHiddenAbilities','types']).then(function(model){
 			res.json(model);
 		})
 	})
 	console.log(JSON.stringify(eevee));
 	/*db.serialize(function(){
 		
 		db.get("SELECT * FROM pokemon WHERE identifier = ?",req.params.id,function(err,row){
 			if (err) console.error('Error' + err);
 			console.log(row);
 			res.json(row);
 		});
 	})*/
 	
 	/*getPokemonData(req.params.id,function(err,pokemon){
 		res.json(pokemon);
 	})*/
 	
 }

 exports.cachePokemons = function(req,res){
 	Pokemon.collection().fetch({withRelated:['abilities','types']}).then(function(collection){

 		//console.log(collection);
 		res.json(collection);
 	})
 }

 exports.pokemonImg = function(req,res){
 	var pokeId = req.params.id;
 	var pokeImgPath = path.join(IMGPATH , pokeId + '.png');
 	console.log(pokeImgPath);
 	if(fs.existsSync(pokeImgPath))
 		res.sendfile(pokeImgPath)
	else
		res.send(404,'None Existent');
 }