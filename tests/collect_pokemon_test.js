//this test will test the RESULTS of collect_pokemon.js by checking the docs fed into mongo. It will compare db's data to veekun's csv

var fs = require('fs');
var csv = require('csv');
var async = require('async');
var mongodb = require('mongodb');	
var chai = require('chai');
chai.should();



describe("testing",function(){
	it("should pass",function(mainTest){
		//this.timeout(10000);
		var MongoClient = mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/pokemon-typing-app',function(err,db){
			if (err) throw err;
			var pokemonCollection = db.collection('pokemonCollection');


		

			csv().from.stream(fs.createReadStream(__dirname+'/pokemon.csv'))
				.to.array(function(data){
					async.each(data,function(pokeRow,callback){
						var national_id = pokeRow[0];
						var name = pokeRow[1];
						describe(name,function(){
							it("should be found in pokemonCollection",function(done){

								pokemonCollection.findOne({"national_id" : parseInt(national_id)},{"name":1},function(err,doc){
									if (err) throw err;
									(doc.name.toUpperCase()).should.equal(name.toUpperCase());
									done();
									callback();
								});	
									

							})
							
						})
						
					},function(err){
						
						db.close();	
						
						
					});
			});
		})	
		setTimeout(mainTest,1000); //for some weird reason putting the callback inside the async.each's finally case causes error >_>
	})
	
})






