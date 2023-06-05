import { messagePayloadType } from "../Types/messagePayloadType";

function tryStringifyJSONObject(object: object) {
  try {
    if (object && typeof object !== "object") {
      console.error(
        "Erreur in payload message while sending logs : input ====>  ",
        object
      );

      const payload: messagePayloadType = {
        payload: {
          appName: "IMXLOGGER_REACT",
          context: "ERROR_STRINGIFY",
          message:
            "Erreur in IMX LOGGER FOR REACT,  payload message while sending logs : input ====>  ",
          extra: object,
          level: "errors",
          date: new Date(),
        },
      };

      const stringedValue = JSON.stringify(payload);

      return stringedValue;
    }
    const stringedValue = JSON.stringify(object);

    return stringedValue;
  } catch (e) {
    console.error(
      "Erreur in payload message while sending logs : input ====>  ",
      object
    );

    const payload: messagePayloadType = {
      payload: {
        appName: "IMXLOGGER_REACT",
        context: "ERROR_STRINGIFY",
        message:
          "Erreur in IMX LOGGER FOR REACT,  payload message while sending logs : input ====>  ",
        extra: object,
        level: "errors",
        date: new Date(),
      },
    };

    const stringedValue = JSON.stringify(payload);

    return stringedValue;
  }
}

export default tryStringifyJSONObject;
