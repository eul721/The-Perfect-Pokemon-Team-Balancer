var Bookshelf = require('./bookshelf.js');
var mAbility = require('./ability.js');
var mType = require('./types.js');




var mPokemon = Bookshelf.Model.extend({
	tableName: 'pokemon',
	abilities : function(){
		return this.belongsToMany(mAbility,'pokemon_abilities');
	},
	hiddenAbility : function(){
		return this.belongsToMany(mAbility,'pokemon_abilities').query('where','is_hidden','=',1);
	},
	nonHiddenAbilities: function(){
		return this.belongsToMany(mAbility,'pokemon_abilities').query('where','is_hidden','=',0);
	},
	types: function(){
		return this.belongsToMany(mType,'pokemon_types');
	}
	
});


module.exports = mPokemon;