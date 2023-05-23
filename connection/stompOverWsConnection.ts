import * as Stomp from "stompjs";

type messagePayloadToMqTTType = {
  level: "errors" | "debug";
  message: string;
  context: string;
  appName: string;
  user?: string;
};

type messagePayloadToMqTTFromUsers = {
  message: string;
  context: string;
  appName: string;
  user?: string;
};

const LOGGER = (function () {
  let mqttConnection: Stomp.Client | null = null;

  return {
    createMqConnectionOverWS(host: string): Stomp.Client {
      const ws = new WebSocket(host);

      const client = Stomp.over(ws);

      mqttConnection = client;

      return client;
    },

    connect(
      option: {
        login: string;
        password: string;
      },
      connectCallback: (frame?: Stomp.Frame | undefined) => any,
      errorCallback?: ((error: string | Stomp.Frame) => any) | undefined
    ) {
      mqttConnection?.connect(
        {
          login: option.login,
          passcode: option.password,
        },
        connectCallback,
        errorCallback
      );
    },

    getMqttConnection() {
      return mqttConnection;
    },

    error(payload: messagePayloadToMqTTFromUsers) {
      if (!mqttConnection) {
        console.warn(
          "Make sure you created the MQTT connection successfully !"
        );
        return;
      }
      mqttConnection.send(
        "logs",
        {},
        JSON.stringify({
          payload: {
            level: "errors",
            ...payload,
            date: new Date(),
          },
        })
      );
    },

    debug(payload: messagePayloadToMqTTFromUsers) {
      if (!mqttConnection) {
        console.warn(
          "Make sure you created the MQTT connection successfully !"
        );
        return;
      }
      mqttConnection.send(
        "logs",
        {},
        JSON.stringify({
          payload: {
            level: "debug",
            ...payload,
            date: new Date(),
          },
        })
      );
    },
  };
})();

export default LOGGER;
