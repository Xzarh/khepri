var fs = require('fs');
var path = require('path');

var mkdirp = require('mkdirp');

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var index = path.join(__dirname, 'index');
var khepri_compile = require(index).compile.compile;
var lexer = require(index).lex.lexer;
var parser = require(index).parse.parser;

var KHEPRI_EXT = /^\.kep$/i;


var compile = function(input, options) {
    try {
        var lex = lexer.lex(input);
        var ast = parser.parseStream(lex);
        var unparsed = unparse.unparse(khepri_compile.compile(ast, options));
        return unparse_print.print(unparsed);
    } catch (e) {
        console.error(e + '');
        process.exit(1);
    }
};

var compileFile = function(inFile, outFile, header, options) {
    fs.realpath(inFile, function(err, resolvedPath) {
        if (err) throw err;
        
        // Walk sub directories and compile all `*.kep` files.
        if (fs.lstatSync(resolvedPath).isDirectory())
            return fs.readdir(resolvedPath, function(err, files) {
                files.forEach(function(file) {
                    var subPath = path.join(inFile, file);
                    
                    if (fs.lstatSync(subPath).isDirectory()){
                        return compileFile(
                            subPath,
                            outFile && path.join(outFile, file),
                            header,
                            options);
                    }
                    
                    if (path.extname(file).match(KHEPRI_EXT))
                        return compileFile(
                            subPath,
                            outFile && path.join(outFile, path.basename(file, '.kep') + '.js'),
                            header,
                            options);
                });
            });
        
        fs.readFile(resolvedPath, 'utf8', function(err, data) {
            if (err) throw err;
            
            if (outFile)
                console.log("Khepri'" + inFile + "' to:'" + outFile + "'");
            
            var out = header + compile(data, options);
            if (outFile) {
                // create output directory if not exists
                mkdirp(path.dirname(outFile), function(err) {
                    fs.writeFile(outFile, out, 'utf8', function(err) {
                        if (err) throw err;
                    });
                });
                console.log("Compiled '" + inFile + "' to '" + outFile + "'");
            } else {
                process.stdout.write(out);
            }
        });
    });
};


// Arguments
var argv = require('optimist')
    .usage('Compile Khepri to Javascript.\nUsage: $0')
    .demand(1)
    .options('header', {
        'default': ''
    })
    .describe('header', "Javascript header to prefix output file.")
    .boolean('version')
    .describe('version', "Print version number")
    .argv;

if (argv.version) {
    console.log("s");
    return 0;
}

var inFile = argv._[0],
    outFile = argv['o'],
    header = (argv['header'] ? argv['header'] + '\n' : '');

var options = {};
if ('package_manager' in argv) options.package_manager = argv.package_manager;

compileFile(inFile, outFile, header, options);
