/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/program_parser.kep'
 * DO NOT EDIT
*/
;
define(["require", "parse/parse", "nu/stream", "ecma/parse/common", "khepri/parse/statement_parser", "ecma/parse/token_parser", "ecma/ast/program"], function(require, parse, stream, ecma_parse, statement, token, astProgram) {
    "use strict";
    var statementParser = function() {
        return require("khepri/parse/statement_parser").statement.apply(undefined, arguments);
    }
    ;
    var sourceElement = statementParser;
    var sourceElements = parse.eager(parse.many(sourceElement));
    var program = parse.Parser("Program", ecma_parse.node(parse.eager(parse.rec(function(self) {
        return parse.either(parse.next(parse.eof(), parse.always(stream.end)), parse.cons(sourceElement, self));
    }
    )), function(loc, elements) {
        return new astProgram.Program(loc, elements);
    }
    ));
    return ({
        "sourceElement": sourceElement,
        "sourceElements": sourceElements,
        "program": program
    });
}
);