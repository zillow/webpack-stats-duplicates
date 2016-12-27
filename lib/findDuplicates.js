var buildHierarchy = require('./buildHierarchy');

/**
 * @param json {object} The stats.json object
 * @param opts.whitelist {array} An array of whitelisted module paths
 */
module.exports = function (json, opts) {
    var options = opts || {};
    var hierarchy = buildHierarchy(json);
    var modules = {};
    var duplicates = [];

    var queue = hierarchy.children.slice();
    while (queue.length) {
        var node = queue.shift();
        if (node.children) {
            queue = queue.concat(node.children);

            if (node.name === 'node_modules') {
                node.children.forEach((child) => {
                    var existing = modules[child.name];
                    if (existing) {
                        if (!options.whitelist || options.whitelist.indexOf(child.location) < 0) {
                            duplicates.push({
                                existing: existing,
                                duplicate: child
                            });
                        }
                    } else {
                        modules[child.name] = child;
                    }
                });
            }
        }
    }

    return duplicates;
};
