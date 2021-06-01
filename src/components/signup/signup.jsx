import React from "react";
import styles from "./signup.module.css";

const Signup = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.header}>
        <img className={styles.logo} src="/images/logo.png" />
        <h1>3Witter에 오신 것을 환영합니다!</h1>
        <h2>새로운 소식이 당신을 기다리고 있습니다.</h2>
      </div>
      <div>
        <button className={styles.btn}>E-mail로 시작하기</button>
        <button className={styles.btn}>Google로 시작하기</button>
      </div>
      <div className={styles.footer}>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default Signup;
