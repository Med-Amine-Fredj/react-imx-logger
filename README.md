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

<mark>MAKE SURE TO ENABLE STOMP PLUGIN IN RABBIT MQ </mark>

Create connection and connect

```
mport { imxNodeLogger } from "node-imx-logger";

  imxReactLogger.createMqConnectionOverWS(
            {
              host: "ws://127.0.0.1:15674/ws",
              login: "login_example",
              password: "password_example",
            },
            {
              connectCallback(frame) {
                console.log("frame");
              },
            },
            "queue_name_example",
            "app_name_example",
            {
              enableDebug: true,
              enableErrors: true,
            }
          );
```

Now you can use or import the imxReactLogger everywhere in the app with default existing methods by @StompClient [here](https://www.npmjs.com/package/stompjs) .

##### To send debug logs use :

```
    imxReactLogger.debug({
            context: "react_example",
            message: "hello from react example ",
          });
```

###### To send errors logs use :

    imxReactLogger.error({
            context: "react_example",
            message: "hello from react example ",
          });

###### To disconnect  :

```
imxReactLogger?.disconnect(() => {
            console.log("disconnected");
          });
```

###### To disble DEBUG logging :

```
  imxReactLogger?.disableDebugLogging();
```

###### To disble ERRORS logging :

```
  imxReactLogger?.disableErrorLogging();
```

###### To enable DEBUG logging :

```
  imxReactLogger?.enableDebugLogging();
```

###### To enable ERRORS logging :

```
  imxReactLogger?.enableErrorLogging();
```

###### To check logging status :

```
   imxReactLogger.checkLoggingStatus() 
     // return {
      //  errorLoggingStatus: bool,
       // debugLoggingStatus: bool,
      // };


    imxReactLogger.checkErrorLoggingStatus() //return bool

    imxReactLogger.checkDebugLoggingStatus() // return bool
```

###### To change APP NAME inside the code after connect   :

```
  imxReactLogger.setAppName("example_app") 
```
