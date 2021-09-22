import io from "socket.io-client";
import { SERVER_IP } from "../private";

class WebsocketAPI {
  socket;

  connect() {
    this.socket = io(SERVER_IP);
    return new Promise((resolve, reject) => {
      this.socket.on("connection", () => resolve());
      this.socket.on("connection_error", (err) => reject(err));
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject("No socket connection.");

      return this.socket.emit(event, data, (response) => {
        if (response.error) return reject(response.error);

        return resolve();
      });
    });
  }

  on(event, func) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject("No socket connection.");

      this.socket.on(event, func);
      resolve();
    });
  }
}

export default WebsocketAPI;
