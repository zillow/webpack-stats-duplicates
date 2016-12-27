#!/usr/bin/env node

var findDuplicates = require('./lib/findDuplicates');
var printDuplicates = require('./lib/printDuplicates');
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var file = argv._[0];

function help() {
    console.log('Usage: webpack-stats-duplicates [stats.json]');
}

if (argv.h || argv.help || !file) {
    help();
    process.exit();
}

var json;
try {
    json = JSON.parse(fs.readFileSync(`./${file}`, 'utf8'));
} catch (e) {
    console.log(e);
    console.log(`Invalid file: ${file}\n`);
    help();
    process.exit(1);
}

// --config option
var config;
if (argv.config) {
    config = `./${argv.config}`;
} else {
    var DEFAULT_CONFIG = './.webpack-stats-duplicates-rc';
    if (fs.existsSync(DEFAULT_CONFIG)) {
        config = DEFAULT_CONFIG;
    }
}

var options = {};

// Load configuration from rc file unless --no-config
if (config && argv.config !== false) {
    try {
        options = JSON.parse(fs.readFileSync(config, 'utf8'));
    } catch (e) {
        console.log(`Invalid configuration file: ${path.normalize(config)}`);
        process.exit(1);
    }
}

// --whitelist option
if (argv.whitelist) {
    options.whitelist = argv.whitelist.split(',');
}

var duplicates = findDuplicates(json, options);
printDuplicates(duplicates);

// Error code (1) if there are any duplicate results
process.exit(Math.min(duplicates.length, 1));
