import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import FriendsList from "../friendslist/friendslist";
import Main from "../main/main";
import Profile from "../profile/profile";
import styles from "./home.module.css";
import Header from "../header/header";
import Userlist from "../userlist/userlist";

// dayjs 초기화
dayjs.extend(relativeTime);

const Home = ({ authService, repository }) => {
  const history = useHistory();
  const [page, setPage] = useState("Main");
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [twit, setTwit] = useState();
  const today = dayjs().format("YYYYMMDD");

  const ChangePageHandle = (e) => {
    const page = e.currentTarget.textContent;
    e.preventDefault();
    switch (page) {
      case "친구":
        setPage("FriendsList");
        break;
      case "프로필":
        setPage("Profile");
        break;
      default:
        setPage("Main");
    }
  };

  const LogoutHandle = () => {
    Swal.fire({
      title: "로그아웃 성공!",
    });
    authService.logout();
  };

  const SubmitHandle = (Twit) => {
    repository.saveTwit(user.uid, Twit, today);
    const updated = { ...twit };
    const time = today + Twit.time;
    updated[time] = Twit;

    console.log("업데이트 : ", updated);
    setTwit(updated);
  };

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        history.push("/");
      }
    });
  }, [authService]);

  useEffect(() => {
    SyncProfile();
    SyncTwit();
  }, [repository]);

  const SyncTwit = () => {
    const stopSync = repository.syncAllTwit((Twit) => {
      const updated = {};
      const sorted = {};

      // 데이터 정리
      Object.values(Twit).forEach((values) => {
        Object.keys(values).forEach((key) => {
          updated[key] = { ...values[key] };
        });
      });

      // 데이터 정렬
      Object.keys(updated)
        .sort()
        .forEach((key) => {
          sorted[key] = updated[key];
        });

      setTwit(sorted);
    });
    return () => stopSync();
  };

  const SyncProfile = () => {
    const stopSync = repository.syncProfile((Profile) => {
      const updated = {};
      Object.keys(Profile).forEach((key) => {
        updated[Profile[key].profile.uid] = { ...Profile[key].profile };
      });
      // console.log("updated : ", updated);
      setProfile(updated);
    });
    return () => stopSync();
  };

  const GoHome = () => {
    history.push("/");
  };

  return (
    <div className={styles.home}>
      <Header
        user={user}
        GoHome={GoHome}
        LogoutHandle={LogoutHandle}
        ChangePageHandle={ChangePageHandle}
      />
      <div className={styles.main}>
        {page === "Main" && (
          <Main
            user={user}
            twit={twit}
            profile={profile}
            SubmitHandle={SubmitHandle}
          />
        )}
        {page === "Profile" && <Profile />}
        {page === "FriendsList" && <FriendsList />}
      </div>
      <Userlist profile={profile} />
    </div>
  );
};

export default Home;
