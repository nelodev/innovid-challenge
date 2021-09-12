import * as React from "react";
import {useState} from "react";

import {Server} from "../components/Server";
import config from "../config.js";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [servers, setServers] = useState(config.defaultServers);

  const addServer = () => {
    if (servers.length === 9) {
      setShowSecretMessage(true);

      return;
    }
    setServers([...servers, {id: servers.length + 1, isActive: false}]);
  };

  const onCloseServer = (serverId: number) => {
    alert(`server ${serverId} has been removed`);
  };

  const handleNewStatus = (serverId: number, newStatus: boolean) => {
    const serverIndex = servers.findIndex((server) => server.id === serverId);
    const newServers = [...servers];

    newServers[serverIndex].isActive = newStatus;
    setServers(newServers);
  };

  const updateAllServers = (newStatus: boolean) => {
    const updatedServers = [...servers];

    updatedServers.map((server) => (server.isActive = newStatus));
    setServers(updatedServers);
  };

  const handleClickSecretMessage = () => {
    setShowSecretMessage(false);
    alert(config.secondSecretMessage);
  };

  return (
    <>
      <div className={styles.buttonsContainer}>
        <button className={styles.addServer} onClick={addServer}>
          Add server
        </button>
        {showSecretMessage ? (
          <div
            className={`window ${showSecretMessage ? styles.secretMessage : ""}`}
            style={{width: 320, margin: "auto"}}
            onClick={() => handleClickSecretMessage()}
          >
            {config.secretText}
          </div>
        ) : null}
        <div className={styles.rightButtonsContainer}>
          <button disabled={!servers.length} onClick={() => updateAllServers(true)}>
            Turn on all servers
          </button>
          <button disabled={!servers.length} onClick={() => updateAllServers(false)}>
            Turn off all servers
          </button>
          <button onClick={() => setServers(config.defaultServers)}>♻️ RESET</button>
          <button disabled={!servers.length} onClick={() => setServers([])}>
            🚨 BOOM 🚨
          </button>
        </div>
      </div>
      <div className={styles.serversContainer}>
        {servers.map((server) => (
          <Server
            key={server.id}
            id={server.id}
            isActive={server.isActive}
            setIsActive={(newStatus) => handleNewStatus(server.id, newStatus)}
            onCloseServer={onCloseServer}
          />
        ))}
      </div>
    </>
  );
};

export default App;
