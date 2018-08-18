"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity = function (x) { return x; };
var actionTypeIndex = {};
exports.makeReduxDuck = function (prefix, initialState) {
    var actionHandlers = {};
    return {
        getReducer: function () { return function (state, action) {
            if (state === void 0) { state = initialState; }
            return Object.assign({}, state, (actionHandlers[action.type] || identity)(state, action.payload));
        }; },
        defineAction: function (actionType, handler) {
            var type = prefix + "/" + actionType;
            if (actionTypeIndex[type] === true) {
                throw new Error("Duplicate action type: " + type);
            }
            actionTypeIndex[type] = true;
            actionHandlers[type] = handler;
            return function (payload) { return ({
                type: type,
                payload: payload
            }); };
        }
    };
};
