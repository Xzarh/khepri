/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/pattern_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "parse/parse", "parse/lang", "khepri_ast/pattern", "khepri/parse/common", "khepri/parse/token_parser", "khepri/parse/value_parser"], (function(require, exports, __o, __o0, ast_pattern, __o1, __o2, __o3) {
    "use strict";
    var pattern, identifierPattern, sinkPattern, ellipsisPattern, importPattern, arrayPattern, objectPattern, argumentsPattern;
    var __o = __o,
        always = __o["always"],
        attempt = __o["attempt"],
        bind = __o["bind"],
        binds = __o["binds"],
        choice = __o["choice"],
        eager = __o["eager"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        next = __o["next"],
        optional = __o["optional"],
        Parser = __o["Parser"],
        __o0 = __o0,
        between = __o0["between"],
        sepBy = __o0["sepBy"],
        sepBy1 = __o0["sepBy1"],
        ast_pattern = ast_pattern,
        __o1 = __o1,
        node = __o1["node"],
        nodea = __o1["nodea"],
        __o2 = __o2,
        keyword = __o2["keyword"],
        punctuator = __o2["punctuator"],
        __o3 = __o3,
        identifier = __o3["identifier"],
        stringLiteral = __o3["stringLiteral"];
    (pattern = (function() {
        var args = arguments;
        return pattern.apply(undefined, args);
    }));
    (identifierPattern = Parser("Identifier Pattern", bind(identifier, (function(x) {
        return always(ast_pattern.IdentifierPattern.create(x.loc, x));
    }))));
    (sinkPattern = Parser("Sink Pattern", bind(keyword("_"), (function(x) {
        return always(ast_pattern.SinkPattern.create(x.loc));
    }))));
    (ellipsisPattern = Parser("Ellipsis Pattern", bind(punctuator("..."), (function(x) {
        return always(ast_pattern.EllipsisPattern.create(x.loc));
    }))));
    (arrayPattern = Parser("Array Pattern", nodea(enumeration(optional(null, identifierPattern), between(punctuator("["), punctuator("]"), eager(sepBy1(punctuator(","), pattern)))), ast_pattern.ArrayPattern.create)));
    var objectPatternElement = either(node(identifierPattern, (function(loc, key) {
        return ast_pattern.ObjectPatternElement.create(loc, key, null);
    })), nodea(enumeration(stringLiteral, next(punctuator(":"), pattern)), ast_pattern.ObjectPatternElement.create));
    (objectPattern = Parser("Object Pattern", nodea(enumeration(optional(null, identifierPattern), between(punctuator("{"), punctuator("}"), eager(sepBy1(punctuator(","), objectPatternElement)))), ast_pattern.ObjectPattern.create)));
    (importPattern = Parser("Import Pattern", next(keyword("import"), nodea(enumeration(stringLiteral, choice(sinkPattern, attempt(objectPattern), identifierPattern)), ast_pattern.ImportPattern.create))));
    (argumentsPattern = Parser("Arguments Pattern", (function() {
        {
            var argumentsPatternElement = choice(ellipsisPattern, sinkPattern, attempt(arrayPattern), attempt(objectPattern), identifierPattern),
                elements = eager(sepBy(punctuator(","), argumentsPatternElement));
            return either(attempt(nodea(enumeration(optional(null, identifierPattern), between(punctuator("("), punctuator(")"), elements)), ast_pattern.ArgumentsPattern.create)), node(elements, (function(loc, elements) {
                return ast_pattern.ArgumentsPattern.create(loc, null, elements);
            })));
        }
    })()));
    (pattern = Parser("Pattern", choice(ellipsisPattern, sinkPattern, importPattern, attempt(arrayPattern), attempt(objectPattern), identifierPattern)));
    (exports.pattern = pattern);
    (exports.identifierPattern = identifierPattern);
    (exports.sinkPattern = sinkPattern);
    (exports.ellipsisPattern = ellipsisPattern);
    (exports.importPattern = importPattern);
    (exports.arrayPattern = arrayPattern);
    (exports.objectPattern = objectPattern);
    (exports.argumentsPattern = argumentsPattern);
}))