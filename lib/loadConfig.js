var fs = require('fs');
var DEFAULT_FILENAME = './.wsdrc';

module.exports = function (filename, callback) {
    var error, options = {};

    // If no filename is given, try to load the default config
    if (!filename) {
        if (fs.existsSync(DEFAULT_FILENAME)) {
            filename = DEFAULT_FILENAME;
        } else {
            // No config exists, return empty options
            callback(error, options);
            return;
        }
    }

    try {
        options = JSON.parse(fs.readFileSync(filename, 'utf8'));
    } catch (e) {
        error = 'Invalid configuration file: ' + filename;
    }

    callback(error, options);
};
