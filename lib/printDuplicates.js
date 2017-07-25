var colors = require('colors/safe');

module.exports = function (duplicates) {
    duplicates.forEach(function (duplicate) {
        console.log(`Duplicate module ${duplicate.duplicate.name} found in webpack configuration ${duplicate.configuration}`);
        console.log(colors.green(`\t${duplicate.existing.location}`));
        console.log(colors.red(`\t${duplicate.duplicate.location}\n`));
    });
};
