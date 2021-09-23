import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url, {
      transports: ['websocket'],
      rejectUnauthorized: false,
      agent: false,
      upgrade: false,
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, [url]);

  return socket;
}
