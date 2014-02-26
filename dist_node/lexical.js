/*
 * THIS FILE IS AUTO GENERATED from 'lib/lexical.kep'
 * DO NOT EDIT
*/
"use strict";
var ast_node = require("khepri-ast")["node"],
    setData = ast_node["setData"],
    setUserData = ast_node["setUserData"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    zipper = require("neith")["zipper"],
    tree = require("neith")["tree"],
    __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    record = require("bes")["record"],
    scope = require("./scope"),
    Scope = scope["Scope"],
    __o0 = require("./tail"),
    Tail = __o0["Tail"],
    trampoline = __o0["trampoline"],
    fun = require("./fun"),
    check, _check, State = record.declare(null, ["ctx", "scope", "unique"]),
    ok = (function(x) {
        return (function(s, ok, _) {
            return ok(x, s);
        });
    }),
    error = (function(x) {
        return (function(s, _, err) {
            return err(x, s);
        });
    }),
    bind = (function(p, f) {
        return (function(s, ok, err) {
            return new(Tail)(p, s, (function(x, s) {
                return f(x)(s, ok, err);
            }), err);
        });
    }),
    next = (function(p, n) {
        return bind(p, (function(_) {
            return n;
        }));
    }),
    binary = (function(a, b, f) {
        return bind(a, (function(x) {
            return bind(b, (function(y) {
                return f(x, y);
            }));
        }));
    }),
    seqa = (function(arr) {
        return fun.reduce(arr, next);
    }),
    seq = (function() {
        var args = arguments;
        return seqa(args);
    }),
    extract = (function(s, ok, _) {
        return ok(s, s);
    }),
    setState = (function(s) {
        return (function(_, ok, _0) {
            return ok(s, s);
        });
    }),
    modifyState = (function(f) {
        return bind(extract, (function(s) {
            return setState(f(s));
        }));
    }),
    examineState = (function(f) {
        return bind(extract, (function(s) {
            return f(s);
        }));
    }),
    examineScope = (function(f) {
        return bind(extract, (function(s) {
            return f(s.scope);
        }));
    }),
    modifyScope = (function(f) {
        return (function(s, ok, err) {
            var scope = f(s.scope),
                newState = State.setScope(s, scope);
            return ok(scope, newState);
        });
    }),
    setScope = (function(s) {
        return modifyScope((function() {
            return s;
        }));
    }),
    unique = (function(s, ok, err) {
        return ok(s.unique, s.setUnique((s.unique + 1)));
    }),
    push = examineScope((function(s) {
        return setScope(scope.push(s));
    })),
    pop = examineScope((function(s) {
        return setScope(scope.pop(s));
    })),
    move = (function(op) {
        return modifyState((function(s) {
            return State.setCtx(s, op(s.ctx));
        }));
    }),
    up = move(zipper.up),
    down = move(zipper.down),
    left = move(zipper.left),
    right = move(zipper.right),
    child = (function(edge) {
        var args = arguments;
        return seq(move(tree.child.bind(null, edge)), seq.apply(undefined, [].slice.call(args, 1)), up);
    }),
    checkCtx = (function(ctx) {
        return _check((ctx && tree.node(ctx)));
    }),
    checkTop = (function(s, ok, err) {
        return checkCtx(s.ctx)(s, ok, err);
    }),
    checkChild = (function(edge) {
        return child(edge, checkTop);
    }),
    inspect = (function(f) {
        return examineState((function(s) {
            return f(tree.node(s.ctx));
        }));
    }),
    modifyNode = (function(f) {
        return move(tree.modifyNode.bind(null, f));
    }),
    setNode = (function(x) {
        return move(tree.setNode.bind(null, x));
    }),
    pass = ok(),
    block = (function() {
        var body = arguments;
        return seq(push, seqa(body), pop);
    }),
    checkHasBinding = (function(id, loc) {
        return examineScope((function(s) {
            return (s.hasBinding(id) ? pass : error(((("Undeclared identifier:'" + id) + "' at:") + loc)));
        }));
    }),
    checkCanAddOwnBinding = (function(id, loc) {
        return examineScope((function(s) {
            var start, binding, end;
            return (s.hasOwnBinding(id) ? ((start = (loc && loc.start)), (binding = s.getBinding(id)), (end =
                (binding.loc && binding.loc.start)), error(((((("'" + id) + "' at:") + start) +
                " already bound for scope from:") + end))) : pass);
        }));
    }),
    checkCanAssign = (function(id, loc) {
        return examineScope((function(s) {
            var b;
            return (s.hasBinding(id) ? ((b = s.getBinding(id)), (b.mutable ? pass : error((((
                "Assign to immutable variable:'" + id) + "' at:") + loc)))) : pass);
        }));
    }),
    addUid = (function(id) {
        return bind(unique, (function(uid) {
            return modifyScope((function(s) {
                return Scope.addUid(s, id, uid);
            }));
        }));
    }),
    addMutableBinding = (function(id, loc) {
        return seq(modifyScope((function(s) {
            return Scope.addMutableBinding(s, id, loc);
        })), addUid(id));
    }),
    addImmutableBinding = (function(id, loc) {
        return seq(modifyScope((function(s) {
            return Scope.addImmutableBinding(s, id, loc);
        })), addUid(id));
    }),
    addMutableBindingChecked = (function(id, loc) {
        return seq(checkCanAddOwnBinding(id, loc), addMutableBinding(id, loc));
    }),
    addImmutableBindingChecked = (function(id, loc) {
        return seq(checkCanAddOwnBinding(id, loc), addImmutableBinding(id, loc));
    }),
    checks = ({}),
    addCheck = (function(type, check) {
        if (Array.isArray(type)) type.forEach((function(x) {
            return addCheck(x, check);
        }));
        else(checks[type] = check);
    });
addCheck("Program", checkChild("body"));
addCheck("PackageExports", checkChild("exports"));
addCheck("PackageExport", inspect((function(node) {
    return addMutableBindingChecked(node.id.name, node.loc);
})));
addCheck("Package", seq(addImmutableBindingChecked("require", null), addImmutableBindingChecked("exports", null),
    addImmutableBindingChecked("module", null), checkChild("exports"), inspect((function(node) {
        return ((node.body.type === "WithStatement") ? child("body", checkChild("bindings"), child("body",
            checkChild("body"))) : child("body", checkChild("body")));
    }))));
addCheck("SwitchCase", seq(checkChild("test"), checkChild("consequent")));
addCheck("CatchClause", block(inspect((function(node) {
    return addImmutableBindingChecked(node.param.name, node.param.loc);
})), checkChild("param"), child("body", checkChild("body"))));
addCheck(["StaticDeclaration", "VariableDeclaration"], checkChild("declarations"));
addCheck("StaticDeclarator", inspect((function(node) {
    return addImmutableBindingChecked(node.id.name, node.loc);
})));
addCheck("VariableDeclarator", seq(inspect((function(node) {
    return addMutableBindingChecked(node.id.name, node.loc);
})), checkChild("id"), checkChild("init")));
addCheck("Binding", inspect((function(node) {
    return (node.recursive ? seq(checkChild("pattern"), checkChild("value")) : seq(checkChild("value"),
        checkChild("pattern")));
})));
addCheck("BlockStatement", block(checkChild("body")));
addCheck("ExpressionStatement", checkChild("expression"));
addCheck("IfStatement", seq(checkChild("test"), block(checkChild("consequent")), block(checkChild("alternate"))));
addCheck("WithStatement", block(checkChild("bindings"), child("body", checkChild("body"))));
addCheck("SwitchStatement", block(checkChild("discriminant"), checkChild("cases")));
addCheck(["ReturnStatement", "ThrowStatement"], checkChild("argument"));
addCheck("TryStatement", seq(checkChild("block"), block(checkChild("handler")), block(checkChild("finalizer"))));
addCheck("WhileStatement", seq(checkChild("test"), block(checkChild("body"))));
addCheck("DoWhileStatement", seq(block(checkChild("body")), checkChild("test")));
addCheck("ForStatement", block(checkChild("init"), checkChild("test"), checkChild("update"), block(checkChild("body"))));
addCheck("FunctionExpression", block(inspect((function(node) {
    return (node.id ? addImmutableBinding(node.id.name, node.loc) : pass);
})), checkChild("params"), inspect((function(node) {
    return ((node.body.type === "BlockStatement") ? child("body", checkChild("body")) : checkChild(
        "body"));
}))));
addCheck("UnaryExpression", checkChild("argument"));
addCheck("AssignmentExpression", seq(child("left", checkTop, inspect((function(left) {
    return ((left.type === "Identifier") ? checkCanAssign(left.name, left.loc) : pass);
}))), checkChild("right")));
addCheck(["LogicalExpression", "BinaryExpression"], seq(checkChild("left"), checkChild("right")));
addCheck("ConditionalExpression", seq(checkChild("test"), checkChild("consequent"), checkChild("alternate")));
addCheck(["CallExpression", "NewExpression"], seq(checkChild("callee"), checkChild("args")));
addCheck("MemberExpression", seq(checkChild("object"), inspect((function(node) {
    return (node.computed ? checkChild("property") : pass);
}))));
addCheck("ArrayExpression", checkChild("elements"));
addCheck("ObjectExpression", checkChild("properties"));
addCheck("LetExpression", block(checkChild("bindings"), checkChild("body")));
addCheck("CurryExpression", seq(checkChild("base"), checkChild("args")));
addCheck("UnaryOperatorExpression", bind(unique, (function(uid) {
    return modifyNode((function(node) {
        return setData(node, "x_uid", uid);
    }));
})));
addCheck("BinaryOperatorExpression", binary(unique, unique, (function(xuid, yuid) {
    return modifyNode((function(node) {
        return setUserData(node, ({
            "x_uid": xuid,
            "y_uid": yuid
        }));
    }));
})));
addCheck("SinkPattern", bind(unique, (function(uid) {
    return setNode(setData(ast_value.Identifier.create(null, "_"), "uid", uid));
})));
addCheck("IdentifierPattern", seq(inspect((function(node) {
    return (node.reserved ? addImmutableBinding(node.id.name, node.loc) : addImmutableBindingChecked(
        node.id.name, node.loc));
})), checkChild("id")));
addCheck("ImportPattern", checkChild("pattern"));
addCheck("AsPattern", seq(checkChild("id"), inspect((function(node) {
    return child("target", modifyNode((function(target) {
        return setData(target, "id", node.id);
    })), checkTop);
}))));
addCheck("ObjectPattern", inspect((function(node) {
    if (((!node.ud) || (!node.ud.id))) {
        return seq(bind(unique, (function(uid) {
            var id = ast_pattern.IdentifierPattern.create(node.loc, setData(ast_value.Identifier
                .create(null, "__o"), "uid", uid));
            (id.reserved = true);
            return setNode(ast_pattern.AsPattern.create(null, id, node));
        })), checkTop);
    }
    return checkChild("elements");
})));
addCheck("ObjectPatternElement", seq(checkChild("target"), checkChild("key")));
addCheck("ArgumentsPattern", seq(checkChild("id"), checkChild("elements"), checkChild("self")));
addCheck("ObjectValue", checkChild("value"));
addCheck("Identifier", inspect((function(node) {
    return seq(examineScope((function(s) {
        return setNode(setData(node, "uid", s.getUid(node.name)));
    })), checkHasBinding(node.name, node.loc));
})));
(_check = (function(node) {
    if (Array.isArray(node)) {
        if ((!node.length)) return pass;
        return seq(down, seqa(node.map((function(_, i) {
            return ((i === (node.length - 1)) ? checkTop : next(checkTop, right));
        }))), up);
    }
    if (((node instanceof ast_node.Node) && checks[node.type])) return checks[node.type];
    return pass;
}));
var checkAst = (function(ast, globals) {
    var scope = fun.reduce((globals || []), Scope.addImmutableBinding, Scope.empty),
        state = new(State)(khepriZipper(ast), scope, 1);
    return trampoline(checkTop(state, (function(x, s) {
        return tree.node(zipper.root(s.ctx));
    }), (function(err, s) {
        throw err;
    })));
});
(check = (function(ast, globals) {
    return checkAst(ast, globals);
}));
(exports.check = check);