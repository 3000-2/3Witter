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
  const [img, setImg] = useState(false);

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
      title: "로그아웃할까요?",
      showCancelButton: true,
      cancelButtonText: "아니요!",
      cancelButtonColor: "#ddd",
      confirmButtonText: "네!",
      confirmButtonColor: "#EEC7C6",
    }).then((result) => {
      if (result.value) {
        authService.logout();
      }
    });
  };

  const SubmitTwitHandle = (Twit) => {
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

  const SubmitProfileHandle = (Profile) => {
    const updated = { ...profile };
    updated[Profile.uid] = Profile;
    repository.saveProfile(Profile);
    setProfile(updated);
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

  const DetailImgHandle = (img) => {
    Swal.fire({
      imageUrl: img || "",
      imageWidth: 300,
      imageAlt: "Detail",
      confirmButtonText: "그만 볼래요!",
      confirmButtonColor: "#EEC7C6",
    });
  };

  return (
    <div className={styles.home}>
      <Header
        user={user}
        profile={profile}
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
            SubmitTwitHandle={SubmitTwitHandle}
            DeleteHandle={DeleteHandle}
            FavoriteHandle={FavoriteHandle}
            DeleteFavoriteHandle={DeleteFavoriteHandle}
            DetailImgHandle={DetailImgHandle}
          />
        )}
        {page === "Profile" && (
          <Profile
            user={user}
            profile={profile}
            SubmitProfileHandle={SubmitProfileHandle}
          />
        )}
        {page === "Favorite" && (
          <Favorite
            user={user}
            twit={twit}
            profile={profile}
            SubmitTwitHandle={SubmitTwitHandle}
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
