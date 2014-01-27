define(["require", "exports", "khepri-ast/declaration", "khepri-ast/expression", "khepri-ast/statement",
    "khepri-ast/value"
], (function(require, exports, ast_declaration, ast_expression, ast_statement, ast_value) {
    "use strict";
    var definePackage, importPackage, concat = Function.prototype.call.bind(Array.prototype.concat),
        map = Function.prototype.call.bind(Array.prototype.map);
    (importPackage = (function(path) {
        var segs = path.split("::");
        return segs.slice(1)
            .reduce((function(p, c) {
                return ast_expression.MemberExpression.create(null, p, ast_value.Literal.create(
                    null, "string", c), true);
            }), ast_expression.CallExpression.create(null, ast_value.Identifier.create(null,
                "require"), [ast_value.Literal.create(null, "string", segs[0])]));
    }));
    (definePackage = (function(loc, exports, imports, targets, body) {
        var exportHeader = ast_declaration.VariableDeclaration.create(null, map(exports, (function(x) {
            return ast_declaration.VariableDeclarator.create(null, ast_value.Identifier.create(
                null, x));
        }))),
            exportBody = map(exports, (function(x) {
                return ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression
                    .create(null, "=", ast_expression.MemberExpression.create(null, ast_value.Identifier
                            .create(null, "exports"), ast_value.Identifier.create(null, x)),
                        ast_value.Identifier.create(null, x)));
            }));
        return ast_statement.BlockStatement.create(body.loc, [ast_statement.ExpressionStatement.create(
                null, ast_value.Literal.create(null, "string", "use strict")), ast_statement.WithStatement
            .create(null, map(imports, (function(x) {
                return ast_declaration.Binding.create(null, x.pattern, importPackage(x.from
                    .value));
            })), ast_statement.BlockStatement.create(null, concat(exportHeader, body.body,
                exportBody)))
        ]);
    }));
    (exports.definePackage = definePackage);
    (exports.importPackage = importPackage);
}));