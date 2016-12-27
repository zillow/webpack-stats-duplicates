# webpack-stats-duplicates

A utility for examining webpack stats.json files and looking for duplicate module imports.

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
