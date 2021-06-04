import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./signup.module.css";

const Signup = ({ authService, repository }) => {
  const history = useHistory();
  const onClick = (e) => {
    e.preventDefault();

    const provider = getProvider(e.currentTarget.textContent[0]);
    console.log(provider);

    authService
      .login(provider)
      .then((result) => {
        console.log(result);
        onLogin(result.user);
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
    repository.setProfile(user, () => {
      repository.saveProfile({
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        imageURL: "",
      });
    });
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
      default:
    }
  };
  return (
    <div className={styles.signupContainer}>
      <header className={styles.header}>
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>3Witter에 오신 것을 환영합니다!</h1>
        <h2 className={styles.title}>
          새로운 소식이 당신을 기다리고 있습니다.
        </h2>
      </header>
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
      <footer className={styles.footer}>3002</footer>
    </div>
  );
};

export default Signup;
