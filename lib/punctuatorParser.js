define(['parse'], function(parse){
/**
 * @fileOverview Parsers for ECMAScript 5.1 punctuators.
 */

/* Parsers
 ******************************************************************************/
// Brackets and Braces
////////////////////////////////////////
var openBrace = parse.char('{');
var closeBrace = parse.char('}');

var openParenthesis = parse.char('(');
var closeParenthesis = parse.char(')');

var openBracket= parse.char('[');
var closeBracket= parse.char('[');

// Punctuation
////////////////////////////////////////
var period = parse.char('.');

var semicolon = parse.char(';');

var comma = parse.char(',');

// Conditional
////////////////////////////////////////
var colon = parse.char(':');
var questionMark = parse.char('?');

// Shifts
////////////////////////////////////////
var leftShift = parse.string('<<');

var signedRightShift = parse.string('>>');

var unsignedRightShift = parse.string('>>>');

// Relational
////////////////////////////////////////
var lessThanOrEqualTo = parse.string('<=');
var lessThan = parse.char('<');

var greaterThanOrEqualTo = parse.string('>=');
var greaterThan = parse.char('>');


// Equality
////////////////////////////////////////
var strictEquals = parse.string('===');
var strictDoesNotEqual = parse.string('!==');

var equals = parse.string('==');
var doesNotEqual = parse.string('!=');

// Assignment
////////////////////////////////////////
var assign = parse.char('=');

var leftShiftAssignment = parse.string('<<=');

var signedRightShiftAssignment = parse.string('>>=');

var unsignedRightShiftAssignment = parse.string('>>>=');

var additionAssignment = parse.string('+=');

var subtrationAssignment = parse.string('-=');

var multiplicationAssignment = parse.string('*=');

var divisionAssignment = parse.string('/=');

var modAssignment = parse.string('%=');

// Unary
////////////////////////////////////////
var increment = parse.string('++');

var decrement = parse.string('--');

var logicalNot = parse.char('!');

var bitwiseNot = parse.char('~');

// Additive Operators
////////////////////////////////////////
var addition = parse.char('+');

var subtration = parse.char('-');

// Multiplicative Operators
////////////////////////////////////////
var multiplication = parse.char('*');

var division = parse.char('/');

var mod = parse.char('%');

// Punctuators
////////////////////////////////////////
/**
 * Parser for punctuators excluding division punctuators.
 */
var punctuator = parse.choice(
// Brackets and Braces
    openBrace,
    closeBrace,
    openParenthesis,
    closeParenthesis,
    openBracket,
    closeBracket,
    period,
    semicolon,
    comma,
    colon,
    questionMark,
// Shifts
    leftShift,
    signedRightShift,
    unsignedRightShift,
// Relational
    lessThanOrEqualTo,
    lessThan,
    greaterThanOrEqualTo,
    greaterThan,
// Equality
    strictEquals,
    strictDoesNotEqual,
    equals,
    doesNotEqual,
// Assignment Operators
    assign,
    leftShiftAssignment,
    signedRightShiftAssignment,
    unsignedRightShiftAssignment,
    additionAssignment,
    subtrationAssignment,
    multiplicationAssignment,
    modAssignment,
// Additive Operators
    increment,
    decrement,
    logicalNot,
    bitwiseNot,
// Additive Operators
    addition,
    subtration,
// Multiplicative Operators
    multiplication,
    mod);

/**
 * Parser for division punctuators.
 */
var divPunctuator = parse.either(
    divisionAssignment,
    division);


/* Export
 ******************************************************************************/
return {
// Brackets and Braces
    'openBrace': openBrace,
    'closeBrace': closeBrace,
    'openParenthesis': openParenthesis,
    'closeParenthesis': closeParenthesis,
    'openBracket': openBracket,
    'closeBracket': closeBracket,
    'period': period,
    'semicolon': semicolon,
    'comma': comma,
    'colon': colon,
    'questionMark': questionMark,

// Shifts
    'leftShift': leftShift,
    'signedRightShift': signedRightShift,
    'unsignedRightShift': unsignedRightShift,

// Relational
    'lessThanOrEqualTo': lessThanOrEqualTo,
    'lessThan': lessThan,
    'greaterThanOrEqualTo': greaterThanOrEqualTo,
    'greaterThan': greaterThan,

// Equality
    'strictEquals': strictEquals,
    'strictDoesNotEqual': strictDoesNotEqual,
    'equals': equals,
    'doesNotEqual': doesNotEqual,

// Assignment Operators
    'assign': assign,
    'leftShiftAssignment': leftShiftAssignment,
    'signedRightShiftAssignment': signedRightShiftAssignment,
    'unsignedRightShiftAssignment': unsignedRightShiftAssignment,
    'additionAssignment': additionAssignment,
    'subtrationAssignment': subtrationAssignment,
    'multiplicationAssignment': multiplicationAssignment,
    'modAssignment': modAssignment,

// Additive Operators
    'increment': increment,
    'decrement': decrement,
    'logicalNot': logicalNot,
    'bitwiseNot': bitwiseNot,

// Additive Operators
    'addition': addition,
    'subtration': subtration,
    
// Multiplicative Operators
    'multiplication': multiplication,
    'mod': mod,

// Punctuators
    'punctuator': punctuator,
    'divPunctuator': divPunctuator
};
});