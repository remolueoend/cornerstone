module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            default: {
                src: [
                    'dist'
                ]
            }
        },
        copy: {
            bower: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery/dist/jquery.min.map',
                ],
                dest: 'example',
                expand: true,
                flatten: true
            }
        },
        concat: {
            build: {
                src: ['src/cjsHeader.js', 'src/**/*.js', '!src/footer.js', 'src/footer.js'],
                dest: 'build/built.js'
            },
            css: {
                options: {
                    stripBanners: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                    '| (c) 2014 Chris Hafey | https://github.com/chafey/cornerstone */\n'
                },
                src: ['src/cornerstone.css'],
                dest: 'dist/cornerstone.css',
            },
            dist: {
                options: {
                    stripBanners: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                    '| (c) 2014 Chris Hafey | https://github.com/chafey/cornerstone */\n'
                },
                src: ['build/built.js'],
                dest: 'dist/cornerstone.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/cornerstone.min.js': ['dist/cornerstone.js']
                }
            },
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                '| (c) 2014 Chris Hafey | https://github.com/chafey/cornerstone */\n'
            }
        },
        jshint: {
            files: [
                'src/*.js'
            ]
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'test/**/*'],
                tasks: ['buildAll']
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/cornerstone.min.css': ['dist/cornerstone.css']
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('buildAll', ['copy', 'concat', 'uglify', 'jshint', 'cssmin']);
    grunt.registerTask('default', ['clean', 'buildAll']);
};