"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stomp = require("stompjs");
var LOGGER = (function () {
    var mqttConnection = null;
    return {
        createMqConnectionOverWS: function (host) {
            var ws = new WebSocket(host);
            var client = Stomp.over(ws);
            mqttConnection = client;
            return mqttConnection;
        },
        connect: function (option, connectCallback, errorCallback) {
            mqttConnection === null || mqttConnection === void 0 ? void 0 : mqttConnection.connect({
                login: option.login,
                passcode: option.password,
            }, connectCallback, errorCallback);
        },
        getMqttConnection: function () {
            return mqttConnection;
        },
        error: function (payload) {
            if (!mqttConnection) {
                console.warn("Make sure you created the MQTT connection successfully !");
                return;
            }
            mqttConnection.send("logs", {}, JSON.stringify({
                payload: __assign(__assign({ level: "errors" }, payload), { date: new Date() }),
            }));
        },
        debug: function (payload) {
            if (!mqttConnection) {
                console.warn("Make sure you created the MQTT connection successfully !");
                return;
            }
            mqttConnection.send("logs", {}, JSON.stringify({
                payload: __assign(__assign({ level: "debug" }, payload), { date: new Date() }),
            }));
        },
    };
})();
exports.default = LOGGER;
