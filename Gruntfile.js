module.exports = function (grunt) {

    var path = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            app: [
                '<%= pkg.options.app_build %>*',
                '<%= pkg.options.app_test %>*',
                '!<%= pkg.options.app_test %>.gitkeep',
            ]
        },
        copy: {
            app_build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.options.libs %>bootstrap/dist',
                        src: ['**'],
                        dest: '<%= pkg.options.dist %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= pkg.options.libs %>font-awesome/fonts',
                        src: ['**'],
                        dest: '<%= pkg.options.dist %>fonts/'
                    }
                ]
            }
        },
        cssmin: {
            app_build: {
                files: {
                    '<%= pkg.options.dist %>css/main.min.css': [
                        '<%= pkg.options.libs %>bootstrap/dist/css/bootstrap.css',
                        '<%= pkg.options.app_build %>css/main.min.css',
                        '<%= pkg.options.libs %>angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
                        '<%= pkg.options.libs %>font-awesome/css/font-awesome.min.css'
                    ]
                }
            },
        },
        jade: {
            app_build: {
                files: {
                    '<%= pkg.options.app_build %>templates/': ['<%= pkg.options.app_src %>ts/**/*.jade']
                },
                options: {
                    extension: '.html',
                    client: false,
                    pretty: true
                }
            },
        },
        less: {
            app_build: {
                options: {},
                files: {
                    "<%= pkg.options.app_build %>css/main.min.css": [
                        "<%= pkg.options.app_src %>less/main.less"
                    ]
                }
            },
        },
        karma: {
            app_ci: {
                configFile: 'karma_app.conf.js',
                options: {
                    singleRun: true
                }
            },
        },
        ngtemplates: {
            app_build: {
                cwd: '<%= pkg.options.app_build %>',
                src: ['templates/*.html'],
                dest: '<%= pkg.options.app_build %>js/template.js',
                options: {
                    standalone: true,
                    module: 'templates',
                    prefix: '/'
                }
            },
        },
        tslint: {
            app_build: {
                options: {
                    configuration: grunt.file.readJSON("tslint.json")
                },
                files: {
                    src: ['<%= pkg.options.app_src %>ts/**/*.ts', '<%= pkg.options.app_src %>tests/**/*.ts']
                }

            },
        },
        typescript: {
            app_build: {
                src: [
                    '<%= pkg.options.app_src %>ts/*.ts',
                    '<%= pkg.options.app_src %>ts/**/*.ts'
                ],
                dest: '<%= pkg.options.app_build %>js/app.ts.js',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    sourceMap: true,
                    declaration: true,
                    removeComments: true,
                    references: [
                        '<%= pkg.options.app_src %>typings/tsd.d.ts'
                    ]
                }
            },
            app_karma: {
                src: [
                    '<%= pkg.options.app_src %>ts/*.ts',
                    '<%= pkg.options.app_src %>ts/**/*.ts'
                ],
                dest: '<%= pkg.options.app_test %>',
                options: {
                    references: [
                        '<%= pkg.options.app_src %>typings/tsd.d.ts'
                    ]
                }
            },
        },
        tsd: {
            app_build: {
                options: {
                    command: 'reinstall',
                    latest: true,
                    config: 'tsd_app.json'
                }
            },
        },
        uglify: {
            options: {
                mangle: false,

                sourceMap: true
            },
            app_build: {
                src: [
                    '<%= pkg.options.app_build %>js/template.js',
                    '<%= pkg.options.app_build %>js/app.ts.js'
                ],
                dest: '<%= pkg.options.dist %>js/app.min.js'
            },
            app_build_libs: {
                src: [
                    '<%= pkg.options.libs %>angular/angular.js',
                    '<%= pkg.options.libs %>angular-ui-router/release/angular-ui-router.js',
                    '<%= pkg.options.libs %>angular-ui-bootstrap/dist/ui-bootstrap.js',
                    '<%= pkg.options.libs %>angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
                ],
                dest: '<%= pkg.options.dist %>js/lib.min.js'
            },
        },
        watch: {
            app_css: {
                options: {
                    spawn: true
                },
                files: ['<%= pkg.options.app_src %>/less/**'],
                tasks: ['less:app_build', 'cssmin:app_build']
            },
            app_jade: {
                options: {
                    spawn: true
                },
                files: ['<%= pkg.options.app_src %>ts/**/*.jade'],
                tasks: ['jade:app_build', 'ngtemplates:app_build', 'uglify:app_build']
            },
            app_ts: {
                options: {
                    spawn: true
                },
                files: ['<%= pkg.options.app_src %>ts/**/*.ts'],
                tasks: ['typescript:app_build', 'uglify:app_build']
            },
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('load-grunt-tasks')(grunt, {scope: 'dependencies'});
    require('time-grunt')(grunt);


    grunt.registerTask('app-build', ['copy', 'tsd:app_build', 'less:app_build', 'cssmin:app_build', 'jade:app_build', 'ngtemplates:app_build', 'tslint', 'typescript:app_build', 'uglify:app_build', 'uglify:app_build_libs']);
    grunt.registerTask('app-dev', ['app-build', 'watch']);
    grunt.registerTask('app-tests', ['typescript:app_karma', 'karma:app_ci']);

    grunt.registerTask('app', ['clean:app', 'app-build', 'app-tests']);
    grunt.registerTask('vm', ['clean:app', 'app-build']);

    grunt.registerTask('default', ['app']);
};
