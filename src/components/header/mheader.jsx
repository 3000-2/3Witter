import React from "react";
import styles from "./mheader.module.css";

const Mheader = ({ page }) => {
  return (
    <header className={styles.header}>
      <h1>{page} 페이지</h1>
    </header>
  );
};

export default Mheader;
