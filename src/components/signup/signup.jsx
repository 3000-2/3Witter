import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./signup.module.css";

const Signup = ({ authService }) => {
  const history = useHistory();
  const onClick = (e) => {
    e.preventDefault();

    const provider = getProvider(e.currentTarget.textContent[0]);
    console.log(provider);

    authService
      .login(provider)
      .then((result) => {
        console.log(result);
        onLogin(result.user.uid);
      })
      .catch((error) => {
        console.error("error : ", error);
      });
  };

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (user) {
        onLogin(user);
      }
    });
  }, [authService]);

  const onLogin = (user) => {
    history.push({
      pathname: "home",
    });
  };

  const getProvider = (provider) => {
    switch (provider) {
      case "G":
        return "Google";
      case "T":
        return "Twitter";
    }
  };
  return (
    <div className={styles.signupContainer}>
      <div className={styles.header}>
        <img className={styles.logo} src="/images/logo.png" />
        <h1>3Witter에 오신 것을 환영합니다!</h1>
        <h2>새로운 소식이 당신을 기다리고 있습니다.</h2>
      </div>
      <div>
        <button className={styles.btn} onClick={onClick}>
          E-mail로 시작하기
        </button>
        <button className={styles.btn} onClick={onClick}>
          Google로 시작하기
        </button>
        <button className={styles.btn} onClick={onClick}>
          Twitter로 시작하기
        </button>
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
