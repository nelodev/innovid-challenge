import * as React from "react";

import {Server} from "../components/Server";

import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.serversContainer}>
      {[1, 2, 3, 4].map((id) => (
        <Server key={id} id={id} />
      ))}
    </div>
  );
};

export default App;
