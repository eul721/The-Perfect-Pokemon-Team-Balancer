var Bookshelf = require('./bookshelf.js');
var mPokemon = require('./pokemon.js');

var mAbility = Bookshelf.Model.extend({
	tableName: 'abilities',
	pokemons : function(){
		return this.belongsToMany(mPokemon,'pokemon_abilities');
	}
})


module.exports = mAbility;