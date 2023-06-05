import * as Stomp from "stompjs";

import { messagePayloadASArg } from "../types/messagePayloadASArg";

import {
  callBackOptionsTypes,
  connectOptionsTypes,
} from "../types/connectionOptions";

import tryStringifyJSONObject from "../helpers/tryStringifyJSONObject";

const LOGGER = (function () {
  let webSocket: WebSocket | null = null;

  let stompConnection: Stomp.Client | null = null;

  let isDebugLogsEnabled: boolean = true;

  let isErrorLogsEnabled: boolean = true;

  let logsChannelName: string = "";

  let app_name: string = "N/A";

  return {
    createMqConnectionOverWS(
      options: connectOptionsTypes,
      callBacksOptions: callBackOptionsTypes,
      queueName: string,
      appName?: string,
      extraOption?: {
        enableDebug: boolean;
        enableErrors: boolean;
      }
    ): Stomp.Client {
      logsChannelName = queueName || "";

      isDebugLogsEnabled = extraOption?.enableDebug ?? true;

      isErrorLogsEnabled = extraOption?.enableErrors ?? true;

      app_name = appName || "N/A";

      const ws = new WebSocket(options?.host);

      webSocket = ws;

      const client = Stomp.over(ws);

      client.debug = () => {};

      client?.connect(
        {
          login: options?.login,
          passcode: options?.password,
        },
        callBacksOptions?.connectCallback,
        callBacksOptions?.errorCallback
      );

      stompConnection = client;

      return client;
    },

    disconnect(disconnectCallback: () => void): void {
      stompConnection?.disconnect(() => {
        disconnectCallback && disconnectCallback();
      });
    },

    getMqttConnection() {
      return stompConnection;
    },

    enableErrorLogging() {
      isErrorLogsEnabled = true;
    },
    disableErrorLogging() {
      isErrorLogsEnabled = false;
    },

    enableDebugLogging() {
      isDebugLogsEnabled = true;
    },

    disableDebugLogging() {
      isDebugLogsEnabled = false;
    },

    checkLoggingStatus() {
      return {
        errorLoggingStatus: isErrorLogsEnabled,
        debugLoggingStatus: isDebugLogsEnabled,
      };
    },

    checkErrorLoggingStatus() {
      return isErrorLogsEnabled;
    },

    checkDebugLoggingStatus() {
      return isDebugLogsEnabled;
    },

    setAppName(appName: string) {
      app_name = appName;
    },

    error(payload: messagePayloadASArg) {
      if (!isErrorLogsEnabled) return;
      stompConnection?.send(
        logsChannelName,
        {},
        tryStringifyJSONObject({
          payload: {
            level: "errors",
            ...payload,
            date: new Date(),
            appName: app_name,
          },
        })
      );
    },

    debug(payload: messagePayloadASArg) {
      if (!isDebugLogsEnabled) return;
      stompConnection?.send(
        logsChannelName,
        {},
        tryStringifyJSONObject({
          payload: {
            level: "debug",
            ...payload,
            date: new Date(),
            appName: app_name,
          },
        })
      );
    },
  };
})();

export default LOGGER;
