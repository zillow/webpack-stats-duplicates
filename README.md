# webpack-stats-duplicates

A utility for examining webpack stats.json files and looking for duplicate module imports. Inspired by [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/), an excellent tool for visualizing your webpack bundle.

## CLI

### Installation

```
$ npm install -g webpack-stats-duplicates
```

### Usage

```
$ webpack-stats-duplicates stats.json
```
![Usage example](examples/example.png?raw=true)

Use the `--help` flag to see all command line options.

### Config file

You can create a configuration file with options such as `whitelist` to be used when running.
The utility will look for a `.wsdrc` file in the current working directory,
or you can specify the location of the file with `--config` on the command line.
See [`findDuplicates`](#findduplicatesjson-options--array) for all available configuration options.

## API

### Installation

```
$ npm install --save webpack-stats-duplicates
```

### `findDuplicates(json[, options]) => Array`

#### Arguments

1. `json` (`Object`): The stats json object from webpack
2. `options` (`Object` [optional])
3. `options.whitelist` (`Array` [optional]): An array of duplicate paths to ignore

#### Returns

`Array`: An array of found duplicates.

#### Example

```
import { findDuplicates } from 'webpack-stats-duplicates';

const duplicates = findDuplicates(json, {
  whitelist: [ '/node_modules/flux/node_modules/fbjs' ]
});
```
