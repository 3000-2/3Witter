import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

import FriendsList from "../friendslist/friendslist";
import Main from "../main/main";
import Profile from "../profile/profile";
import styles from "./home.module.css";

const Home = ({ authService }) => {
  const history = useHistory();
  const [page, Setpage] = useState("Main");
  const [user, Setuser] = useState({});

  const userDes = [
    {
      id: 123,
      name: "3002",
      email: "3002@gmail.com",
      imageURL: "",
      des: "안녕",
    },
  ];

  const ChangePageHandle = (e) => {
    const page = e.currentTarget.textContent;
    e.preventDefault();
    switch (page) {
      case "친구":
        Setpage("FriendsList");
        break;
      case "프로필":
        Setpage("Profile");
        break;
      default:
        Setpage("Main");
    }
  };

  const LogoutHandle = () => {
    Swal.fire({
      title: "로그아웃 성공!",
    });
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (user) {
        Setuser(user);
      } else {
        history.push("/");
      }
    });
  }, [authService]);

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <img className={styles.logo} src="/images/logo.png" />
        <ul>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <img className={styles.icon} src="/images/icon/agenda.png" />
              친구
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <img className={styles.icon} src="/images/icon/heart.png" />
              좋아요
            </button>
          </li>
          <li className={styles.headerList}>
            <button className={styles.btn} onClick={ChangePageHandle}>
              <img className={styles.icon} src="/images/icon/user.png" />
              프로필
            </button>
          </li>
        </ul>
        <div className={styles.profile}>
          <img className={styles.profileImg} src="/images/logo.png" />
          <div className={styles.contents}>
            <div className={styles.text}>{user.displayName}</div>
            <div className={styles.text}>{user.email}</div>
          </div>
          <button className={styles.btn} onClick={LogoutHandle}>
            로그아웃
          </button>
        </div>
      </header>
      <div className={styles.main}>
        {page === "Main" && <Main />}
        {page === "Profile" && <Profile />}
        {page === "FriendsList" && <FriendsList />}
      </div>
      <div className={styles.side}>사용자</div>
    </div>
  );
};

export default Home;
