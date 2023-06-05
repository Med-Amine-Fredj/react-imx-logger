import * as Stomp from "stompjs";

export type connectOptionsTypes = {
  host: string;
  login: string;
  password: string;
};

export type callBackOptionsTypes = {
  connectCallback: (frame?: Stomp.Frame | undefined) => any;
  errorCallback?: ((error: string | Stomp.Frame) => any) | undefined;
};
