var fs = require('fs');

module.exports = function (duplicates, filename) {
    if(duplicates) {
        duplicates = duplicates.map( dup => {
            var obj = {
                name: dup.duplicate.name,
                configuration: dup.configuration,
                existing: dup.existing.location,
                duplicate: dup.duplicate.location
            };
            return obj;
        })
        let data = JSON.stringify(duplicates);
        fs.writeFileSync(filename, data);
    }
};
