var buildHierarchy = require('./buildHierarchy');

/**
 * @param json {object} The stats.json object
 * @param opts.whitelist {array} An array of whitelisted module paths
 */
module.exports = function (json, opts) {
    var options = opts || {};
    var hierarchies = buildHierarchy(json);
    var duplicates = [];

    hierarchies.forEach(function (hierarchy, i) {
        var modules = {};
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
                                    duplicate: child,
                                    configuration: i
                                });
                            }
                        } else {
                            modules[child.name] = child;
                        }
                    });
                }
            }
        }
    });

    return duplicates;
};
