import { useEffect, useState, useRef } from "react";
import useSocket from "./useSocket.js";
import useApi from "./useApi.js";
import styles from "../styles/Home.module.css";

export default function Home() {
  const socket = useSocket("http://localhost:3001");
  const sendToApi = useApi();
  const [responses, setResponses] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    function handleEvent(payload) {
      console.log("handleEvent payload", payload);
      console.log("handleEvent responses", responses);
      setResponses([...responses, payload]);
    }
    console.log("socket", socket);
    if (socket) {
      socket.on("catch", handleEvent);
      socket.on("updated-catch", handleEvent);
    }
  }, [socket, responses]);

  const handleSend = () => {
    const { current: input } = inputRef;

    if (input?.value) {
      sendToApi(input.value);
      input.value = '';
      return;
    }
    console.log('no input', current);
  }

  return (
    <div className={styles.container}>
      <div>
        <label for="name">Any data: </label>
        <input id="catch" type="text" ref={inputRef} required />
        <button type="submit" onClick={handleSend}>
          Send
        </button>
      </div>
      <ul className="list">
        {responses.map((data, index) => (
          <li key={`a-${index}`}>{data}</li>
        ))}
      </ul>
    </div>
  );
}
