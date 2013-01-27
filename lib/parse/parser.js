/**
 * @fileOverview
 */
define(['parse/parse',
        'stream',
        'ecma/ast/token',
        'ecma/parse/program'],
function(parse,
        stream,
        astToken,
        program){
//"use strict";

/* Streams
 ******************************************************************************/
/**
 * Filters lexer stream to remove whitespace and comments.
 */
var langElementStream = (function(){
    var whitespaceFilter = function(x) {
        return (x.type !== 'WhiteSpace');
    };
    
    var commentFilter = function(s) {
        if (!stream.isEmpty(s)) {
            var first = stream.first(s);
            if (first.type === 'Comment') {
                // TODO: add check for new line in comment and replace with line terminator 
            }
            
        }
        return s;
    };
    
    return function(s) {
        return commentFilter(stream.filter(s, whitespaceFilter));
    };
}());

/**
 * 
 */
var lineTerminatorStream = function(s) {
    if (stream.isEmpty(s)) {
        return s;
    }
    var first = stream.first(s),
        rest = stream.rest(s);
    if (first.type === 'LineTerminator' && !stream.isEmpty(rest)) {
        var next = stream.first(rest);
        var tok = new astToken.Token(next.type, next.value, next.loc);
        tok.lineTerminator = true;
        return lineTerminatorStream(stream.cons(tok, stream.rest(rest)));
    }
    return stream.stream(first, lineTerminatorStream.bind(undefined, rest));
};


/**
 * Maps a lex stream to a parse stream.
 * 
 * @param s Lex stream.
 * 
 * @return Stream suitable for parsing.
 */
var parserStream = function(s) {
    return lineTerminatorStream(langElementStream(s));
};

/* Running
 ******************************************************************************/
var parseStream = function(s) {
    return parse.runStream(program.program, parserStream(s));
};

var parseInput = function(input) {
    return parseStream(stream.from(input));
};

/* Export
 ******************************************************************************/
return {
    'parserStream': parserStream,
    
    'parse': parseInput,
    'parseStream': parseStream
};

});