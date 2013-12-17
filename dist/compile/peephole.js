/*
 * THIS FILE IS AUTO GENERATED from 'lib/compile/peephole.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "neith/tree", "neith/zipper", "khepri_ast/node", "khepri_ast/statement",
    "khepri_ast/expression"
], (function(require, exports, tree, zipper, __o, ast_statement, ast_expression) {
    "use strict";
    var optimize;
    var tree = tree,
        zipper = zipper,
        __o = __o,
        modify = __o["modify"],
        Node = __o["Node"],
        ast_statement = ast_statement,
        ast_expression = ast_expression;
    var concat = (function() {
        var args = arguments;
        return [].concat.apply([], args);
    });
    var map = (function(f, x) {
        return [].map.call(x, f);
    });
    var reduce = Function.prototype.call.bind(Array.prototype.reduce);
    var flatten = (function(x) {
        return (Array.isArray(x) ? reduce(x, (function(p, c) {
            return p.concat(c);
        }), []) : x);
    });
    var range = (function(end) {
        var a = [];
        for (var i = 0;
            (i < end);
            (i = (i + 1)))(a[i] = i);
        return a;
    });
    var joinKeys = (function(children, values) {
        return children.reduce((function(p, c) {
            (p[c] = values[c]);
            return p;
        }), []);
    });
    var Zipper = tree.treeZipper.bind(null, (function(node) {
        return (!node ? [] : (Array.isArray(node) ? range(node.length) : node.children));
    }), (function(n, k) {
        return n[k];
    }), (function(node, _, children, values) {
        return ((node instanceof Node) ? modify(node, values, ({})) : joinKeys(children, values));
    }));
    var peepholes = ({});
    var addPeephole = (function(type, condition, f) {
        var entry = ({
            "condition": condition,
            "map": f
        });
        (peepholes[type] = (peepholes[type] ? peepholes[type].concat(entry) : [entry]));
    });
    addPeephole("VariableDeclarator", (function(node) {
        return ((node.init && (node.init.type === "Identifier")) && (node.id.name === node.init.name));
    }), (function(_) {
        return null;
    }));
    addPeephole("VariableDeclaration", (function(_) {
        return true;
    }), (function(node) {
        return (function() {
            {
                var declarations = node.declarations.filter((function(x) {
                    return !!x;
                }));
                return modify(node, ({
                    "declarations": declarations
                }), ({}));
            }
        })
            .call(this);
    }));
    addPeephole("VariableDeclaration", (function(node) {
        return !node.declarations.length;
    }), (function(_) {
        return null;
    }));
    addPeephole("ReturnStatement", (function(node) {
        return (node.argument && (node.argument.type === "LetExpression"));
    }), (function(node) {
        return ast_statement.WithStatement.create(null, node.argument.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ReturnStatement.create(node.loc, node.argument.body)]));
    }));
    addPeephole("ExpressionStatement", (function(node) {
        return (node.expression && (node.expression.type === "LetExpression"));
    }), (function(node) {
        return ast_statement.WithStatement.create(null, node.expression.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ExpressionStatement.create(node.loc, node.expression.body)]));
    }));
    addPeephole("CurryExpression", (function(node) {
        return !node.args.length;
    }), (function(node) {
        return node.base;
    }));
    addPeephole("BinaryExpression", (function(node) {
        return ((node.operator === "|>") && ((((node.left.type === "CurryExpression") || (node.left.type ===
                "BinaryOperatorExpression")) || (node.left.type === "UnaryOperatorExpression")) ||
            (node.left.type === "TernaryOperatorExpression")));
    }), (function(node) {
        return ast_expression.CallExpression.create(null, ((node.left.type === "CurryExpression") ?
            node.left.base : node.left), concat((node.left.args || []), node.right));
    }));
    addPeephole("BinaryExpression", (function(node) {
        return ((node.operator === "<|") && ((((node.right.type === "CurryExpression") || (node.right.type ===
                "BinaryOperatorExpression")) || (node.right.type === "UnaryOperatorExpression")) ||
            (node.right.type === "TernaryOperatorExpression")));
    }), (function(node) {
        return ast_expression.CallExpression.create(null, ((node.right.type === "CurryExpression") ?
            node.right.base : node.right), concat((node.right.args || []), node.left));
    }));
    addPeephole("BlockStatement", (function(_) {
        return true;
    }), (function(node) {
        return modify(node, ({
            "body": flatten(node.body.map((function(x) {
                return ((x && (x.type === "BlockStatement")) ? x.body : x);
            })))
        }), ({}));
    }));
    var opt = (function(z) {
        var t = tree.modifyNode((function(node) {
            if (!node) return node;
            var transforms = (peepholes[node.type] || [])
                .filter((function(x) {
                    return x.condition(node);
                }));
            return transforms.reduce((function(p, c) {
                return c.map(p);
            }), node);
        }), z);
        var next = zipper.nextDfs(t);
        return (next ? opt(next) : t);
    });
    (optimize = (function(node) {
        return tree.node(zipper.root(opt(Zipper(node))));
    }));
    (exports.optimize = optimize);
}))