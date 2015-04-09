# grunt-version-file

[![NPM version](https://badge.fury.io/js/grunt-version-file.svg)](http://badge.fury.io/js/grunt-version-file)
[![Build Status](https://travis-ci.org/cfogelberg/grunt-version-file.svg?branch=master)](https://travis-ci.org/cfogelberg/grunt-version-file)
[![Coverage Status](https://coveralls.io/repos/cfogelberg/grunt-version-file/badge.png)](https://coveralls.io/r/cfogelberg/grunt-version-file)
[![Dependency status](https://david-dm.org/cfogelberg/grunt-version-file/status.png)](https://david-dm.org/cfogelberg/grunt-version-file#info=dependencies&view=table)
[![Dev Dependency Status](https://david-dm.org/cfogelberg/grunt-version-file/dev-status.png)](https://david-dm.org/cfogelberg/grunt-version-file#info=devDependencies&view=table)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM](https://nodei.co/npm/grunt-version-file.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-version-file/)

> Writes code provenance information to a JSON file for deployment alongside the application

Knowing exactly which version of the application has been deployed is crucial for debugging, but it is difficult without careful record keeping. One solution to this problem is to automatically generate a file with code provenance information that is deployed alongside the application. This plugin does that.

An example version file:

```js
{
  "datestring": "Sun Oct 12 2014 13:21:08",
  "npm_version": "1.0.1",
  "git_describe": "v0.1.4-0-g8209160"
}
```

## Getting Started

This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-version-file --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-version-file');
```

## The "version_file" task

### Overview and Usage
In your project's Gruntfile, add a section named `version_file` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    version_file: {
      make: {
        options: {
          out: ["some/file/path.json"],
          generator_list: ["foo", "bar"],
          generator_dir: "some_directory_in_grunt_version_file"
        }
      }
    }
});
```

### Options

#### options.out
- Type: `String`
- Purpose: Output file path to write to
- Default value: None, required

#### options.generator_list
- Type: `Array` of ``String`
- Purpose: Specify the list of version file value generators to use
- Default value: ["datestring", "npm_version", "git_describe"]

#### options.generator_dir
- Type: `String`
- Purpose: Specify the path to the directory with value generator definitions
- Default value: "generators"

### Generators

grunt-version-file uses a plugin architecture to generate key value-entries for code provenance. It is deployed wih several generators and you can easily create your own. Please make a pull request if you do!

A generator plugin is made available to the grunt-version-file plugin via a javascript file which exports an object with a `label` function, a `value` function and (optionally) an `init` function. These functions must operate synchronously and must wait for any asynchronous operations to complete before returning to their caller.

The `label_value` function an object containing a label field with the String label for this generator and a value field containing the (possibly build-specific) String value of this generator's field for the version file.

The `init` function is executed before the value or label function are called.

A generator's name in the `generator_list` option is the filename without the .js extension. It is recommended that this is the same as the generator's label, but it is not required.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

### Adding generators

To add a generator create a new file in the `lib/generators` directory which exports an object with a `label`, `value` and optionally an `init` function. See the included generators for examples.

### Code smells and future development

The following could be better, code contributions welcome :)

- The tests don't use mock objects for GVF classes, they should
- Stub functions are used in tests in place of Grunt's Task.done() or a mock
- The generator init functions are not executed at construction and initialisation but just before label_value is called
- Further generalise output_creator (e.g. add XmlCreator), specify which to use via the Gruntfile configuration

## Changelog

- _0.1.0_ - Initial release
- _0.1.1_ - Readme fixes and Travis CI
- _0.2.0_ - Async generators, generalised output creator API for easy generation of other output formats
- _0.2.1_ - Bug fix - added missing `q` dependency
- _0.2.2_ - Dev dependency update

## License

Copyright (c) 2014 Christo Fogelberg

Licensed under the MIT License
