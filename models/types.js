var Bookshelf = require('./bookshelf.js');

var mTypes = Bookshelf.Model.extend({
	tableName: 'types',
})

module.exports = mTypes;