'use strict';

var exec = require('child_process').exec;

module.exports = function (grunt) {

    grunt.registerTask('git-is-clean', 'Check if repository checkout is clean.', function () {

        var done = this.async();

        exec('git describe --tags --always --long --dirty', function (err, stdout, stderr) {
            if (err) {
                grunt.fail.fatal('Could not check for repo dirtyness:\n  ' + err);
            }
            if (stdout.toString().match(/dirty/)) {
                grunt.fail.fatal('Repository is dirty.');
            }
            done();
        });
    });
};

