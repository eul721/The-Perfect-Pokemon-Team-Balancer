module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				seperator: "\n", //add a new line after each file
				banner : "", //added before everything
				footer : "" //added after everything
			},
			angular: {
				files:{
					'public/libs/angular.js' : ['bower_components/angular/angular.js']
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'node_modules/**/*.js',
					'public/**/*',
					'routes/**/*',
					'views/**/*',
					'models/**/*',
					'app.js'
				],
				tasks: ['concat:angular','express:dev'],
				options: {
					spawn:false
				}
			}	
		},
		express:{
			dev: {
				options: {
					script: 'app.js'
				}
			},
			prod: {
				options:{
					script: 'app.js',
					node_env: 'production'
				}
			},
			test: {
				options:{
					script: 'app.js',
					node_env: 'test'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('server',['concat:angular','express:dev','watch']);
	
};