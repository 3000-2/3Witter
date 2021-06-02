import React from "react";
import Twit from "../twit/twit";
import styles from "./main.module.css";

const Main = () => {
  const other = true;
  return (
    <>
      <header className={styles.header}>
        <h1>홈</h1>
      </header>
      <div className={styles.main}>
        <Twit />
        <ul>
          <li>
            <Twit other={other} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Main;
