#!/usr/bin/env node

var argv = require('yargs')
    .usage('Usage: webpack-stats-duplicates <stats.json>')
    .demand(1, 'Please specify a <stats.json> file.')
    .normalize()
    .option('c', {
        describe: 'Specify the location of the .wsdrc file',
        alias: 'config',
        normalize: true
    })
    .option('d', {
        describe: 'Do not use the .wsdrc file',
        alias: 'disable-config',
        boolean: true
    })
    .option('w', {
        describe: 'Comma separated list of whitelisted module paths',
        alias: 'whitelist',
        string: true
    })
    .help('h')
    .alias('h', 'help')
    .argv;

var fs = require('fs');
var loadConfig = require('./lib/loadConfig');
var findDuplicates = require('./lib/findDuplicates');
var printDuplicates = require('./lib/printDuplicates');
var file = argv._[0];

// Parse the stats.json file
var json;
try {
    json = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (e) {
    console.log(`Invalid file: ${file}\n`);
    process.exit(1);
}

var options = {};

// --disable-config option
if (!argv.disableConfig) {
    // --config option
    loadConfig(argv.config, function (err, opts) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        options = opts;
    });
}

// --whitelist option
if (argv.whitelist) {
    options.whitelist = argv.whitelist.split(',');
}

var duplicates = findDuplicates(json, options);
printDuplicates(duplicates);

// Error code (1) if there are any duplicate results
process.exit(Math.min(duplicates.length, 1));
