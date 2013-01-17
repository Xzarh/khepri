/**
 * @fileOverview Parser for ECMAScript 5.1 Functions and Programs.
 */
define(['require',
        'parse/parse', 'parse/parse_eager',
        'stream',
        'ecma/parse/statement',
        'ecma/ast/declaration', 'ecma/ast/expression', 'ecma/ast/program',
        'ecma/parse/token'],
function(require,
        parse, parse_eager,
        stream,
        statement,
        astDeclaration, astExpression, astProgram,
        token){
"use strict";

/* Circular
 ******************************************************************************/
var statementParser = function() {
    return require('ecma/parse/statement').statement.apply(undefined, arguments);
};

/* Forward declarations
 ******************************************************************************/
var sourceElements = function() {
    return sourceElements.apply(undefined, arguments);
};

/* Parsers
 ******************************************************************************/
/**
 * Parser for the body of a function.
 */
var functionBody = sourceElements;

/**
 * Parser for a function's parameters.
 */
var formalParameterList = parse_eager.sepBy(token.punctuator(','),
    token.identifier);

// Function Expression
////////////////////////////////////////
/**
 * Parser for an function expression.
 * 
 * May be named or anon.
 */
var functionExpression = parse.binda(
    parse.sequence(
        token.keyword('function'),
        parse.optional(token.identifier),
        parse.between(token.punctuator('('), token.punctuator(')'), 
            formalParameterList),
        parse.between(token.punctuator('{'), token.punctuator('}'),
            functionBody)),
    function(_, id, parameters, body) {
        return parse.always(new astExpression.FunctionExpression(id, parameters, body));
    });

// Function Declaration
////////////////////////////////////////
/**
 * Parser for a function declaration.
 * 
 * Requires an identifier.
 */
var functionDeclaration = parse.binda(
    parse.sequence(
        token.keyword('function'),
        token.identifier,
        parse.between(token.punctuator('('), token.punctuator(')'), 
            formalParameterList),
        parse.between(token.punctuator('{'), token.punctuator('}'),
            functionBody)),
    function(_, id, params, body) {
        return parse.always(new astDeclaration.FunctionDeclarations(id, params, body));
    });

// Source Elements
////////////////////////////////////////
/**
 * Parser for an ECMAScript source element.
 * 
 * Source Elements are top level nodes that makes up a program.
 */
var sourceElement = parse.either(
    parse.attempt(statementParser),
    functionDeclaration);

/**
 * Parser for a sequence of zero or more source elements.
 */
sourceElements = parse_eager.many(sourceElement);

// Program
////////////////////////////////////////
/**
 * Parser for an ECMAScript 5.1 program.
 */
var program = parse.bind(
    sourceElements,
    function(elements) {
        return parse.always(new astProgram.Program(elements));
    });

/* Export
 ******************************************************************************/
return {
    'functionBody': functionBody,
    'functionExpression': functionExpression,
    'functionDeclaration': functionDeclaration,
    
    'sourceElement': sourceElement,
    'sourceElements': sourceElements,
    
    'program': program
};

});