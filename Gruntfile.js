module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      themes: {
        options: {
          paths: ["less/startup/themes"]
        },
        files: [{
          expand: true,
          cwd: "less/startup/themes",
          src: ["*.less"],
          dest: "css/",
          ext: ".css"
        }]
      },
      main: {
        files: {
          "css/startup.css": "less/startup/startup.less"
        }
      }
    },
    watch: {
      files: 'less/startup/**/*.less',
      tasks: ['less:themes', 'less:main']
    },
    wkhtmltopdf: {
      development: {
        src: 'docs/startup.html',
        dest: 'docs/'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 1
      },
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wkhtmltopdf');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less:main', 'less:themes','cssmin:minify', 'wkhtmltopdf:development']);
}
