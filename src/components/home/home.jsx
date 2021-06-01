import React from "react";
import Main from "../main/main";
import styles from "./home.module.css";

const Home = () => {
  const user = [
    {
      id: 123,
      name: "3002",
      imageURL: "",
      des: "안녕",
    },
  ];

  const page = 1;
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <img className={styles.logo} src="/images/logo.png" />
        <div className={styles.profile}>이미지</div>
        <ul>
          <li className={styles.headerList}>
            <button className={styles.btn}>
              <img className={styles.icon} src="/images/icon/agenda.png" />
              친구
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn}>
              <img className={styles.icon} src="/images/icon/heart.png" />
              좋아요
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn}>
              <img className={styles.icon} src="/images/icon/user.png" />
              프로필
            </button>
          </li>
        </ul>
      </header>
      <div className={styles.main}>{page && <Main />}</div>
      <div className={styles.side}>사용자</div>
    </div>
  );
};

export default Home;
