import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

import Main from "../main/main";
import Profile from "../profile/profile";
import styles from "./home.module.css";
import Header from "../header/header";
import Userlist from "../userlist/userlist";
import Favorite from "../favorite/favorite";

const Home = ({ authService, repository }) => {
  const history = useHistory();
  const [page, setPage] = useState("Main");
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [twit, setTwit] = useState();

  const ChangePageHandle = (e) => {
    const page = e.currentTarget.textContent;
    e.preventDefault();
    switch (page) {
      case "프로필":
        setPage("Profile");
        break;
      case "좋아요":
        setPage("Favorite");
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
    repository.saveTwit(user.uid, Twit);
    const updated = { ...twit };
    updated[Twit.time] = Twit;

    setTwit(updated);
  };

  const DeleteHandle = (Twit) => {
    repository.deleteTwit(Twit);
    const updated = { ...twit };
    delete updated[Twit.time];
    setTwit(updated);
  };

  const FavoriteHandle = (user, Twit) => {
    repository.saveFavorite(user, Twit);
    const updated = { ...twit };
    updated[Twit.time] = Twit;
    setTwit(updated);
  };

  const DeleteFavoriteHandle = (user, Twit) => {
    repository.deleteFavorite(user, Twit);
    const updated = { ...twit };
    updated[Twit.time] = Twit;
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
  }, []);

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
      const updatedProfile = {};
      Object.keys(Profile).forEach((key) => {
        updatedProfile[Profile[key].profile.uid] = { ...Profile[key].profile };
      });
      // console.log(updatedProfile);
      setProfile(updatedProfile);
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
            DeleteHandle={DeleteHandle}
            FavoriteHandle={FavoriteHandle}
            DeleteFavoriteHandle={DeleteFavoriteHandle}
          />
        )}
        {page === "Profile" && <Profile />}
        {page === "Favorite" && (
          <Favorite
            user={user}
            twit={twit}
            profile={profile}
            SubmitHandle={SubmitHandle}
            DeleteHandle={DeleteHandle}
            FavoriteHandle={FavoriteHandle}
            DeleteFavoriteHandle={DeleteFavoriteHandle}
          />
        )}
      </div>
      <Userlist profile={profile} />
    </div>
  );
};

export default Home;
