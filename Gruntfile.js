/**
 * @date     2015/4/13
 * @author   Dolphin<dolphin.w.e@gmail.com>
 */

'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        dir: {
            src: 'src',
            build: 'build',
            release: 'release',
            plugins: '/plugins'
        },

        testDir: {
            base: 'test',
            assets: '<%= testDir.base %>/assets',
            js: '<%= testDir.assets %>/js',
            scss: '<%= testDir.assets %>/scss',
            images: '<%= testDir.assets %>/images',
            testCases: '<%= testDir.js %>/test-cases'
        },

        testOutput: {
            js: '<%= testDir.base %>/js',
            css: '<%= testDir.base %>/css',
            images: '<%= testDir.base %>/images'
        },

        tag: {
            banner: [
                '/*!',
                ' * <%= pkg.name %>',
                ' * <%= pkg.description %>',
                ' * <%= pkg.url %>',
                ' * @author <%= pkg.author.name %> <%= pkg.author.url %>',
                ' * @version <%= pkg.version %>',
                ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.',
                ' */\n'
            ].join('\n')
        },

        // 获取信息
        pkg: grunt.file.readJSON('package.json'),

        // 清除残留
        clean: {
            build: {
                files: [{
                    dot: true,
                    src: ['<%= dir.build %>']
                }]
            },
            test: {
                cwd: '<%= testDir.base %>',
                files: [{
                    dot: true,
                    src: [
                        'css/*',
                        'js/*'
                    ]
                }]
            },
            release: {
                files: [{
                    dot: true,
                    src: ['<%= dir.release %>']
                }]
            }
        },

        // scss 编译
        sass: {
            test: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto'
                },
                files: [{
                    expand: true,
                    cwd: '<%= testDir.scss %>',
                    src: '*.scss',
                    dest: '<%= testOutput.css %>',
                    ext: '.css'
                }]
            }
        },

        // prefix
        autoprefixer: {
            options: {
                map: true
            },
            test: {
                src: '<%= testOutput.css %>/*.css'
            }
        },

        // 合并文件
        concat: {
            options: {
                stripBanners: true,
                sourceMap: true,
                nonull: true,
                separator: ';\n\n'
            },
            build: {
                src: '<%= dir.src %>/*.js',
                dest: '<%= dir.build %>/Slideshow.js'
            },
            test: {
                src: [
                    '<%= testDir.testCases %>/init.js',
                    '<%= testDir.testCases %>/NodeTree-init.js',
                    '<%= testDir.testCases %>/NodeTree/*.js',
                    '<%= testDir.testCases %>/NodeTree-footer.js',
                    //'<%= testDir.testCases %>/Slideshow-init.js',
                    //'<%= testDir.testCases %>/Slideshow/*.js',
                    //'<%= testDir.testCases %>/Slideshow-footer.js',
                    '<%= testDir.testCases %>/footer.js'
                ],
                dest: '<%= testOutput.js %>/test.js'
            }
        },

        // 复制文件
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.src %><%= dir.plugins %>',
                    src: ['*.js'],
                    dest: '<%= dir.build %><%= dir.plugins %>'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= testDir.js %>',
                    src: ['*.js'],
                    dest: '<%= testOutput.js %>'
                }, {
                    expand: true,
                    cwd: '<%= testDir.images %>',
                    src: ['*.*'],
                    dest: '<%= testOutput.images %>'
                }]
            },
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.build %>',
                    src: [
                        '**',
                        '!**/*.map'
                    ],
                    dest: '<%= dir.release %>'
                }]
            }
        },

        // 压缩 js
        uglify: {
            release: {
                options: {
                    banner: '<%= tag.banner %>',
                    mangle: {
                        except: ['NodeTree']
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.release %>',
                    src: '**/*.js',
                    dest: '<%= dir.release %>'
                }]
            }
        }
    });

    // 创建任务
    require('load-grunt-tasks')(grunt);

    // build
    grunt.registerTask('build', 'Compile source', [
        'clean:build',
        'concat:build',
        'copy:build'
    ]);

    // test
    grunt.registerTask('test', 'Compile test cases', [
        'build',
        'clean:test',
        'concat:test',
        'copy:test',
        'sass:test',
        'autoprefixer:test'
    ]);

    // release
    grunt.registerTask('release', 'Build and compress', [
        'clean:release',
        'build',
        'copy:release',
        'uglify'
    ]);

    grunt.registerTask('default', 'Compile source and test cases', [
        'build',
        'test'
    ]);
};