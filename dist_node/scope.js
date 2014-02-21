/*
 * THIS FILE IS AUTO GENERATED from 'lib/scope.kep'
 * DO NOT EDIT
*/
"use strict";
var record = require("bes")["record"],
    hashtrie = require("hashtrie"),
    Scope, push, pop;
(Scope = record.declare(null, ["record", "outer", "mapping", "definitions"]));
(Scope.empty = Scope.create(hashtrie.empty, null, hashtrie.empty, hashtrie.empty));
(Scope.prototype.hasOwnBinding = (function(id) {
    var self = this;
    return hashtrie.has(id, self.record);
}));
(Scope.prototype.hasBinding = (function(id) {
    var self = this;
    return (self.hasOwnBinding(id) || (self.outer && self.outer.hasBinding(id)));
}));
(Scope.prototype.getBinding = (function(id) {
    var self = this;
    return (hashtrie.get(id, self.record) || (self.outer ? self.outer.getBinding(id) : null));
}));
(Scope.prototype.getUid = (function(id) {
    var self = this;
    return (self.hasOwnBinding(id) ? hashtrie.get(id, self.definitions) : (self.outer ? self.outer.getUid(id) :
        null));
}));
(Scope.prototype.hasOwnMapping = (function(id) {
    var self = this;
    return hashtrie.has(id, self.mapping);
}));
(Scope.prototype.hasMapping = (function(id) {
    var self = this;
    return (self.hasOwnMapping(id) || (self.outer && self.outer.hasMapping(id)));
}));
(Scope.prototype.getMapping = (function(id) {
    var self = this;
    return (self.hasOwnMapping(id) ? hashtrie.get(id, self.mapping) : (self.outer && self.outer.getMapping(id)));
}));
(Scope.prototype.getUnusedId = (function(id) {
    var self = this;
    if ((!self.hasOwnBinding(id))) return id;
    for (var i = 0;;
        (i = (i + 1)))
        if ((!self.hasBinding((id + i)))) return (id + i);
}));
(Scope.addUid = (function(s, id, uid) {
    return new(Scope)(s.record, s.outer, s.mapping, hashtrie.set(id, uid, s.definitions));
}));
(Scope.addBinding = (function(s, id, info) {
    return new(Scope)(hashtrie.set(id, info, s.record), s.outer, s.mapping, s.definitions);
}));
(Scope.addMutableBinding = (function(s, id, loc) {
    return Scope.addBinding(s, id, ({
        "mutable": true,
        "loc": loc
    }));
}));
(Scope.addImmutableBinding = (function(s, id, loc) {
    return Scope.addBinding(s, id, ({
        "mutable": false,
        "loc": loc
    }));
}));
(Scope.addReservedBinding = (function(s, id, loc) {
    return Scope.addBinding(s, id, ({
        "mutable": false,
        "reserved": true,
        "loc": loc
    }));
}));
(Scope.addMapping = (function(s, from, to) {
    return new(Scope)(s.record, s.outer, hashtrie.set(from, to, s.mapping), s.definitions);
}));
(push = (function(s) {
    return new(Scope)(hashtrie.empty, s, ({}), s.definitions);
}));
(pop = (function(s) {
    return s.outer;
}));
(exports.Scope = Scope);
(exports.push = push);
(exports.pop = pop);