import * as React from "react";
import {useState, useRef} from "react";

import styles from "../components/Server.module.scss";
import pcOff from "../assets/pc-off.png";
import pcOn from "../assets/pc-on.gif";

type ServerProps = {
  id: number;
};

export const Server = ({id}: ServerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [serverLoad, setServerLoad] = useState(0);
  const interval = useRef(null);

  const getServerLoad = async () => {
    const result = await fetch(`http://localhost:8000/status/${id}`);
    const response = await result.json();

    setServerLoad(response.load);
  };

  const handleToggleStatus = () => {
    if (!isActive) {
      interval.current = setInterval(() => {
        getServerLoad();
      }, 5000);
    } else {
      clearInterval(interval.current);
      setServerLoad(0);
    }
    setIsActive(!isActive);
  };

  const getServerLoadRiskClass = () => {
    if (serverLoad >= 75) return styles.highRisk;
    if (serverLoad >= 50) return styles.mediumRisk;

    return styles.lowRisk;
  };

  return (
    <main className={styles.serverContainer}>
      <div className="window" style={{width: 320, margin: "auto"}}>
        <div className="title-bar">
          <div className="title-bar-text">Server #{id}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <img src={isActive ? pcOn : pcOff} style={{width: 150}} />
        </div>
        <div className="status-bar">
          <p className="status-bar-field">
            Status:{" "}
            <span className={isActive ? styles.active : styles.notActive}>
              {isActive ? "ON" : "OFF"}
            </span>
          </p>
          <a
            className="status-bar-field"
            style={{cursor: "pointer"}}
            onClick={() => handleToggleStatus()}
          >
            turn {isActive ? "off" : "on"}
          </a>
          <p className="status-bar-field">
            CPU Usage: <span className={getServerLoadRiskClass()}>{serverLoad}%</span>
          </p>
        </div>
      </div>
    </main>
  );
};
