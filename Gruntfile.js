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
			},
			angular_bootstrap: {
				files:{
					'public/libs/angular-bootstrap.js' : ['bower_components/angular-bootstrap/ui-bootstrap.js'],
					'public/libs/angular-bootstrap-tpls.js' : ['bower_components/angular-bootstrap/ui-bootstrap-tpls.js']
				}
			},
			bootstrap : {
				files: {
					'public/stylesheets/bootstrap.css' : ['bower_components/bootstrap/dist/css/bootstrap.css']
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'node_modules/**/*.js',
					'public/**/*',
					'models/**/*',
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

	grunt.registerTask('default',['concat','express:dev','watch']);
	
};