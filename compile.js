var requirejs = require('requirejs');
var fs = require('fs');
var argv = require('optimist').argv;

requirejs.config({
    nodeRequire: require,
    paths: {
        'parse': 'dependencies/parse/lib',
        'nu': 'dependencies/nu/lib',
        'ecma_unparse': 'dependencies/ecma-unparse/lib',
        'khepri': 'lib',
        'ecma': 'dependencies/parse-ecma/lib'
    }
});

requirejs(['parse/parse',
           'nu/stream',
           'khepri/lex/lexer', 'khepri/parse/parser', 'khepri/compile/transform',
           'ecma_unparse/unparse', 'ecma_unparse/print'],
function(parse,
        stream,
        lexer, parser, transform,
        unparse, unparse_print) {
    
    var compile = function(input) {
        try {
            var lex = lexer.lex(input);
            var ast = parser.parseStream(lex);
            var unparsed = unparse.unparse(transform.transform(ast));
            return unparse_print.print(unparsed);
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    };
    
    var inFile = argv._[0];
    var outFile = argv['o'];
    var header = (argv['header'] ? argv['header'] + '\n' : '');
	console.log(inFile)

    fs.realpath(inFile, function(err, resolvedPath) {
        if (err) {
            throw err;
        }

        fs.readFile(resolvedPath, 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
            var out = header + stream.foldl(function(p, c) { return p + '' + c; }, '', compile(data));
            
            if (outFile) {
                fs.writeFile(outFile, out, 'utf8', function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log("Compiled '" + inFile + "' to '" + outFile + "'");
                });
            } else {
                process.stdout.write(out);
                console.log("Compiled '" + inFile + "' to stdout");
            }
        });
    });
});