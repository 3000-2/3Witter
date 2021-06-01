import React from "react";
import styles from "./main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1>홈</h1>
      </header>
      <div className={styles.twit}>트윗하기</div>
      <div>목록</div>
    </div>
  );
};

export default Main;
