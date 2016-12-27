//import UglifyJS from '../uglifyjs';
//import 'imports?this=>window!../uglifyjs';


module.exports = function buildHierarchy(json) {
    var modules = json.modules;
    var maxDepth = 1;

    var root = {
        children: [],
        name: 'root'
    };

    modules.forEach(function addToTree(module) {
        var size = module.size;

        var mod = {
            id: module.id,
            fullName: module.name,
            size: size,
            reasons: module.reasons
        };

        var depth = mod.fullName.split('/').length - 1;
        if (depth > maxDepth) {
            maxDepth = depth;
        }

        var fileName = mod.fullName;

        var beginning = mod.fullName.slice(0, 2);
        if (beginning === './') {
            fileName = fileName.slice(2);
        }

        getFile(mod, fileName, root);
    });

    root.maxDepth = maxDepth;

    return root;
}


function getFile(module, fileName, parentTree) {
    var charIndex = fileName.indexOf('/');

    if (charIndex !== -1) {
        var folder = fileName.slice(0, charIndex);
        if (folder === '~') {
            folder = 'node_modules';
        }
        if (folder.charAt(0) === '@') {
            folder = fileName.slice(0, fileName.indexOf('/', charIndex + 1));
        }

        var childFolder = getChild(parentTree.children, folder);
        if (!childFolder) {
            var modulePath = module.fullName.replace(/~/g, 'node_modules');
            modulePath = modulePath.slice(0, modulePath.indexOf(folder) + folder.length);
            childFolder = {
                name: folder,
                location: modulePath,
                children: []
            };
            parentTree.children.push(childFolder);
        }

        getFile(module, fileName.slice(charIndex + 1), childFolder);
    } else {
        module.name = fileName;
        parentTree.children.push(module);
    }
}


function getChild(arr, name) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === name) {
            return arr[i];
        }
    }
}
