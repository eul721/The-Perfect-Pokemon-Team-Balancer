var Bookshelf = require('bookshelf');
var path = require('path');

//Setup Bookshelf
Bookshelf = Bookshelf.initialize({
	'client' : 'sqlite3',
	'connection' : {
		filename: './libs/pokedex.sqlite'
	}
});

module.exports = Bookshelf;