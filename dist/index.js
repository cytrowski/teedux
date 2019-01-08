"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const identity: TIdentity = x => x
var actionTypeIndex = {};
exports.makeReduxDuck = function (prefix, initialState) {
    var actionHandlers = {};
    return {
        getReducer: function () { return function (state, action) {
            if (state === void 0) { state = initialState; }
            var handler = actionHandlers[action.type];
            if (handler) {
                return Object.assign({}, state, handler(state, action.payload));
            }
            return state;
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
        },
        definePayloadlessAction: function (actionType, handler) {
            var type = prefix + "/" + actionType;
            if (actionTypeIndex[type] === true) {
                throw new Error("Duplicate action type: " + type);
            }
            actionTypeIndex[type] = true;
            actionHandlers[type] = handler;
            return function () { return ({
                type: type
            }); };
        }
    };
};
