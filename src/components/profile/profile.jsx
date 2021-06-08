import React from "react";
import Mheader from "../header/mheader";
import styles from "./profile.module.css";

const Profile = () => {
  return (
    <>
      <Mheader page="프로필" />
      <div className={styles.profile}>
        <div className={styles.form}>
          <input className={styles.input} type="text" placeholder="닉네임" />
          <input type="image" placeholder="닉네임" />
        </div>
      </div>
    </>
  );
};

export default Profile;
