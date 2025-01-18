import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken } from "../services/TokenManager";

const useStomp = () => {
  const [stompClient, setStompClient] = useState(null);
  const [username, setUsername] = useState("");
  const [messagesReceived, setMessagesReceived] = useState("");

  const fetchAccessToken = () => {
    return getAccessToken()
      .then((token) => token)
      .catch((error) => {
        return null;
      });
  };

  const setupStompClient = (username) => {
    return fetchAccessToken()
      .then((token) => {
        if (!token) {
          throw new Error("Failed to fetch access token");
        }

        const client = new Client({
          brokerURL: `ws://localhost:8080/ws?token=${token}`,
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });

        return new Promise((resolve, reject) => {
          client.onConnect = () => {
            client.subscribe("/topic/publicmessages", (data) => {
              onMessageReceived(data);
            });

            client.subscribe(
              `/user/${username}/queue/inboxmessages`,
              (data) => {
                onMessageReceived(data);
              }
            );

            resolve();
          };

          client.onStompError = (error) => {
            reject(error);
          };

          client.activate();
          setStompClient(client);
        });
      })
      .catch((error) => {
        throw error;
      });
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(message);
  };

  const sendMessage = (newMessage) => {
    if (stompClient == null || !stompClient.connected) {
      return;
    }

    const payload = {
      id: uuidv4(),
      from: username,
      to: Number(newMessage.to),
      text: newMessage.text,
    };

    if (newMessage.to) {
      stompClient.publish({
        destination: `/user/${newMessage.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
    } else {
      stompClient.publish({
        destination: "/topic/publicmessages",
        body: JSON.stringify(payload),
      });
    }
  };

  const initialize = (username) => {
    setUsername(username);
    return setupStompClient(username);
  };

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  const checkIfThereIsUnderlyingStomConnection = () => {
    return stompClient != null;
  };

  return {
    messagesReceived,
    sendMessage,
    initialize,
    checkIfThereIsUnderlyingStomConnection,
  };
};

export default useStomp;
