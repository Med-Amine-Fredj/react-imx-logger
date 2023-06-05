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
var tryStringifyJSONObject_1 = require("../helpers/tryStringifyJSONObject");
var LOGGER = (function () {
    var webSocket = null;
    var stompConnection = null;
    var isDebugLogsEnabled = true;
    var isErrorLogsEnabled = true;
    var logsChannelName = "";
    var app_name = "N/A";
    return {
        createMqConnectionOverWS: function (options, callBacksOptions, queueName, appName, extraOption) {
            var _a, _b;
            logsChannelName = queueName || "";
            isDebugLogsEnabled = (_a = extraOption === null || extraOption === void 0 ? void 0 : extraOption.enableDebug) !== null && _a !== void 0 ? _a : true;
            isErrorLogsEnabled = (_b = extraOption === null || extraOption === void 0 ? void 0 : extraOption.enableErrors) !== null && _b !== void 0 ? _b : true;
            app_name = appName || "N/A";
            var ws = new WebSocket(options === null || options === void 0 ? void 0 : options.host);
            webSocket = ws;
            var client = Stomp.over(ws);
            client.debug = function () { };
            client === null || client === void 0 ? void 0 : client.connect({
                login: options === null || options === void 0 ? void 0 : options.login,
                passcode: options === null || options === void 0 ? void 0 : options.password,
            }, callBacksOptions === null || callBacksOptions === void 0 ? void 0 : callBacksOptions.connectCallback, callBacksOptions === null || callBacksOptions === void 0 ? void 0 : callBacksOptions.errorCallback);
            stompConnection = client;
            return client;
        },
        disconnect: function (disconnectCallback) {
            stompConnection === null || stompConnection === void 0 ? void 0 : stompConnection.disconnect(function () {
                disconnectCallback && disconnectCallback();
            });
        },
        getMqttConnection: function () {
            return stompConnection;
        },
        enableErrorLogging: function () {
            isErrorLogsEnabled = true;
        },
        disableErrorLogging: function () {
            isErrorLogsEnabled = false;
        },
        enableDebugLogging: function () {
            isDebugLogsEnabled = true;
        },
        disableDebugLogging: function () {
            isDebugLogsEnabled = false;
        },
        checkLoggingStatus: function () {
            return {
                errorLoggingStatus: isErrorLogsEnabled,
                debugLoggingStatus: isDebugLogsEnabled,
            };
        },
        checkErrorLoggingStatus: function () {
            return isErrorLogsEnabled;
        },
        checkDebugLoggingStatus: function () {
            return isDebugLogsEnabled;
        },
        setAppName: function (appName) {
            app_name = appName;
        },
        error: function (payload) {
            if (!isErrorLogsEnabled)
                return;
            stompConnection === null || stompConnection === void 0 ? void 0 : stompConnection.send(logsChannelName, {}, (0, tryStringifyJSONObject_1.default)({
                payload: __assign(__assign({ level: "errors" }, payload), { date: new Date(), appName: app_name }),
            }));
        },
        debug: function (payload) {
            if (!isDebugLogsEnabled)
                return;
            stompConnection === null || stompConnection === void 0 ? void 0 : stompConnection.send(logsChannelName, {}, (0, tryStringifyJSONObject_1.default)({
                payload: __assign(__assign({ level: "debug" }, payload), { date: new Date(), appName: app_name }),
            }));
        },
    };
})();
exports.default = LOGGER;
