"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
test('makes duck', function () {
    var initialState = {
        counterValue: 10
    };
    var duck = index_1.makeReduxDuck('counter', initialState);
    var increment = duck.defineAction('INCREMENT', function (_a, _b) {
        var counterValue = _a.counterValue;
        var diff = _b.diff;
        return ({
            counterValue: counterValue + diff
        });
    });
    expect(increment({ diff: 5 })).toEqual({
        type: 'counter/INCREMENT',
        payload: {
            diff: 5
        }
    });
    expect(duck.getReducer()({ counterValue: 1 }, increment({ diff: 5 }))).toEqual({
        counterValue: 6
    });
    expect(duck.getReducer()(undefined, { type: '@@INIT' })).toEqual(initialState);
    expect(duck.getReducer()(undefined, { type: '@@INIT' })).toBe(initialState);
    var state = {
        counterValue: 4
    };
    expect(duck.getReducer()(state, { type: '@@FOO' })).toBe(state);
    expect(function () {
        duck.defineAction('INCREMENT', function () { return ({}); });
    }).toThrowError("Duplicate action type: counter/INCREMENT");
    var reset = duck.defineAction('RESET', function () { return initialState; });
    expect(duck.getReducer()({ counterValue: 1 }, reset(undefined))).toEqual({
        counterValue: 10
    });
    var reset2 = duck.definePayloadlessAction('RESET2', function () { return initialState; });
    expect(duck.getReducer()({ counterValue: 1 }, reset2())).toEqual({
        counterValue: 10
    });
    expect(function () {
        duck.definePayloadlessAction('RESET2', function () { return ({}); });
    }).toThrowError("Duplicate action type: counter/RESET2");
});
