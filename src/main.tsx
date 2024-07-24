import React from "react";
import ReactDOM from "react-dom/client";
import WebsocketClient from "./websocketClient/WebsocketClient.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebsocketClient />
  </React.StrictMode>
);
