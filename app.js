
/**
 * Module dependencies.
 */


var express = require('express');
var routes = require('./routes');
var pokemon = require('./routes/pokemon')
var settings = require('./settings');

//global. Should be read only.



var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

global.settings = require('./settings');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//console.log(Bookshelf);

//routes
//app.get('/', routes.index); //info page, landing page etc.
app.get('/pokemon/:id',pokemon.getPokemon); 
app.get('/cache_pokes',pokemon.cachePokemons);
app.get('/get_pokeImg/:id',pokemon.pokemonImg);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
