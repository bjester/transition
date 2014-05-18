// Gruntfile
var DEPLOY = 'build';

module.exports = function(grunt)
{
  var src = 
  [
    // Base
    'lib/core.js',
    'lib/generator/transform.js',
    'lib/generator/duration.js',
    'lib/handler/opactiy.js',
    'lib/handler/translate.js'
  ];
  
  // Project configuration.
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),
    uglify: 
    {
      build: 
      {
        options: 
        {
          banner: '/*! ' + [
            '<%= pkg.name %> v<%= pkg.version %>',
            '(c) 2014 Blaine Jester',
            '<%= grunt.template.today("yyyy-mm-dd") %>'
          ].join(' | ') + ' */\n',
          mangle: false,
          compress: false,
          beautify: true
        },
        src: src,
        dest: 'build/<%= pkg.name %>.js'
      },
      
      minify:
      {
        options: 
        {
          banner: '/*! ' + [
            '<%= pkg.name %> v<%= pkg.version %>',
            '(c) 2014 Blaine Jester',
            '<%= grunt.template.today("yyyy-mm-dd") %>'
          ].join(' | ') + ' */\n'
        },
        files:
        {
          'build/<%= pkg.name %>.min.js': 'build/<%= pkg.name %>.js'
        }
      }
    },
    
    clean: 
    {
      deploy: [ DEPLOY ]
    }
  });
  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', 
  [
    'clean', 
    'uglify:build', 
    'uglify:minify'
  ]);
  grunt.registerTask('build', 
  [
    'clean', 
    'uglify:build', 
    'uglify:minify'
  ]);
  grunt.registerTask('unbuild', ['clean']);
};
