# IMX LOGGER FOR REACT JS/TS

![](https://imaxeam.com/assets/images/logo-dark.png)

### Installation

#### Step1

```
yarn add react-imx-logger
```

or

```
npm i react-imx-logger
```

#### Usage



~~<mark>MAKE SURE TO ENABLE STOMP PLUGIN IN RABBIT MQ </mark>~~



Create connection and connect

```
mport { imxNodeLogger } from "node-imx-logger";

 imxReactLogger.createMqConnectionOverWS("ws://localhost:15674/ws")
.connect(
      {
        login: "guest",
        password: "guest",
      },
      (frame) => {
        console.log("freame", frame);
      },
      (error) => {
        console.log("error", error);
      }
    );
```

Now you can use or import the imxReactLogger everywhere in the app with default existing methods by @StompClient [here](https://www.npmjs.com/package/stompjs) .

##### To send debug logs use :

```
    imxReactLogger.debug({
            appName: "react_example",
            context: "react_example",
            message: "hello from react example ",
          });
```

###### To send errors logs use :

    imxReactLogger.error({
            appName: "react_example",
            context: "react_example",
            message: "hello from react example ",
          });
