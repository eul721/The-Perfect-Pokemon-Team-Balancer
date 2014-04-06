var mongodb = require('mongodb');
var request = require('request');
var async = require('async');
var db = new mongodb.Db('pokemon-typing-app',new mongodb.Server('localhost',27017),{safe:true});

var POKEAPI_PREFIX = 'http://pokeapi.co';

db.open(function(err,db){
	var pokemonCollection = db.collection('pokemonCollection');

	var readNext = function(next,callback){
		request(next,function(err,res,body){


			var responseJSON = JSON.parse(body);
			var next = responseJSON.meta.next;
			var pokeData = responseJSON.objects; //this is an array;

			console.log(responseJSON);

			async.each(pokeData,function(poke,callback){
				var national_id = poke.national_id;
				pokemonCollection.update({"national_id" : national_id},poke,{"upsert":true},function(err,result){
					if (err) throw err;
					console.log(national_id);
				});
				callback();
			})
			

			if(next){
				callback(POKEAPI_PREFIX + next,readNext);	
			}else{
				db.close();
			}
			
		})
	}

	//algorithm
	/**
		1.GET pokeapi.co/api/v1/pokemon/. Read the metadata.
		2.Start collecting through pokeapi.co/api/v1/pokemon/?limit=100. This way, we are only
	*/

	/*request('http://pokeapi.co/api/v1/pokemon/?limit=100',function(err,res,body){
		console.log(JSON.parse(body));
	})*/

	readNext(POKEAPI_PREFIX + '/api/v1/pokemon/?limit=100',readNext);


	/*pokemonCollection.find({},function(err,doc){
		console.log('Doc' + JSON.stringify(doc));
		db.close();
	})*/
})

