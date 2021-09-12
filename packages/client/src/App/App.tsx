import * as React from "react";
import {useState} from "react";

import {Server} from "../components/Server";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const [numberOfServers, setNumberOfServers] = useState(4);

  const getArrayOfGivenElements = (numberOfElements: number) => {
    return Array.from({length: numberOfElements}, (_, i) => i + 1);
  };

  const addServer = () => {
    setNumberOfServers(numberOfServers + 1);
  };

  return (
    <>
      <button className={styles.addServer} onClick={addServer}>
        Add server
      </button>
      <div className={styles.serversContainer}>
        {getArrayOfGivenElements(numberOfServers).map((id) => (
          <Server key={id} id={id} />
        ))}
      </div>
    </>
  );
};

export default App;
